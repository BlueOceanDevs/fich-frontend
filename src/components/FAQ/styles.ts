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

// "Read more" link rendered below the homepage's 4-question preview.
// Routes to /faq for the full list. Visually a pill-style outlined
// button so it reads as a clear secondary action (the green "Get
// started" CTAs above are the primary path).
export const ReadMoreRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

export const ReadMoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(0, 216, 151, 0.06);
  }
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

// Some FAQ answers run to ~6 lines (e.g. drawdown / setup detail).
// max-height needs to be generous enough to fit the longest answer
// without clipping, but pure `auto` doesn't transition. 800px is the
// max content height across the current 16 answers with breathing
// room to spare.
export const FaqAnswer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "800px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  padding-bottom: ${({ $open }) => ($open ? "20px" : "0")};
`;
