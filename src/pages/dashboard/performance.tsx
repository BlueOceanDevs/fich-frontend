import React, { useEffect, useState } from "react";
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

  // Two independent loading flags. Portfolio only loads once on mount;
  // performance reloads on every period change. Merging them would make
  // the chart flash when switching tabs.
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [perfLoading, setPerfLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Portfolio (one-shot) ──
  useEffect(() => {
    tradesApi
      .getPortfolio()
      .then((res) => {
        if (res.data.isSuccess && res.data.data) {
          setPortfolio(res.data.data);
        } else {
          setError("Failed to load portfolio data.");
        }
      })
      .catch(() => setError("Failed to load portfolio data."))
      .finally(() => setPortfolioLoading(false));
  }, []);

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

        {loading && !perf ? (
          <LoadingState>Loading performance data...</LoadingState>
        ) : error || !perf ? (
          <EmptyState>{error || "Unable to load performance data."}</EmptyState>
        ) : (
          <>
            <PerformanceStats perf={perf} />

            {portfolio && (
              <PerfSection>
                <PortfolioChart history={portfolio.history} />
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
