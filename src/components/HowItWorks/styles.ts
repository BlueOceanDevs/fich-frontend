import styled from "styled-components";
import { SectionSubtitle } from "@/components/ui/Typography";
import { IconSquare } from "@/components/ui/IconWrapper";

export { Section } from "@/components/ui/Section";
export { Container } from "@/components/ui/Section";
export { SectionTitle as Title } from "@/components/ui/Typography";
export { SubtleLink as CreateLink } from "@/components/ui/Link";

// Header is a two-column flex row at desktop: title + subtitle on the
// left, "Create account now →" link on the right (same baseline). On
// mobile it stacks vertically with the link last.
export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderTextBlock = styled.div`
  flex: 1;
`;

export const Subtitle = styled(SectionSubtitle)`
  margin-top: 12px;
  max-width: 540px;
`;

export const StepIconWrapper = styled(IconSquare)`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 28px;
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

// Each step is a single card with the icon at the top, then title +
// description. No separate image/photo area — the screenshot shows
// the icon directly inside the card.
export const StepCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 24px;
  transition: border-color 0.3s, transform 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export const StepTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const StepDescription = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;
