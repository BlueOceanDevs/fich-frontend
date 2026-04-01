import styled from "styled-components";
import { SectionSubtitle as BaseSectionSubtitle } from "@/components/ui/Typography";
import { Card as BaseCard } from "@/components/ui/Card";

export { Section } from "@/components/ui/Section";
export { Container } from "@/components/ui/Section";
export { SectionTitle } from "@/components/ui/Typography";

export const SectionSubtitle = styled(BaseSectionSubtitle)`
  max-width: 420px;
  margin: 0 auto 60px;
`;

export const Card = styled(BaseCard)`
  padding: 36px 24px;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const CardIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const CardDescription = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;
