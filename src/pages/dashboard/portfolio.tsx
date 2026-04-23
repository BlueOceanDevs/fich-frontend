import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { tradesApi } from "@/api/trades";
import type { PerformancePeriod, PortfolioDto } from "@/api/types";
import DashboardLayout from "@/components/DashboardLayout";
import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import PortfolioChart from "@/components/Dashboard/PortfolioChart";
import AssetAllocation from "@/components/Dashboard/AssetAllocation";
import HoldingsTable from "@/components/Dashboard/HoldingsTable";
import {
  ChartsGrid,
  TableWrapper,
  LoadingState,
  EmptyState,
} from "@/components/Dashboard/styles";

// Default window shown on first load. Matches the backend's own default so
// a query-param-less GET returns the same chart the UI would render anyway.
const DEFAULT_CHART_PERIOD: PerformancePeriod = "OneMonth";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioDto | null>(null);
  const [chartPeriod, setChartPeriod] = useState<PerformancePeriod>(DEFAULT_CHART_PERIOD);
  // Distinguish first-load (blocks the whole page) from period-switch refetch
  // (keeps the previous chart on screen while the new one loads, disables
  // other pills briefly).
  const [initialLoading, setInitialLoading] = useState(true);
  const [chartRefreshing, setChartRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPortfolio = useCallback(
    async (period: PerformancePeriod, isInitial: boolean) => {
      if (isInitial) setInitialLoading(true);
      else setChartRefreshing(true);

      try {
        const { data } = await tradesApi.getPortfolio(period);
        if (data.isSuccess && data.data) {
          setPortfolio(data.data);
          setError(null);
        } else if (isInitial) {
          setError("Failed to load portfolio data.");
        }
      } catch {
        if (isInitial) setError("Failed to load portfolio data.");
      } finally {
        if (isInitial) setInitialLoading(false);
        else setChartRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadPortfolio(DEFAULT_CHART_PERIOD, true);
  }, [loadPortfolio]);

  const handlePeriodChange = useCallback(
    (next: PerformancePeriod) => {
      setChartPeriod(next);
      loadPortfolio(next, false);
    },
    [loadPortfolio],
  );

  return (
    <>
      <Head>
        <title>Portfolio - Fich</title>
      </Head>
      <DashboardLayout title="Portfolio">
        {initialLoading ? (
          <LoadingState>Loading portfolio...</LoadingState>
        ) : error || !portfolio ? (
          <EmptyState>{error || "Unable to load portfolio."}</EmptyState>
        ) : (
          <>
            <PortfolioSummary portfolio={portfolio} />

            <ChartsGrid>
              <PortfolioChart
                history={portfolio.history}
                period={chartPeriod}
                granularity={portfolio.historyGranularity}
                loading={chartRefreshing}
                onPeriodChange={handlePeriodChange}
              />
              <AssetAllocation
                holdings={portfolio.holdings}
                usdtBalance={portfolio.usdtBalance}
                totalValue={portfolio.totalValueUsd}
                cashAssetName={portfolio.cashAssetName}
              />
            </ChartsGrid>

            <TableWrapper>
              <HoldingsTable
                holdings={portfolio.holdings}
                cashBalance={portfolio.usdtBalance}
                cashAssetName={portfolio.cashAssetName}
                totalAllocationBase={portfolio.totalValueUsd}
              />
            </TableWrapper>
          </>
        )}
      </DashboardLayout>
    </>
  );
}
