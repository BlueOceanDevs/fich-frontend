import React from "react";
import { FaUserPlus, FaWallet, FaExchangeAlt } from "react-icons/fa";
import ScrollReveal, { StaggerChildren } from "@/components/ScrollReveal";
import {
  Section,
  Container,
  Header,
  Title,
  Subtitle,
  CreateLink,
  StepsGrid,
  StepCard,
  StepImage,
  StepIconWrapper,
  StepTitle,
  StepDescription,
} from "./styles";

const STEPS = [
  {
    icon: <FaUserPlus size={24} />,
    title: "Create your account",
    description:
      "Sign up easily and securely. Set your profile in just a few clicks.",
    color: "#627EEA",
  },
  {
    icon: <FaWallet size={24} />,
    title: "Fund your wallet",
    description:
      "Deposit your crypto or make a transfer to start trading.",
    color: "#00D897",
  },
  {
    icon: <FaExchangeAlt size={24} />,
    title: "Buy, sell, or convert",
    description:
      "Enjoy the simplicity of a platform that makes every transaction seamless in real-time.",
    color: "#9945FF",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <Section id="how-it-works">
      <Container>
        <ScrollReveal>
          <Header>
            <div>
              <Title>How It Works</Title>
              <Subtitle>
                A simple, fast, and secure platform to manage your
                crypto investments in just a few steps.
              </Subtitle>
            </div>
            <CreateLink href="#">
              Create account now &rarr;
            </CreateLink>
          </Header>
        </ScrollReveal>
        <StaggerChildren staggerDelay={150} distance={30}>
          <StepsGrid>
            {STEPS.map((step) => (
              <StepCard key={step.title}>
                <StepImage>
                  <StepIconWrapper $color={step.color}>
                    {step.icon}
                  </StepIconWrapper>
                </StepImage>
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
