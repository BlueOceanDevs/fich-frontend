import styled from "styled-components";
import { SectionSubtitle } from "@/components/ui/Typography";
import { IconSquare } from "@/components/ui/IconWrapper";

export { Section } from "@/components/ui/Section";
export { Container } from "@/components/ui/Section";
export { SectionHeader as Header } from "@/components/ui/Section";
export { SectionTitle as Title } from "@/components/ui/Typography";
export { SubtleLink as CreateLink } from "@/components/ui/Link";

export const Subtitle = styled(SectionSubtitle)`
  max-width: 450px;
`;

export const StepIconWrapper = styled(IconSquare)`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const StepCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StepImage = styled.div`
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

export const StepTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  padding: 20px 20px 8px;
`;

export const StepDescription = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0 20px 24px;
  line-height: 1.6;
`;
