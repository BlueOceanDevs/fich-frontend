import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  FaCheck,
  FaChevronLeft,
  FaShieldAlt,
  FaLock,
  FaHeadset,
  FaUndo,
  FaQuestionCircle,
} from "react-icons/fa";
import Layout from "@/components/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPlans, setBillingCycle, FALLBACK_PRICES } from "@/store/pricingSlice";
import {
  activateFreePlan,
  startTrial,
  fetchSubscription,
} from "@/store/subscriptionSlice";
import { ordersApi } from "@/api/orders";
import { subscriptionsApi } from "@/api/subscriptions";
import { Spinner } from "@/components/ui/Button";
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
  BackButton,
  TrustBadges,
  TrustBadge,
  PlanToggleRow,
  PlanToggleButton,
  SaveBadge,
  PlansRow,
  PlanOption,
  PlanPopularTag,
  PlanSelectedCheck,
  PlanOptionName,
  PlanFeatureRow,
  PlanOptionPrice,
  PlanPriceUnit,
  PlanBilledNote,
  HelpLink,
  PaymentButton,
  PaymentNote,
  PayLaterLink,
  CurrentPlanBadge,
  BottomActions,
  FormAlert,
} from "@/components/Setup/styles";

// ─────────────────────────────────────────────
// Steps config (same as setup.tsx)
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

