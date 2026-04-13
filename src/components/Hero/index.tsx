import React from "react";
import { FaStar } from "react-icons/fa";
import HeroPreview from "./HeroPreview";
import {
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroButton,
  TrustRow,
  TrustLabel,
  Stars,
} from "./styles";

const Hero: React.FC = () => {
  return (
    <HeroSection id="hero">
      <HeroContent>
        <HeroTitle>
          Take Control of
          <br />
          Your Digital Assets
        </HeroTitle>
        <HeroSubtitle>
          Fich offers a seamless, secure experience for managing your digital
          assets. Instant transactions, optimized fees, and premium design.
        </HeroSubtitle>
        <HeroButton href="#pricing">
          Get started now &rarr;
        </HeroButton>
        <TrustRow>
          <TrustLabel>They trust us</TrustLabel>
          <Stars>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </Stars>
        </TrustRow>
      </HeroContent>
      <HeroPreview />
    </HeroSection>
  );
};

export default Hero;
