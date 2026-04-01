import styled from "styled-components";
import { SectionSubtitle } from "@/components/ui/Typography";
import { StaticCard } from "@/components/ui/Card";

export { Section } from "@/components/ui/Section";
export { Container } from "@/components/ui/Section";
export { SectionHeader as Header } from "@/components/ui/Section";
export { SectionHeaderLeft as HeaderLeft } from "@/components/ui/Section";
export { SectionTitle as Title } from "@/components/ui/Typography";

export const Subtitle = styled(SectionSubtitle)`
  max-width: 400px;
  padding-top: 8px;
`;

export const TestimonialCard = styled(StaticCard)`
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
  cursor: pointer;
  border: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const NavLabel = styled.span`
  font-size: 13px;
`;