export default function ChoosePlanPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { strategy } = router.query;
  const strategyParam = typeof strategy === "string" ? strategy : "";
  const nextStep = `/setup/start-trading${strategyParam ? `?strategy=${strategyParam}` : ""}`;

  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const { billingCycle, tierGroups, usedFallback } = useAppSelector(
    (s) => s.pricing
  );
  const { subscription } = useAppSelector((s) => s.subscription);

  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usedTrialTiers, setUsedTrialTiers] = useState<string[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login?redirect=/setup");
    }
  }, [isAuthenticated, router]);

  // Fetch plans and subscription
  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(fetchPlans());
    dispatch(fetchSubscription());
  }, [dispatch, isAuthenticated]);

  // Fetch used trial tiers
  useEffect(() => {
    if (!isAuthenticated) return;
    subscriptionsApi
      .getUsedTrialTiers()
      .then(({ data }) => {
        if (data.isSuccess && data.data) {
          setUsedTrialTiers(data.data);
        }
      })
      .catch(() => {});
  }, [isAuthenticated]);

  // Auto-select current plan or popular tier
  useEffect(() => {
    if (selectedTier) return;
    if (subscription?.isActive) {
      setSelectedTier(subscription.planTier);
    } else {
      const popular = tierGroups.find((g) => g.popular);
      if (popular) setSelectedTier(popular.tier);
    }
  }, [tierGroups, subscription, selectedTier]);

  if (!isAuthenticated) return null;

  const currentStep = 3;

  // ── Price helpers ──

  const getPrice = (group: (typeof tierGroups)[0]): number => {
    if (usedFallback) {
      const fb = FALLBACK_PRICES[group.tier];
      if (!fb) return 0;
      return billingCycle === "yearly" ? fb.yearly : fb.monthly;
    }
    const plan =
      billingCycle === "yearly" && group.yearlyPlan
        ? group.yearlyPlan
        : group.monthlyPlan ?? group.yearlyPlan;
    return plan?.effectivePriceUsd ?? 0;
  };

  const getMonthlyEquivalent = (group: (typeof tierGroups)[0]): number => {
    if (billingCycle !== "yearly") return getPrice(group);
    const yearlyPrice = getPrice(group);
    return yearlyPrice > 0 ? +(yearlyPrice / 12).toFixed(2) : 0;
  };

  const getActivePlan = (group: (typeof tierGroups)[0]) => {
    return billingCycle === "yearly" && group.yearlyPlan
      ? group.yearlyPlan
      : group.monthlyPlan ?? group.yearlyPlan;
  };

  const getYearlySavings = (group: (typeof tierGroups)[0]) => {
    if (usedFallback) {
      const fb = FALLBACK_PRICES[group.tier];
      if (!fb || fb.monthly <= 0) return 0;
      const annualMonthly = fb.monthly * 12;
      return Math.round(((annualMonthly - fb.yearly) / annualMonthly) * 100);
    }
    if (!group.monthlyPlan || !group.yearlyPlan) return 0;
    const monthlyAnnual = group.monthlyPlan.effectivePriceUsd * 12;
    const yearlyPrice = group.yearlyPlan.effectivePriceUsd;
    if (monthlyAnnual <= 0) return 0;
    return Math.round(((monthlyAnnual - yearlyPrice) / monthlyAnnual) * 100);
  };

  const maxSavings = Math.max(...tierGroups.map(getYearlySavings), 0);

  const isCurrentPlan = (tier: string) => {
    return subscription?.isActive && subscription.planTier === tier;
  };

  const selectedGroup = tierGroups.find((g) => g.tier === selectedTier);

  // ── Handlers ──

  const handleContinueToPayment = async () => {
    if (!selectedGroup) return;

    const plan = getActivePlan(selectedGroup);
    const isFree = selectedGroup.tier === "Free";

    // If this is already the user's plan, skip to next step
    if (isCurrentPlan(selectedGroup.tier)) {
      router.push(nextStep);
      return;
    }

    setError(null);

    if (isFree) {
      setActionLoading("free");
      try {
        await dispatch(activateFreePlan()).unwrap();
        dispatch(fetchSubscription());
        router.push(nextStep);
      } catch (err: any) {
        setError(typeof err === "string" ? err : "Failed to activate free plan.");
      } finally {
        setActionLoading(null);
      }
      return;
    }

    if (!plan) return;

    // Paid plan — create order and redirect to NowPayments
    setActionLoading("pay");
    try {
      const { data } = await ordersApi.createOrder({ planId: plan.id });
      if (data.isSuccess && data.data?.invoiceUrl) {
        window.location.href = data.data.invoiceUrl;
      } else {
        setError(data.errors?.[0] ?? "Failed to create order.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.errors?.[0] ?? "Failed to create payment. Try again."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleStartTrial = async () => {
    if (!selectedGroup) return;
    const plan = getActivePlan(selectedGroup);
    if (!plan) return;

    setActionLoading("trial");
    setError(null);

    try {
      await dispatch(startTrial(plan.id)).unwrap();
      setUsedTrialTiers((prev) => [...prev, selectedGroup.tier]);
      dispatch(fetchSubscription());
      router.push(nextStep);
    } catch (err: any) {
      setError(typeof err === "string" ? err : "Failed to start trial.");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePayLater = () => {
    // Activate free plan as a fallback
    handleFreeFallback();
  };

  const handleFreeFallback = async () => {
    setActionLoading("later");
    setError(null);
    try {
      await dispatch(activateFreePlan()).unwrap();
      dispatch(fetchSubscription());
      router.push(nextStep);
    } catch (err: any) {
      setError(typeof err === "string" ? err : "Failed to continue.");
    } finally {
      setActionLoading(null);
    }
  };

  const selectedHasTrial =
    selectedGroup &&
    selectedGroup.hasFreeTrial &&
    selectedGroup.trialDays > 0 &&
    !usedTrialTiers.includes(selectedGroup.tier) &&
    selectedGroup.tier !== "Free";

  const isLoading = !!actionLoading;

  return (
    <>
      <Head>
        <title>Choose Plan - Fich</title>
      </Head>

      <Layout>
        <SetupSection>
          <SetupContainer>
            {/* ── Back button ── */}
            <div style={{ marginBottom: 24 }}>
              <BackButton onClick={() => router.back()}>
                <FaChevronLeft size={12} style={{ marginRight: 6 }} />
                Back
              </BackButton>
            </div>

            <PageTitle>Choose Plan</PageTitle>
            <PageSubtitle>
              Takes 1 minute. Cancel anytime.
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

            {/* ── Trust badges ── */}
            <TrustBadges>
              <TrustBadge>
                <FaLock size={12} /> Secure checkout
              </TrustBadge>
              <TrustBadge>
                <FaUndo size={12} /> Cancel anytime
              </TrustBadge>
              <TrustBadge>
                <FaShieldAlt size={12} /> No custody
              </TrustBadge>
              <TrustBadge>
                <FaHeadset size={12} /> Support available
              </TrustBadge>
            </TrustBadges>

            {/* ── Billing toggle ── */}
            <PlanToggleRow>
              <PlanToggleButton
                $active={billingCycle === "monthly"}
                onClick={() => dispatch(setBillingCycle("monthly"))}
              >
                Monthly
              </PlanToggleButton>
              <PlanToggleButton
                $active={billingCycle === "yearly"}
                onClick={() => dispatch(setBillingCycle("yearly"))}
              >
                Yearly
                {maxSavings > 0 && <SaveBadge>Save {maxSavings}%</SaveBadge>}
              </PlanToggleButton>
            </PlanToggleRow>

            {/* ── Error ── */}
            {error && (
              <div style={{ maxWidth: 600, margin: "0 auto 24px" }}>
                <FormAlert $variant="error">{error}</FormAlert>
              </div>
            )}

            {/* ── Plan cards ── */}
            <PlansRow>
              {tierGroups.map((group) => {
                const isFree = group.tier === "Free";
                const isSelected = selectedTier === group.tier;
                const isCurrent = isCurrentPlan(group.tier);
                const price = getPrice(group);
                const monthlyEq = getMonthlyEquivalent(group);
                const features = group.features.slice(0, 3);

                return (
                  <PlanOption
                    key={group.tier}
                    $selected={isSelected}
                    $popular={group.popular}
                    onClick={() => setSelectedTier(group.tier)}
                  >
                    {group.popular && (
                      <PlanPopularTag>Most Popular</PlanPopularTag>
                    )}
                    {isSelected && (
                      <PlanSelectedCheck>
                        <FaCheck size={10} />
                      </PlanSelectedCheck>
                    )}

                    <PlanOptionName>{group.tier}</PlanOptionName>

                    {features.map((f) => (
                      <PlanFeatureRow key={f}>
                        <FaCheck size={10} /> {f}
                      </PlanFeatureRow>
                    ))}

                    <PlanOptionPrice>
                      $
                      {isFree
                        ? "0"
                        : billingCycle === "yearly"
                          ? monthlyEq % 1 === 0
                            ? monthlyEq.toFixed(0)
                            : monthlyEq.toFixed(2)
                          : price % 1 === 0
                            ? price.toFixed(0)
                            : price.toFixed(2)}
                      <PlanPriceUnit>
                        {isFree ? "" : "/month"}
                      </PlanPriceUnit>
                    </PlanOptionPrice>

                    {!isFree && billingCycle === "yearly" && (
                      <PlanBilledNote>
                        Billed yearly (${price.toFixed(2)})
                      </PlanBilledNote>
                    )}

                    {isCurrent && (
                      <CurrentPlanBadge>Current Plan</CurrentPlanBadge>
                    )}
                  </PlanOption>
                );
              })}
            </PlansRow>

            {/* ── Help link ── */}
            <HelpLink onClick={() => router.push("/plans")}>
              <FaQuestionCircle size={13} /> Need help choosing?
            </HelpLink>

            {/* ── Continue to payment ── */}
            <PaymentButton
              $disabled={!selectedTier || isLoading}
              disabled={!selectedTier || isLoading}
              onClick={handleContinueToPayment}
            >
              {actionLoading === "pay" || actionLoading === "free" ? (
                <>
                  <Spinner /> Processing...
                </>
              ) : isCurrentPlan(selectedTier ?? "") ? (
                "Continue with Current Plan"
              ) : selectedTier === "Free" ? (
                "Continue with Free Plan"
              ) : (
                "Continue to payment"
              )}
            </PaymentButton>

            <PaymentNote>
              Next: after payment you&apos;ll confirm your exchange connection and
              start trading
            </PaymentNote>
            <PaymentNote>Cancel anytime &bull; No long-term commitment</PaymentNote>

            {/* ── Trial link ── */}
            {selectedHasTrial && (
              <PayLaterLink
                disabled={actionLoading === "trial"}
                onClick={handleStartTrial}
              >
                {actionLoading === "trial"
                  ? "Starting trial..."
                  : `Start ${selectedGroup!.trialDays}-day free trial`}
              </PayLaterLink>
            )}

            {/* ── Pay later ── */}
            {selectedTier !== "Free" && (
              <PayLaterLink
                disabled={actionLoading === "later"}
                onClick={handlePayLater}
              >
                {actionLoading === "later"
                  ? "Processing..."
                  : <>Pay later <span>(not recommended)</span></>}
              </PayLaterLink>
            )}

            {/* ── Bottom trust note ── */}
            <div style={{ marginTop: 48, textAlign: "center" }}>
              <PaymentNote style={{ color: "inherit", opacity: 0.4, fontSize: 12 }}>
                <FaShieldAlt
                  size={11}
                  style={{ marginRight: 6, verticalAlign: "middle" }}
                />
                Your funds stay on your exchange. Fich only trades — it can&apos;t
                withdraw
              </PaymentNote>
            </div>
          </SetupContainer>
        </SetupSection>
      </Layout>
    </>
  );
}
