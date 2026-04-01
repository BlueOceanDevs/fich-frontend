import styled from "styled-components";
import { fadeInUp } from "@/components/ui/animations";

export { CTAButton as HeroButton } from "@/components/ui/Button";

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 140px 24px 60px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(0, 216, 151, 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const HeroContent = styled.div`
  max-width: 700px;
  animation: ${fadeInUp} 0.8s ease-out;
`;

export const HeroTitle = styled.h1`
  font-size: 64px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1.5px;
  margin-bottom: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 40px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 520px;
  margin: 0 auto 32px;
  line-height: 1.7;
`;

export const TrustRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`;

export const TrustLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Stars = styled.div`
  display: flex;
  gap: 3px;
  color: ${({ theme }) => theme.colors.primary};
`;
