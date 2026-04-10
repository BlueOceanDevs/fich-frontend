import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { userApi } from "@/api/user";
import Layout from "@/components/Layout";
import EmailConfirmationBanner from "@/components/EmailConfirmationBanner";
import AccountCard from "@/components/Profile/AccountCard";
import SubscriptionCard from "@/components/Profile/SubscriptionCard";
import ExchangeCard from "@/components/Profile/ExchangeCard";
import OrdersTab from "@/components/Profile/OrdersTab";
import { fetchSubscription } from "@/store/subscriptionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { OnboardingStatusDto } from "@/api/types";
import {
  ProfileSection,
  ProfileContainer,
  ProfileHeader,
  ProfileTitle,
  ProfileSubtitle,
  TabRow,
  Tab,
  CardsGrid,
  SetupBanner,
  SetupBannerText,
  SetupBannerTitle,
  SetupBannerHint,
  SetupBannerButton,
} from "@/components/Profile/styles";

type ProfileTab = "overview" | "orders";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const [onboarding, setOnboarding] = useState<OnboardingStatusDto | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(fetchSubscription());
    userApi
      .getOnboardingStatus()
      .then(({ data }) => {
        if (data.isSuccess && data.data) setOnboarding(data.data);
      })
      .catch(() => {});
  }, [isAuthenticated, dispatch]);

  const refreshOnboarding = () => {
    userApi
      .getOnboardingStatus()
      .then(({ data }) => {
        if (data.isSuccess && data.data) setOnboarding(data.data);
      })
      .catch(() => {});
  };

  if (!isAuthenticated || !user) return null;

  const setupIncomplete = onboarding && !onboarding.setupComplete;

  const getSetupContinueUrl = () => {
    if (!onboarding) return "/setup";
    if (!onboarding.hasActiveExchange) return "/setup";
    if (!onboarding.hasActiveSubscription) return "/setup/choose-plan";
    return "/setup/start-trading";
  };

  const getSetupHint = () => {
    if (!onboarding) return "Complete your setup to start trading.";
    const missing: string[] = [];
    if (!onboarding.hasActiveExchange) missing.push("connect your exchange");
    if (!onboarding.hasActiveSubscription) missing.push("choose a plan");
    if (missing.length === 0) return "Finalize your setup to start trading.";
    return `You still need to ${missing.join(" and ")} to start trading.`;
  };

  return (
    <>
      <Head>
        <title>Profile - Fich</title>
      </Head>

      <Layout>
        <ProfileSection>
          <ProfileContainer>
            <ProfileHeader>
              <ProfileTitle>Your profile</ProfileTitle>
              <ProfileSubtitle>
                Manage your account, subscription, and order history.
              </ProfileSubtitle>
            </ProfileHeader>

            <EmailConfirmationBanner />

            {setupIncomplete && (
              <SetupBanner>
                <SetupBannerText>
                  <SetupBannerTitle>Complete your setup</SetupBannerTitle>
                  <SetupBannerHint>{getSetupHint()}</SetupBannerHint>
                </SetupBannerText>
                <Link href={getSetupContinueUrl()} passHref legacyBehavior>
                  <SetupBannerButton>
                    Continue Setup <FaArrowRight size={12} />
                  </SetupBannerButton>
                </Link>
              </SetupBanner>
            )}

            <TabRow>
              <Tab
                $active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </Tab>
              <Tab
                $active={activeTab === "orders"}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </Tab>
            </TabRow>

            {activeTab === "overview" && (
              <CardsGrid>
                <AccountCard />
                <SubscriptionCard />
                <ExchangeCard onStatusChange={refreshOnboarding} />
              </CardsGrid>
            )}

            {activeTab === "orders" && <OrdersTab />}
          </ProfileContainer>
        </ProfileSection>
      </Layout>
    </>
  );
}
