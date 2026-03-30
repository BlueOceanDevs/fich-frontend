import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPlans, setBillingCycle, FALLBACK_PRICES } from "@/store/pricingSlice";
import { activateFreePlan, startTrial, fetchSubscription } from "@/store/subscriptionSlice";
import { ordersApi } from "@/api/orders";
import { subscriptionsApi } from "@/api/subscriptions";
import { FaCheck } from "react-icons/fa";
import ScrollReveal, { StaggerChildren } from "@/components/ScrollReveal";
import {
  Section,
  Container,
  Header,
  HeaderLeft,
  Title,
  Subtitle,
  ToggleRow,
  ToggleButton,
  DiscountBadge,
  PlansGrid,
  PlanCard,
  PopularBadge,
  PlanName,
  PlanPrice,
  PlanPeriod,
  PlanDescription,
  PlanDivider,
  FeatureSectionHeader,
  FeaturesList,
  FeatureItem,
  FeatureIcon,
  PlanCTA,
  TrialLink,
} from "./styles";

const Pricing: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { billingCycle, tierGroups, usedFallback } = useAppSelector(
    (s) => s.pricing
  );
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const { subscription } = useAppSelector((s) => s.subscription);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usedTrialTiers, setUsedTrialTiers] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  // Fetch which tiers the user has already trialed
  useEffect(() => {
    if (!isAuthenticated) {
      setUsedTrialTiers([]);
      return;
    }
    subscriptionsApi
      .getUsedTrialTiers()
      .then(({ data }) => {
        if (data.isSuccess && data.data) {
          setUsedTrialTiers(data.data);
        }
      })
      .catch(() => {});
  }, [isAuthenticated]);

  // ── Handlers ──

  const handleFreePlan = async () => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/plans");
      return;
    }
    setActionLoading("Free");
    setError(null);
    try {
      await dispatch(activateFreePlan()).unwrap();
      dispatch(fetchSubscription());
      router.push("/profile");
    } catch (err: any) {
      setError(typeof err === "string" ? err : "Failed to activate free plan.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleStartTrial = async (planId: number, tier: string) => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/plans");
      return;
    }
    setActionLoading(`trial-${tier}`);
    setError(null);
    try {
      await dispatch(startTrial(planId)).unwrap();
      setUsedTrialTiers((prev) => [...prev, tier]);
      dispatch(fetchSubscription());
      router.push("/profile");
    } catch (err: any) {
      setError(typeof err === "string" ? err : "Failed to start trial.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSubscribe = async (planId: number, tier: string) => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/plans");
      return;
    }
    setActionLoading(`subscribe-${tier}`);
    setError(null);
    try {
      const { data } = await ordersApi.createOrder({ planId });
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

  const isCurrentPlan = (tier: string) => {
    return subscription?.isActive && subscription.planTier === tier;
  };

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

  return (
    <Section id="pricing">
      <Container>
        <ScrollReveal>
          <Header>
            <HeaderLeft>
              <Title>
                Choose Your Plan,
                <br />
                Start Trading Today.
              </Title>
            </HeaderLeft>
            <Subtitle>
              Transparent pricing for every investor. Scale as you grow with no
              hidden fees or surprise charges.
            </Subtitle>
          </Header>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <ToggleRow>
            <ToggleButton
              $active={billingCycle === "monthly"}
              onClick={() => dispatch(setBillingCycle("monthly"))}
            >
              Monthly
            </ToggleButton>
            <ToggleButton
              $active={billingCycle === "yearly"}
              onClick={() => dispatch(setBillingCycle("yearly"))}
            >
              Yearly
            </ToggleButton>
            {maxSavings > 0 && (
              <DiscountBadge>{maxSavings}% OFF</DiscountBadge>
            )}
          </ToggleRow>
        </ScrollReveal>

        {error && (
          <p
            style={{
              color: "#ef4444",
              textAlign: "center",
              marginBottom: 24,
              fontSize: 14,
            }}
          >
            {error}
          </p>
        )}

        <StaggerChildren staggerDelay={150} distance={30}>
          <PlansGrid>
            {tierGroups.map((group) => {
              const isFree = group.tier === "Free";
              const isCurrent = isCurrentPlan(group.tier);
              const price = getPrice(group);
              const plan = getActivePlan(group);
              const hasTrial =
                group.hasFreeTrial &&
                group.trialDays > 0 &&
                !usedTrialTiers.includes(group.tier);
              const isYearly = billingCycle === "yearly";

              return (
                <PlanCard key={group.tier} $popular={group.popular}>
                  {group.popular && <PopularBadge>Popular</PopularBadge>}
                  <PlanName>{group.tier}</PlanName>
                  <PlanPrice>
                    ${isFree ? "0" : price % 1 === 0 ? price.toFixed(0) : price.toFixed(2)}
                    <PlanPeriod>
                      {isFree ? "" : isYearly ? "/year" : "/month"}
                    </PlanPeriod>
                  </PlanPrice>
                  <PlanDescription>{group.description}</PlanDescription>

                  {isCurrent ? (
                    <PlanCTA
                      $popular={group.popular}
                      disabled
                      style={{ opacity: 0.6, cursor: "default" }}
                    >
                      Current Plan
                    </PlanCTA>
                  ) : isFree ? (
                    <PlanCTA
                      $popular={group.popular}
                      disabled={actionLoading === "Free"}
                      onClick={handleFreePlan}
                    >
                      {actionLoading === "Free"
                        ? "Activating..."
                        : "Get started"}
                    </PlanCTA>
                  ) : usedFallback ? (
                    // Fallback mode — no real plan IDs, just link to signup
                    <PlanCTA
                      $popular={group.popular}
                      onClick={() =>
                        router.push(isAuthenticated ? "/plans" : "/login?redirect=/plans")
                      }
                    >
                      Get started
                    </PlanCTA>
                  ) : (
                    <>
                      <PlanCTA
                        $popular={group.popular}
                        disabled={
                          actionLoading === `subscribe-${group.tier}`
                        }
                        onClick={() =>
                          plan && handleSubscribe(plan.id, group.tier)
                        }
                      >
                        {actionLoading === `subscribe-${group.tier}`
                          ? "Processing..."
                          : "Get started"}
                      </PlanCTA>
                      {hasTrial && plan && (
                        <TrialLink
                          disabled={
                            actionLoading === `trial-${group.tier}`
                          }
                          onClick={() =>
                            handleStartTrial(plan.id, group.tier)
                          }
                        >
                          {actionLoading === `trial-${group.tier}`
                            ? "Starting..."
                            : `Start ${group.trialDays}-day free trial`}
                        </TrialLink>
                      )}
                    </>
                  )}

                  <PlanDivider />

                  <FeatureSectionHeader>
                    {group.featureHeader}
                  </FeatureSectionHeader>

                  <FeaturesList>
                    {group.features.map((feature) => (
                      <FeatureItem key={feature}>
                        <FeatureIcon $popular={group.popular}>
                          <FaCheck size={10} />
                        </FeatureIcon>
                        {feature}
                      </FeatureItem>
                    ))}
                  </FeaturesList>
                </PlanCard>
              );
            })}
          </PlansGrid>
        </StaggerChildren>
      </Container>
    </Section>
  );
};

export default Pricing;
