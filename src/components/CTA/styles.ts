import styled from "styled-components";

export const Section = styled.section`
  padding: 100px 24px;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

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

export const CTAButton = styled.a`
  display: inline-block;
  padding: 14px 32px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 15px;
  font-weight: 600;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 216, 151, 0.3);
  }
`;
