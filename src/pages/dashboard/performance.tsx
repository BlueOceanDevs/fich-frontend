import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { tradesApi } from "@/api/trades";
import type { PerformanceDto, PerformancePeriod, PortfolioDto } from "@/api/types";
import DashboardLayout from "@/components/DashboardLayout";
import PortfolioChart from "@/components/Dashboard/PortfolioChart";
import PerformanceStats from "@/components/Dashboard/PerformanceStats";
import AssetPerformanceTable from "@/components/Dashboard/AssetPerformanceTable";
import StrategyPerformanceTable from "@/components/Dashboard/StrategyPerformanceTable";
import TradeStatsBreakdown from "@/components/Dashboard/TradeStatsBreakdown";
import ReconciliationFooter from "@/components/Dashboard/ReconciliationFooter";
import { LoadingState, EmptyState } from "@/components/Dashboard/styles";
import {
  PerfSection,
  PeriodTabsRow,
  PeriodTab,
  ActiveSinceRow,
  ActiveSinceDate,
  ActiveSinceSeparator,
} from "@/components/Dashboard/performanceStyles";

// ─────────────────────────────────────────────
// Period selector config
// ─────────────────────────────────────────────
// Labels shown to the user vs. the raw enum sent to the backend. Must
// match the backend `PerformancePeriod` enum names exactly.
const PERIOD_TABS: { label: string; value: PerformancePeriod }[] = [
  { label: "All Time", value: "All" },
  { label: "1 Month", value: "OneMonth" },
  { label: "7 Days", value: "SevenDays" },
  { label: "24 Hours", value: "OneDay" },
];

// "Active since" date format: "Apr 20, 2026" — same shape as the dashboard
// summary's "Member since" line so the two views feel consistent. Locale-
// aware (undefined locale = browser default), day-precision only.
const activeSinceFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
});

// Days-of-trading line — round down to whole days. We compute against
// "now" client-side rather than asking the backend so the value updates
// without a round-trip; the precision (whole days) is loose enough that
// clock drift doesn't matter.
const daysSince = (iso: string): number => {
  const startMs = new Date(iso).getTime();
  if (!Number.isFinite(startMs)) return 0;
  const elapsedMs = Date.now() - startMs;
  return Math.max(0, Math.floor(elapsedMs / (24 * 60 * 60 * 1000)));
};

/**
 * Performance page — Phase 6 of the P&L accuracy plan.
 *
 * Data comes from a single backend endpoint (`GET /Trade/Performance`)
 * that aggregates realized P&L, execution quality, per-asset, and
 * per-strategy stats server-side. This replaces the old 1000-row
 * `getMyOrders` + client-side number-crunching approach — numbers are
 * now provably correct and cheap to load (60 s server-side cache).
 *
 * We keep a separate call to `getPortfolio()` only for the equity-curve
 * chart (which uses snapshot history) and the strategy-name header.
 * The portfolio call is cheap and non-rate-limited since it reads only
 * from our DB.
 *
 * Period changes refetch performance but not the portfolio — the chart
 * shows full history regardless of the selected window.
 */
