import styled from "styled-components";
import { SectionSubtitle } from "@/components/ui/Typography";

export { Section } from "@/components/ui/Section";
export { Container } from "@/components/ui/Section";
export { SectionHeader as Header } from "@/components/ui/Section";
export { SectionHeaderLeft as HeaderLeft } from "@/components/ui/Section";
export { SectionTitle as Title } from "@/components/ui/Typography";

export const Subtitle = styled(SectionSubtitle)`
  max-width: 380px;
  padding-top: 8px;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 48px;
  justify-content: center;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 14px;
  font-weight: 500;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.text : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.background : theme.colors.textSecondary};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.text : theme.colors.cardBorder};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

export const DiscountBadge = styled.span`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(0, 216, 151, 0.12);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin: 0 auto;
  }
`;

export const PlanCard = styled.div<{ $popular: boolean }>`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid
    ${({ $popular, theme }) =>
      $popular ? theme.colors.primary : theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 32px;
  position: relative;
  transition: border-color 0.3s, transform 0.3s;

  ${({ $popular }) =>
    $popular &&
    `
    box-shadow: 0 0 40px rgba(0, 216, 151, 0.08);
  `}

  &:hover {
    transform: translateY(-4px);
  }
`;

export const PopularBadge = styled.span`
  position: absolute;
  top: -12px;
  left: 32px;
  padding: 4px 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 12px;
  font-weight: 600;
`;

export const PlanName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const PlanPrice = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const PlanPeriod = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PlanDescription = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
  line-height: 1.5;
`;

export const PlanCTA = styled.button<{ $popular: boolean }>`
  display: block;
  width: 100%;
  text-align: center;
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $popular, theme }) =>
    $popular ? theme.colors.primary : "transparent"};
  color: ${({ $popular, theme }) =>
    $popular ? theme.colors.background : theme.colors.text};
  border: 1px solid
    ${({ $popular, theme }) =>
      $popular ? theme.colors.primary : theme.colors.cardBorder};

  &:hover:not(:disabled) {
    background: ${({ $popular, theme }) =>
      $popular ? theme.colors.primaryHover : theme.colors.backgroundLight};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PlanDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.cardBorder};
  margin: 24px 0;
`;

export const FeatureSectionHeader = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 16px;
`;

export const FeaturesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TrialLink = styled.button`
  display: block;
  width: 100%;
  margin-top: 10px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FeatureIcon = styled.span<{ $popular: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ $popular, theme }) =>
    $popular ? "rgba(0, 216, 151, 0.15)" : theme.colors.backgroundLight};
  color: ${({ $popular, theme }) =>
    $popular ? theme.colors.primary : theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
