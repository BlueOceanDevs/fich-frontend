import React from "react";
import { FaUserPlus, FaEnvelopeOpenText, FaExchangeAlt } from "react-icons/fa";
import ScrollReveal, { StaggerChildren } from "@/components/ScrollReveal";
import {
  Section,
  Container,
  Header,
  HeaderTextBlock,
  Title,
  Subtitle,
  CreateLink,
  StepsGrid,
  StepCard,
  StepIconWrapper,
  StepTitle,
  StepDescription,
} from "./styles";

const STEPS = [
  {
    icon: <FaUserPlus size={20} />,
    title: "Create your account",
    description:
      "Sign up easily and securely. Set your profile in just a few clicks.",
    color: "#627EEA",
  },
  {
    icon: <FaEnvelopeOpenText size={20} />,
    title: "Start receiving our newsletter",
    description: "Weekly email with portfolio positions.",
    color: "#00D897",
  },
  // WAITLIST MODE — step 3 softened while Binance connect is hidden.
  // Original:
  //   title: "Connect your Binance account"
  //   description: "Connect your exchange API keys and follow our
  //                 investment strategy on autopilot."
  {
    icon: <FaExchangeAlt size={20} />,
    title: "Connect your exchange (coming soon)",
    description:
      "Once we launch you'll connect your exchange and follow the strategy on autopilot. Join the newsletter to be first.",
    color: "#9945FF",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <Section id="how-it-works">
      <Container>
        <ScrollReveal>
          <Header>
            <HeaderTextBlock>
              <Title>How It Works</Title>
              <Subtitle>
                Believe in the potential of crypto? Fich is how you get the
                best of it.
              </Subtitle>
            </HeaderTextBlock>
            <CreateLink href="/signup">
              Create account now &rarr;
            </CreateLink>
          </Header>
        </ScrollReveal>
        <StaggerChildren staggerDelay={150} distance={30}>
          <StepsGrid>
            {STEPS.map((step) => (
              <StepCard key={step.title}>
                <StepIconWrapper $color={step.color}>
                  {step.icon}
                </StepIconWrapper>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepCard>
            ))}
          </StepsGrid>
        </StaggerChildren>
      </Container>
    </Section>
  );
};

export default HowItWorks;
