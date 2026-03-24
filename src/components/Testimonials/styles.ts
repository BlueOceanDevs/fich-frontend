import styled from "styled-components";

export const Section = styled.section`
  padding: 100px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 48px;
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const HeaderLeft = styled.div``;

export const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 400px;
  line-height: 1.6;
  padding-top: 8px;
`;

export const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 40px;
  max-width: 480px;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 28px;
    max-width: 100%;
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Badge = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
`;

export const QuoteText = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

export const AuthorName = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

export const AuthorRole = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 4px;
`;

export const QuoteIcon = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.4;
`;

export const NavRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 24px;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const NavLabel = styled.span`
  font-size: 13px;
`;
