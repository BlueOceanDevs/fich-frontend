import React from "react";
import { FaShieldAlt, FaBolt, FaChartLine, FaPalette } from "react-icons/fa";
import ScrollReveal, { StaggerChildren } from "@/components/ScrollReveal";
import {
  Section,
  Container,
  SectionTitle,
  SectionSubtitle,
  CardsGrid,
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
} from "./styles";

const FEATURES = [
  {
    icon: <FaShieldAlt size={22} />,
    title: "Maximum Security",
    description:
      "Your assets are protected with cutting-edge security protocols.",
  },
  {
    icon: <FaBolt size={22} />,
    title: "Instant Transactions",
    description:
      "Execute your transactions in real-time, without delays.",
  },
  {
    icon: <FaChartLine size={22} />,
    title: "Optimized Fees",
    description:
      "Benefit from some of the lowest fees on the market.",
  },
  {
    icon: <FaPalette size={22} />,
    title: "Premium Interface",
    description:
      "An intuitive design that's easy to use, even for beginners.",
  },
];

const WhyChoose: React.FC = () => {
  return (
    <Section>
      <Container>
        <ScrollReveal>
          <SectionTitle>Why Choose Fich?</SectionTitle>
          <SectionSubtitle>
            Carefully designed to provide a seamless, secure, and accessible
            experience for all users.
          </SectionSubtitle>
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