export default function PerformancePage() {
  const [period, setPeriod] = useState<PerformancePeriod>("All");
  const [perf, setPerf] = useState<PerformanceDto | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioDto | null>(null);

  // The embedded Portfolio Value chart has its own period — users can zoom
  // into the equity curve (24h / 7d / 1m / 3m / 1y) independently from the
  // Performance-stats period above. Defaulting to OneMonth matches what the
  // Portfolio page shows so a user switching between the two tabs sees the
  // same starting window.
  const [chartPeriod, setChartPeriod] = useState<PerformancePeriod>("OneMonth");

  // Three independent loading flags. The stats (PerformanceDto) and the
  // chart (PortfolioDto.history) reload on different triggers; merging
  // them would make either widget flash unnecessarily when the other
  // refetches.
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [chartRefreshing, setChartRefreshing] = useState(false);
  const [perfLoading, setPerfLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPortfolio = useCallback(
    async (nextChartPeriod: PerformancePeriod, isInitial: boolean) => {
      if (isInitial) setPortfolioLoading(true);
      else setChartRefreshing(true);
      try {
        const res = await tradesApi.getPortfolio(nextChartPeriod);
        if (res.data.isSuccess && res.data.data) {
          setPortfolio(res.data.data);
          setError(null);
        } else if (isInitial) {
          setError("Failed to load portfolio data.");
        }
      } catch {
        if (isInitial) setError("Failed to load portfolio data.");
      } finally {
        if (isInitial) setPortfolioLoading(false);
        else setChartRefreshing(false);
      }
    },
    [],
  );

  // ── Portfolio (initial load + refetch on chart-period change) ──
  useEffect(() => {
    loadPortfolio("OneMonth", true);
  }, [loadPortfolio]);

  const handleChartPeriodChange = useCallback(
    (next: PerformancePeriod) => {
      setChartPeriod(next);
      loadPortfolio(next, false);
    },
    [loadPortfolio],
  );

  // ── Performance (reloads when period changes) ──
  useEffect(() => {
    setPerfLoading(true);
    tradesApi
      .getPerformance(period)
      .then((res) => {
        if (res.data.isSuccess && res.data.data) {
          setPerf(res.data.data);
          setError(null);
        } else {
          setError("Failed to load performance data.");
        }
      })
      .catch(() => setError("Failed to load performance data."))
      .finally(() => setPerfLoading(false));
  }, [period]);

  const loading = portfolioLoading || perfLoading;

  return (
    <>
      <Head>
        <title>Performance - Fich</title>
      </Head>
      <DashboardLayout title="Performance">
        {/*
          Period tabs live outside the loading branch so the user can
          switch periods even while a refetch is in flight — nothing
          worse than a tab bar that vanishes on every click. Disabled
          state on the tabs signals "still loading" without collapsing
          layout.
        */}
        <PeriodTabsRow>
          {PERIOD_TABS.map((t) => (
            <PeriodTab
              key={t.value}
              $active={period === t.value}
              disabled={perfLoading && period !== t.value}
              onClick={() => setPeriod(t.value)}
              type="button"
            >
              {t.label}
            </PeriodTab>
          ))}
        </PeriodTabsRow>

        {/*
          "Active since" line — when did the platform first start managing
          this user's portfolio? Anchored to the first executed signal
          (firstSignalExecutedAt), not account creation or subscription
          start. Hidden entirely until the user has executed their first
          trade (the field is null until then).
        */}
        {portfolio?.firstSignalExecutedAt && (
          <ActiveSinceRow>
            <span>Active since</span>
            <ActiveSinceDate>
              {activeSinceFormatter.format(new Date(portfolio.firstSignalExecutedAt))}
            </ActiveSinceDate>
            {(() => {
              const days = daysSince(portfolio.firstSignalExecutedAt);
              if (days <= 0) return null;
              return (
                <>
                  <ActiveSinceSeparator>·</ActiveSinceSeparator>
                  <span>
                    {days} day{days === 1 ? "" : "s"} of trading
                  </span>
                </>
              );
            })()}
          </ActiveSinceRow>
        )}

        {loading && !perf ? (
          <LoadingState>Loading performance data...</LoadingState>
        ) : error || !perf ? (
          <EmptyState>{error || "Unable to load performance data."}</EmptyState>
        ) : (
          <>
            <PerformanceStats perf={perf} />

            {portfolio && (
              <PerfSection>
                <PortfolioChart
                  history={portfolio.history}
                  period={chartPeriod}
                  granularity={portfolio.historyGranularity}
                  loading={chartRefreshing}
                  onPeriodChange={handleChartPeriodChange}
                />
              </PerfSection>
            )}

            <PerfSection>
              <AssetPerformanceTable perAsset={perf.perAsset} />
            </PerfSection>

            <PerfSection>
              <StrategyPerformanceTable perStrategy={perf.perStrategy} />
            </PerfSection>

            <TradeStatsBreakdown perf={perf} />

            <ReconciliationFooter perf={perf} />
          </>
        )}
      </DashboardLayout>
    </>
  );
}
