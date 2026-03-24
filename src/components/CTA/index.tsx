import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Section,
  Container,
  Title,
  Subtitle,
  CTAButton,
} from "./styles";

const CTA: React.FC = () => {
  return (
    <Section>
      <Container>
        <ScrollReveal direction="none" duration={900}>
          <Title>
            Ready to take control
            <br />
            of your crypto?
          </Title>
          <Subtitle>
            Join thousands of users who trust Fich for secure, seamless, and
            efficient cryptocurrency transactions.
          </Subtitle>
          <CTAButton href="#pricing">
            Get started now &rarr;
          </CTAButton>
        </ScrollReveal>
      </Container>
    </Section>
  );
};

export default CTA;
