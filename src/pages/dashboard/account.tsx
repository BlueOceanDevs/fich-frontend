import React, { useEffect } from "react";
import Head from "next/head";
import { useAppDispatch } from "@/store/hooks";
import { fetchSubscription } from "@/store/subscriptionSlice";
import DashboardLayout from "@/components/DashboardLayout";
import AccountCard from "@/components/Profile/AccountCard";
import SubscriptionCard from "@/components/Profile/SubscriptionCard";
import ExchangeCard from "@/components/Profile/ExchangeCard";
import OrdersTab from "@/components/Profile/OrdersTab";
import { CardsGrid } from "@/components/Profile/styles";

export default function AccountPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSubscription());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Account - Fich</title>
      </Head>
      <DashboardLayout title="Account">
        <CardsGrid>
          <AccountCard />
          <SubscriptionCard />
          <ExchangeCard onStatusChange={() => {}} />
        </CardsGrid>
        <div style={{ marginTop: 24 }}>
          <OrdersTab />
        </div>
      </DashboardLayout>
    </>
  );
}
