import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import { performanceApi } from "@/api/performance";
import type {
  PerformancePageDto,
  PerformancePagePeriod,
  WeekDetailDto,
} from "@/api/types";
import PerformanceChart from "@/components/Performance/PerformanceChart";
import MonthlyReturnsTable from "@/components/Performance/MonthlyReturnsTable";
import PeriodSelector from "@/components/Performance/PeriodSelector";
import SixStatsCard from "@/components/Performance/SixStatsCard";
import Disclosure from "@/components/Performance/Disclosure";
import PortfolioPieChart from "@/components/Performance/PortfolioPieChart";
import WeekSelector from "@/components/Performance/WeekSelector";
import WeeklyTradesTable from "@/components/Performance/WeeklyTradesTable";
import WinnersLosersTable from "@/components/Performance/WinnersLosersTable";
import CashPctChart from "@/components/Performance/CashPctChart";
import {
  PageWrapper,
  PageTitle,
  PageSubtitle,
  SectionCard,
  SectionHeader,
  SectionTitle,
  LoadingWrap,
  ErrorWrap,
} from "@/components/Performance/styles";

/**
 * Public `/performance` page.
 *
 * Two pieces of state: the period selector (drives the headline stats
 * + main chart) and the selected week (drives the donut chart + the
 * weekly BUYs/SELLs table). Two API calls — `getPage(period)` and
 * `getWeek(weekEndDate)` — re-fire when their inputs change.
 *
 * Page is public (no auth, route already in
 * `utils/publicPaths.ts`'s allow-list and the OnboardingGuard
 * whitelist). Backend caches each call in Redis (1-hour TTL); admin
 * edits + ingestion calls invalidate the cache so updates show up in
 * seconds.
 */
export default function PerformancePage() {
  // ── Period-driven state ──
  const [period, setPeriod] = useState<PerformancePagePeriod>("Inception");
  const [page, setPage] = useState<PerformancePageDto | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  // ── Week-driven state ──
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [weekDetail, setWeekDetail] = useState<WeekDetailDto | null>(null);
  const [weekLoading, setWeekLoading] = useState(false);

  // Refetch the page payload when period changes.
  useEffect(() => {
    let cancelled = false;
    setPageLoading(true);
    setPageError("");
    performanceApi
      .getPage(period)
      .then(({ data }) => {
        if (cancelled) return;
        if (data.isSuccess && data.data) {
          setPage(data.data);
          // Set the week selector default to the latest available
          // week on the FIRST successful page load. Subsequent period
          // changes preserve the user's chosen week (only update when
          // they haven't picked one yet).
          if (selectedWeek == null && data.data.latestWeek) {
            setSelectedWeek(data.data.latestWeek);
          }
        } else {
          setPageError(data.errors?.[0] ?? "Failed to load performance data.");
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setPageError(
          e?.response?.data?.errors?.[0] ?? "Failed to load performance data.",
        );
      })
      .finally(() => {
        if (!cancelled) setPageLoading(false);
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  // Refetch the per-week payload when the user picks a different week.
  useEffect(() => {
    if (!selectedWeek) return;
    let cancelled = false;
    setWeekLoading(true);
    performanceApi
      .getWeek(selectedWeek)
      .then(({ data }) => {
        if (cancelled) return;
        if (data.isSuccess && data.data) setWeekDetail(data.data);
      })
      .catch(() => {
        if (cancelled) return;
        setWeekDetail(null);
      })
      .finally(() => {
        if (!cancelled) setWeekLoading(false);
      });
    return () => { cancelled = true; };
  }, [selectedWeek]);

  // Memo: convert ISO-date list to plain string[] for the dropdown.
  const weekOptions = useMemo(
    () => (page?.availableWeeks ?? []).map((d) => d),
    [page?.availableWeeks],
  );

  return (
    <>
      <Head>
        <title>Performance - Fich</title>
        <meta
          name="description"
          content="Audited backtest performance data — weekly equity curve, monthly returns, top winners and losers, and full trade history."
        />
      </Head>
      <Layout>
        <PageWrapper>
          <PageTitle>Performance</PageTitle>
          <PageSubtitle>
            Audited backtest data — every trade, every week, since Dec 2019.
          </PageSubtitle>

          {pageLoading && !page && (
            <LoadingWrap>Loading performance data…</LoadingWrap>
          )}
          {pageError && <ErrorWrap>{pageError}</ErrorWrap>}

          {page && (
            <>
              {/* ─────────────────────────────────────
                  1. Period selector
                  ───────────────────────────────────── */}
              <PeriodSelector
                value={period}
                onChange={setPeriod}
                disabled={pageLoading}
              />

              {/* ─────────────────────────────────────
                  2. 6-stat row (period-aware)
                  ───────────────────────────────────── */}
              <SixStatsCard stats={page.stats} />

              {/* ─────────────────────────────────────
                  3. Disclosure header (static)
                  ───────────────────────────────────── */}
              <Disclosure />

              {/* ─────────────────────────────────────
                  4. Performance chart (period-aware)
                  ───────────────────────────────────── */}
              <PerformanceChart data={page.equityCurve} />

              {/* ─────────────────────────────────────
                  5. Monthly returns table (all-time)
                  ───────────────────────────────────── */}
              <MonthlyReturnsTable rows={page.monthlyReturns} />

              {/* ─────────────────────────────────────
                  6 + 7. Weekly Positions + Weekly trades
                          (single dropdown drives both)
                  ───────────────────────────────────── */}
              <SectionCard>
                <SectionHeader>
                  <SectionTitle>Weekly Positions</SectionTitle>
                  {selectedWeek && (
                    <WeekSelector
                      value={selectedWeek}
                      options={weekOptions}
                      onChange={setSelectedWeek}
                      disabled={weekLoading}
                    />
                  )}
                </SectionHeader>
                <PortfolioPieChart
                  slices={weekDetail?.pieSlices ?? []}
                />
              </SectionCard>

              <SectionCard>
                <SectionHeader>
                  <SectionTitle>Weekly BUYs and SELLs</SectionTitle>
                </SectionHeader>
                <WeeklyTradesTable rows={weekDetail?.trades ?? []} />
              </SectionCard>

              {/* ─────────────────────────────────────
                  8. Top 5 Winners + Top 5 Losers
                     Stacked vertically (full-width each)
                     so the wider table fits all 6 columns
                     without horizontal scroll on typical
                     desktop widths.
                  ───────────────────────────────────── */}
              <SectionCard>
                <SectionHeader>
                  <SectionTitle>Top 5 Winners (Profit %)</SectionTitle>
                </SectionHeader>
                <WinnersLosersTable rows={page.topWinners} mode="winners" />
              </SectionCard>
              <SectionCard>
                <SectionHeader>
                  <SectionTitle>Top 5 Losers (Profit %)</SectionTitle>
                </SectionHeader>
                <WinnersLosersTable rows={page.topLosers} mode="losers" />
              </SectionCard>

              {/* ─────────────────────────────────────
                  9. Cash in % chart (all-time)
                  ───────────────────────────────────── */}
              <SectionCard>
                <SectionHeader>
                  <SectionTitle>Cash in %</SectionTitle>
                </SectionHeader>
                <CashPctChart data={page.cashPctSeries} />
              </SectionCard>
            </>
          )}
        </PageWrapper>
      </Layout>
    </>
  );
}
