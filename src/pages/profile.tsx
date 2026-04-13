import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchSubscription } from "@/store/subscriptionSlice";
import Layout from "@/components/Layout";
import AccountCard from "@/components/Profile/AccountCard";
import SubscriptionCard from "@/components/Profile/SubscriptionCard";
import ExchangeCard from "@/components/Profile/ExchangeCard";
import {
  ProfileSection,
  ProfileContainer,
  ProfileHeader,
  ProfileTitle,
  ProfileSubtitle,
  CardsGrid,
} from "@/components/Profile/styles";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchSubscription());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) return null;

  return (
    <>
      <Head>
        <title>Profile - Fich</title>
      </Head>
      <Layout>
        <ProfileSection>
          <ProfileContainer>
            <ProfileHeader>
              <ProfileTitle>Profile</ProfileTitle>
              <ProfileSubtitle>
                Manage your account settings, subscription, and exchange
                connection.
              </ProfileSubtitle>
            </ProfileHeader>

            <CardsGrid>
              <AccountCard />
              <SubscriptionCard />
              <ExchangeCard onStatusChange={() => {}} />
            </CardsGrid>
          </ProfileContainer>
        </ProfileSection>
      </Layout>
    </>
  );
}
