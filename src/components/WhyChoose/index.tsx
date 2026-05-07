import React from "react";
import { FaShieldAlt, FaBolt, FaUmbrella, FaChartLine } from "react-icons/fa";
import ScrollReveal, { StaggerChildren } from "@/components/ScrollReveal";
import {
  Section,
  Container,
  SectionHeading,
  SectionTitle,
  SectionSubtitle,
  CardsGrid,
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
} from "./styles";

// ─────────────────────────────────────────────
// Why Choose Fich? — 4 value props
// ─────────────────────────────────────────────
//
// Each icon is chosen to be visually distinct so the cards read at a
// glance. Shield for Non-Custodial (your account is shielded from
// us), bolt for Weekly Rebalancing (fast/automatic), umbrella for
// Crash Protection (shelter from the storm — visually distinct from
// the shield in card #1), chart-line for Verified Track Record (data
// over time).
const FEATURES = [
  {
    icon: <FaShieldAlt size={22} />,
    title: "100% Non-Custodial",
    description:
      "Your capital never leaves your personal Binance account.",
  },
  {
    icon: <FaBolt size={22} />,
    title: "Weekly Rebalancing",
    description:
      "Automatically rotate into the strongest altcoins every week.",
  },
  {
    icon: <FaUmbrella size={22} />,
    title: "Crash Protection",
    description:
      "We automatically move to cash when the market bleeds.",
  },
  {
    icon: <FaChartLine size={22} />,
    title: "Verified Track Record",
    description:
      "Six years of fully transparent, verifiable trade data.",
  },
];

const WhyChoose: React.FC = () => {
  return (
    <Section id="why-fich">
      <Container>
        <ScrollReveal>
          <SectionHeading>
            <SectionTitle>Why Choose Fich?</SectionTitle>
            <SectionSubtitle>
              Built for serious investors who want exposure to the right
              assets without watching charts every day.
            </SectionSubtitle>
          </SectionHeading>
        </ScrollReveal>
        <StaggerChildren staggerDelay={120} distance={30}>
          <CardsGrid>
            {FEATURES.map((f) => (
              <Card key={f.title}>
                <CardIcon>{f.icon}</CardIcon>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.description}</CardDescription>
              </Card>
            ))}
          </CardsGrid>
        </StaggerChildren>
      </Container>
    </Section>
  );
};

export default WhyChoose;
