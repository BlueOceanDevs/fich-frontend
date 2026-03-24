import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { TaglineSection, TaglineText } from "./styles";

const Tagline: React.FC = () => {
  return (
    <TaglineSection>
      <ScrollReveal direction="none" duration={900}>
        <TaglineText>
          Simplicity, performance, and security,
          <br />
          empowering you to navigate the digital
          <br />
          world with confidence and agility.
        </TaglineText>
      </ScrollReveal>
    </TaglineSection>
  );
};

export default Tagline;
