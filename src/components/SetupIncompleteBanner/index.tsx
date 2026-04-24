import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { userApi } from "@/api/user";
import { useAppSelector } from "@/store/hooks";
import type { OnboardingStatusDto } from "@/api/types";
import {
  Banner,
  BannerText,
  BannerTitle,
  BannerHint,
  BannerButton,
} from "./styles";

/**
 * "Complete your setup" banner for the profile page. Rendered only when
 * onboarding is incomplete (exchange not connected, or subscription not
 * active). Points the user at the right step of the setup flow so they
 * don't have to guess which piece is missing.
 *
 * Restored after the Apr 2 "clean up profile page" refactor accidentally
 * dropped the inline banner when splitting the profile into separate
 * Card components — extracting it here keeps the profile page clean and
 * makes the banner re-usable from the dashboard if we ever want to
 * surface it there too.
 *
 * Fetches OnboardingStatus itself on mount; returns <c>null</c> when
 * setup is already complete, so the parent can drop it in
 * unconditionally.
 */
const SetupIncompleteBanner: React.FC = () => {
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [onboarding, setOnboarding] = useState<OnboardingStatusDto | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    userApi
      .getOnboardingStatus()
      .then(({ data }) => {
        if (data.isSuccess && data.data) setOnboarding(data.data);
      })
      // Silent failure: the banner just won't render. We prefer that over
      // a scary "can't check your setup status" error on the profile page.
      .catch(() => {});
  }, [isAuthenticated]);

  if (!onboarding || onboarding.setupComplete) return null;

  // Point the user at the step they still need to complete. Order
  // matters: exchange first (the setup landing page walks through
  // exchange → plan), plan second.
  const continueUrl = !onboarding.hasActiveExchange
    ? "/setup"
    : !onboarding.hasActiveSubscription
    ? "/setup/choose-plan"
    : "/setup/start-trading";

  const missing: string[] = [];
  if (!onboarding.hasActiveExchange) missing.push("connect your exchange");
  if (!onboarding.hasActiveSubscription) missing.push("choose a plan");
  const hint =
    missing.length === 0
      ? "Finalize your setup to start trading."
      : `You still need to ${missing.join(" and ")} to start trading.`;

  return (
    <Banner>
      <BannerText>
        <BannerTitle>Complete your setup</BannerTitle>
        <BannerHint>{hint}</BannerHint>
      </BannerText>
      <Link href={continueUrl} passHref legacyBehavior>
        <BannerButton>
          Continue Setup <FaArrowRight size={12} />
        </BannerButton>
      </Link>
    </Banner>
  );
};

export default SetupIncompleteBanner;
