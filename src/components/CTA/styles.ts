import styled from "styled-components";

export { Section } from "@/components/ui/Section";
export { CTAButton } from "@/components/ui/Button";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.2;
  margin-bottom: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 30px;
  }
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 460px;
  margin-left: auto;
  margin-right: auto;
`;
