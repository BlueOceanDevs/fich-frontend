import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBillingCycle } from "@/store/pricingSlice";
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
  FeaturesList,
  FeatureItem,
  FeatureIcon,
  PlanCTA,
} from "./styles";

const Pricing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { billingCycle, plans } = useAppSelector((s) => s.pricing);

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
            <DiscountBadge>25% OFF</DiscountBadge>
          </ToggleRow>
        </ScrollReveal>

        <StaggerChildren staggerDelay={150} distance={30}>
          <PlansGrid>
            {plans.map((plan) => (
              <PlanCard key={plan.id} $popular={plan.popular}>
                {plan.popular && <PopularBadge>Popular</PopularBadge>}
                <PlanName>{plan.name}</PlanName>
                <PlanPrice>
                  {billingCycle === "monthly"
                    ? plan.monthlyPrice
                    : plan.yearlyPrice}
                  <PlanPeriod>/month</PlanPeriod>
                </PlanPrice>
                <PlanDescription>{plan.description}</PlanDescription>
                <PlanCTA href="#" $popular={plan.popular}>
                  {plan.ctaLabel}
                </PlanCTA>
                <PlanDivider />
                <FeaturesList>
                  {plan.features.map((feature) => (
                    <FeatureItem key={feature}>
                      <FeatureIcon $popular={plan.popular}>
                        <FaCheck size={10} />
                      </FeatureIcon>
                      {feature}
                    </FeatureItem>
                  ))}
                </FeaturesList>
              </PlanCard>
            ))}
          </PlansGrid>
        </StaggerChildren>
      </Container>
    </Section>
  );
};

export default Pricing;
