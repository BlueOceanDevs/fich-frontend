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
          {/* WAITLIST MODE — subscription + exchange cards hidden,
              matching /profile. Both components already return null
              while we're in waitlist mode; this comment-out is for
              symmetry so the page intent reads at a glance. Restore
              both lines when plans/Binance launch. */}
          {/* <SubscriptionCard /> */}
          {/* <ExchangeCard onStatusChange={() => {}} /> */}
        </CardsGrid>
        <div style={{ marginTop: 24 }}>
          <OrdersTab />
        </div>
      </DashboardLayout>
    </>
  );
}
