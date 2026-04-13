import React, { useEffect, useState } from "react";
import Head from "next/head";
import { tradesApi } from "@/api/trades";
import type { PortfolioDto, TradeOrderDto } from "@/api/types";
import DashboardLayout from "@/components/DashboardLayout";
import PortfolioChart from "@/components/Dashboard/PortfolioChart";
import PerformanceStats from "@/components/Dashboard/PerformanceStats";
import AssetPerformanceTable from "@/components/Dashboard/AssetPerformanceTable";
import TradeStatsBreakdown from "@/components/Dashboard/TradeStatsBreakdown";
import { LoadingState, EmptyState } from "@/components/Dashboard/styles";
import { PerfSection } from "@/components/Dashboard/performanceStyles";
import {
  computePerformanceStats,
  computeReturnByPeriod,
  type PerformanceStats as PerfStatsType,
} from "@/utils/performanceUtils";

export default function PerformancePage() {
  const [portfolio, setPortfolio] = useState<PortfolioDto | null>(null);
  const [trades, setTrades] = useState<TradeOrderDto[]>([]);
  const [stats, setStats] = useState<PerfStatsType | null>(null);
  const [returns, setReturns] = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      tradesApi.getPortfolio(),
      tradesApi.getMyOrders(1, 1000),
    ])
      .then(([portfolioRes, tradesRes]) => {
        const p = portfolioRes.data;
        const t = tradesRes.data;

        if (p.isSuccess && p.data) {
          setPortfolio(p.data);

          const allTrades = t.isSuccess && t.data ? t.data.items : [];
          setTrades(allTrades);

          setStats(computePerformanceStats(p.data, allTrades));
          setReturns(computeReturnByPeriod(p.data.history));
        } else {
          setError("Failed to load portfolio data.");
        }
      })
      .catch(() => setError("Failed to load performance data."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Performance - Fich</title>
      </Head>
      <DashboardLayout title="Performance">
        {loading ? (
          <LoadingState>Loading performance data...</LoadingState>
        ) : error || !portfolio || !stats ? (
          <EmptyState>{error || "Unable to load performance data."}</EmptyState>
        ) : (
          <>
            <PerformanceStats stats={stats} returns={returns} />

            <PerfSection>
              <PortfolioChart history={portfolio.history} />
            </PerfSection>

            <PerfSection>
              <AssetPerformanceTable holdings={portfolio.holdings} />
            </PerfSection>

            <TradeStatsBreakdown stats={stats} />
          </>
        )}
      </DashboardLayout>
    </>
  );
}
