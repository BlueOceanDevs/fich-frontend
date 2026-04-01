import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  FaCheck,
  FaTimes,
  FaBolt,
  FaLink,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";
import Layout from "@/components/Layout";
import { useAppSelector } from "@/store/hooks";
import { userApi } from "@/api/user";
import type { OnboardingStatusDto } from "@/api/types";
import {
  SetupSection,
  SetupContainer,
  PageTitle,
  PageSubtitle,
  StepsBar,
  StepItem,
  StepNumber,
  StepLabel,
  StepConnector,
  SummaryCard,
  SummaryRow,
  SummaryIcon,
  SummaryInfo,
  SummaryLabel,
  SummaryValue,
  SummaryStatus,
  SummaryFooter,
  SummaryFooterItem,
  SummaryFooterDot,
  PaymentButton,
  PaymentNote,
} from "@/components/Setup/styles";

// ─────────────────────────────────────────────
// Steps config
// ─────────────────────────────────────────────

const STEPS = [
  { label: "Choose Strategy", number: 1 },
  { label: "Connect Exchange", number: 2 },
  { label: "Choose Plan", number: 3 },
  { label: "Start Trading", number: 4 },
];

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────

export default function StartTradingPage() {
  const router = useRouter();
  const { strategy } = router.query;
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  const [onboarding, setOnboarding] = useState<OnboardingStatusDto | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login?redirect=/setup");
    }
  }, [isAuthenticated, router]);

  // Fetch onboarding status
  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    async function fetch() {
      try {
        const { data } = await userApi.getOnboardingStatus();
        if (cancelled) return;
        if (data.isSuccess && data.data) {
          setOnboarding(data.data);
        }
      } catch {
        // If check fails, show page with unknown status
      }
      if (!cancelled) setLoading(false);
    }

    fetch();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  if (!isAuthenticated || loading) return null;

  const strategyName =
    typeof strategy === "string"
      ? strategy
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : "Not selected";

  const exchangeConnected = onboarding?.hasActiveExchange ?? false;
  const exchangeStatus = onboarding?.exchangeStatus;
  const hasPlan = onboarding?.hasActiveSubscription ?? false;
  const planTier = onboarding?.subscriptionTier;
  const allComplete = onboarding?.setupComplete ?? false;

  const currentStep = 4;

  const handleContinue = () => {
    if (!exchangeConnected) {
      // Go back to setup to connect exchange
      router.push("/setup");
      return;
    }
    if (!hasPlan) {
      // Go to choose plan
      router.push(`/setup/choose-plan${strategy ? `?strategy=${strategy}` : ""}`);
      return;
    }
    // All done — go to profile/dashboard
    router.push("/profile");
  };

  const incompleteSteps = [
    !strategy && "strategy",
    !exchangeConnected && "exchange",
    !hasPlan && "plan",
  ].filter(Boolean);

  return (
    <>
      <Head>
        <title>Setup Progress - Fich</title>
      </Head>

      <Layout>
        <SetupSection>
          <SetupContainer>
            <PageTitle>Setup Progress</PageTitle>
            <PageSubtitle>
              Complete these steps to start automated trading
            </PageSubtitle>

            {/* ── Steps indicator ── */}
            <StepsBar>
              {STEPS.map((step, i) => (
                <React.Fragment key={step.number}>
                  <StepItem
                    $active={step.number === currentStep}
                    $completed={step.number < currentStep}
                  >
                    <StepNumber
                      $active={step.number === currentStep}
                      $completed={step.number < currentStep}
                    >
                      {step.number < currentStep ? (
                        <FaCheck size={10} />
                      ) : (
                        step.number
                      )}
                    </StepNumber>
                    <StepLabel>{step.label}</StepLabel>
                  </StepItem>
                  {i < STEPS.length - 1 && (
                    <StepConnector $completed={step.number < currentStep} />
                  )}
                </React.Fragment>
              ))}
            </StepsBar>

            {/* ── Summary card ── */}
            <SummaryCard>
              {/* Strategy */}
              <SummaryRow>
                <SummaryIcon $color="#F7931A">
                  <FaBolt />
                </SummaryIcon>
                <SummaryInfo>
                  <SummaryLabel>Strategy</SummaryLabel>
                  <SummaryValue>
                    {strategy ? `Fich ${strategyName}` : "Not selected"}
                  </SummaryValue>
                </SummaryInfo>
                {strategy ? (
                  <SummaryStatus $variant="success">
                    <FaCheck size={10} /> Selected
                  </SummaryStatus>
                ) : (
                  <SummaryStatus $variant="error">
                    <FaTimes size={10} /> Not selected
                  </SummaryStatus>
                )}
              </SummaryRow>

              {/* Exchange */}
              <SummaryRow>
                <SummaryIcon $color="#627EEA">
                  <FaLink />
                </SummaryIcon>
                <SummaryInfo>
                  <SummaryLabel>Exchange</SummaryLabel>
                  <SummaryValue>Binance</SummaryValue>
                </SummaryInfo>
                {exchangeConnected ? (
                  <SummaryStatus $variant="success">
                    <FaCheck size={10} /> Connected
                  </SummaryStatus>
                ) : exchangeStatus === "Pending" ? (
                  <SummaryStatus $variant="warning">
                    <FaChartLine size={10} /> Pending
                  </SummaryStatus>
                ) : (
                  <SummaryStatus $variant="error">
                    <FaTimes size={10} /> Not connected
                  </SummaryStatus>
                )}
              </SummaryRow>

              {/* Plan */}
              <SummaryRow>
                <SummaryIcon $color="#00D897">
                  <FaChartLine />
                </SummaryIcon>
                <SummaryInfo>
                  <SummaryLabel>Plan</SummaryLabel>
                  <SummaryValue>
                    {hasPlan && planTier ? `${planTier} Plan` : "No plan selected"}
                  </SummaryValue>
                </SummaryInfo>
                {hasPlan ? (
                  <SummaryStatus $variant="success">
                    <FaCheck size={10} /> Active
                  </SummaryStatus>
                ) : (
                  <SummaryStatus $variant="error">
                    <FaTimes size={10} /> Not chosen
                  </SummaryStatus>
                )}
              </SummaryRow>
            </SummaryCard>

            {/* ── Continue button ── */}
            <div style={{ maxWidth: 640, margin: "32px auto 0" }}>
              <PaymentButton onClick={handleContinue}>
                Continue
              </PaymentButton>

              <PaymentNote>
                {allComplete
                  ? "You're all set! Start trading now."
                  : "Complete the remaining steps to start trading"}
              </PaymentNote>
            </div>

            {/* ── Footer trust badges ── */}
            <SummaryFooter>
              <SummaryFooterItem>
                <FaShieldAlt size={11} /> Non-custodial
              </SummaryFooterItem>
              <SummaryFooterDot>&bull;</SummaryFooterDot>
              <SummaryFooterItem>API-only access</SummaryFooterItem>
              <SummaryFooterDot>&bull;</SummaryFooterDot>
              <SummaryFooterItem>Cancel anytime</SummaryFooterItem>
            </SummaryFooter>
          </SetupContainer>
        </SetupSection>
      </Layout>
    </>
  );
}
