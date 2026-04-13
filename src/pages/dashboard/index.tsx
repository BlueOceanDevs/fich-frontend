import React, { useEffect, useState } from "react";
import Head from "next/head";
import { tradesApi } from "@/api/trades";
import type { PortfolioDto } from "@/api/types";
import DashboardLayout from "@/components/DashboardLayout";
import PortfolioSummary from "@/components/Dashboard/PortfolioSummary";
import QuickStats from "@/components/Dashboard/QuickStats";
import RecentTrades from "@/components/Dashboard/RecentTrades";
import { LoadingState, EmptyState } from "@/components/Dashboard/styles";

export default function DashboardOverviewPage() {
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
            <QuickStats portfolio={portfolio} />
            <RecentTrades />
          </>
        )}
      </DashboardLayout>
    </>
  );
}
