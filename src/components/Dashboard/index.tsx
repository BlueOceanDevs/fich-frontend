import React, { useEffect, useState } from "react";
import { tradesApi } from "@/api/trades";
import type { PortfolioDto } from "@/api/types";
import PortfolioSummary from "./PortfolioSummary";
import QuickStats from "./QuickStats";
import PortfolioChart from "./PortfolioChart";
import AssetAllocation from "./AssetAllocation";
import HoldingsTable from "./HoldingsTable";
import RecentTrades from "./RecentTrades";
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  ChartsGrid,
  TableWrapper,
  LoadingState,
} from "./styles";

const Dashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    tradesApi
      .getPortfolio()
      .then(({ data }) => {
        if (data.isSuccess && data.data) {
          setPortfolio(data.data);
        } else {
          setError("Failed to load portfolio data.");
        }
      })
      .catch(() => setError("Failed to load portfolio data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Dashboard</DashboardTitle>
          <DashboardSubtitle>Your portfolio overview and trading activity.</DashboardSubtitle>
        </DashboardHeader>
        <LoadingState>Loading portfolio...</LoadingState>
      </DashboardContainer>
    );
  }

  if (error || !portfolio) {
    return (
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Dashboard</DashboardTitle>
          <DashboardSubtitle>Your portfolio overview and trading activity.</DashboardSubtitle>
        </DashboardHeader>
        <LoadingState>{error || "Unable to load portfolio."}</LoadingState>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Dashboard</DashboardTitle>
        <DashboardSubtitle>Your portfolio overview and trading activity.</DashboardSubtitle>
      </DashboardHeader>

      <PortfolioSummary portfolio={portfolio} />

      <QuickStats portfolio={portfolio} />

      <ChartsGrid>
        <PortfolioChart history={portfolio.history} />
        <AssetAllocation
          holdings={portfolio.holdings}
          usdtBalance={portfolio.usdtBalance}
          totalValue={portfolio.totalValueUsd}
        />
      </ChartsGrid>

      <TableWrapper>
        <HoldingsTable holdings={portfolio.holdings} />
      </TableWrapper>

      <RecentTrades />
    </DashboardContainer>
  );
};

export default Dashboard;
