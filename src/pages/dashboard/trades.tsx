import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import TradeHistory from "@/components/Dashboard/TradeHistory";
import { useAppSelector } from "@/store/hooks";
import { DashboardSection } from "@/components/Dashboard/styles";
import { DashboardContainer, DashboardHeader, DashboardTitle, DashboardSubtitle } from "@/components/Dashboard/styles";
import { TableCard } from "@/components/Dashboard/styles";

export default function TradesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <>
      <Head>
        <title>Trade History - Fich</title>
      </Head>
      <Layout>
        <DashboardSection>
          <DashboardContainer>
            <DashboardHeader>
              <DashboardTitle>Trade History</DashboardTitle>
              <DashboardSubtitle>Complete history of all trades executed for your account.</DashboardSubtitle>
            </DashboardHeader>
            <TableCard>
              <TradeHistory />
            </TableCard>
          </DashboardContainer>
        </DashboardSection>
      </Layout>
    </>
  );
}
