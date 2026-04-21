import React, { useEffect, useState } from "react";
import Head from "next/head";
import { tradesApi } from "@/api/trades";
import type { PerformanceDto, PortfolioDto } from "@/api/types";
import DashboardLayout from "@/components/DashboardLayout";
import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import QuickStats from "@/components/Dashboard/QuickStats";
import RebalanceStatus from "@/components/Dashboard/RebalanceStatus";
import RecentTrades from "@/components/Dashboard/RecentTrades";
import { LoadingState, EmptyState } from "@/components/Dashboard/styles";

export default function DashboardOverviewPage() {
  const [portfolio, setPortfolio] = useState<PortfolioDto | null>(null);
  // Phase 6 plan: the dashboard's "Total Return" card should show Net P&L
  // (realized + unrealized + funding − commission), not just unrealized.
  // That number only exists on the Performance endpoint, so we pull it here
  // and hand it to QuickStats. "All" period = lifetime, which is the right
  // window for a dashboard overview card.
  const [perf, setPerf] = useState<PerformanceDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([tradesApi.getPortfolio(), tradesApi.getPerformance("All")])
      .then(([portfolioRes, perfRes]) => {
        const p = portfolioRes.data;
        if (p.isSuccess && p.data) {
          setPortfolio(p.data);
        } else {
          setError("Failed to load portfolio data.");
          return;
        }
        // Performance is a nice-to-have for the overview — if it fails we
        // still render the page with portfolio numbers. The dedicated
        // /dashboard/performance page surfaces the same failure explicitly.
        const pf = perfRes.data;
        if (pf.isSuccess && pf.data) {
          setPerf(pf.data);
        }
      })
      .catch(() => setError("Failed to load portfolio data."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard - Fich</title>
      </Head>
      <DashboardLayout title="Overview">
        {loading ? (
          <LoadingState>Loading portfolio...</LoadingState>
        ) : error || !portfolio ? (
          <EmptyState>{error || "Unable to load portfolio."}</EmptyState>
        ) : (
          <>
            <PortfolioSummary portfolio={portfolio} />
            <QuickStats portfolio={portfolio} perf={perf} />
            <RebalanceStatus />
            <RecentTrades />
          </>
        )}
      </DashboardLayout>
    </>
  );
}
