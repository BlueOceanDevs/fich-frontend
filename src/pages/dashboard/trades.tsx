import React from "react";
import Head from "next/head";
import DashboardLayout from "@/components/DashboardLayout";
import TradeHistory from "@/components/Dashboard/TradeHistory";
import { TableCard, CardTitle } from "@/components/Dashboard/styles";

export default function TradesPage() {
  return (
    <>
      <Head>
        <title>Trades - Fich</title>
      </Head>
      <DashboardLayout title="Trades">
        <TableCard>
          <CardTitle>Trade History</CardTitle>
          <TradeHistory />
        </TableCard>
      </DashboardLayout>
    </>
  );
}
