import styled from "styled-components";
import { SectionSubtitle } from "@/components/ui/Typography";

export { Section } from "@/components/ui/Section";
export { Container } from "@/components/ui/Section";
export { SectionHeader as Header } from "@/components/ui/Section";
export { SectionHeaderLeft as HeaderLeft } from "@/components/ui/Section";
export { SectionTitle as Title } from "@/components/ui/Typography";
export { SubtleLink as CreateLink } from "@/components/ui/Link";

export const Subtitle = styled(SectionSubtitle)`
  max-width: 420px;
`;

export const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const FaqItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.01);
  }
`;

export const FaqQuestion = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  font-size: 15px;
  font-weight: 500;
  gap: 16px;
`;

export const FaqIcon = styled.span<{ $open: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s;
  transform: rotate(${({ $open }) => ($open ? "45deg" : "0deg")});
`;

export const FaqAnswer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  padding-bottom: ${({ $open }) => ($open ? "20px" : "0")};
`;
