import styled from "styled-components";

export { Section } from "@/components/ui/Section";
export { Container } from "@/components/ui/Section";
export { SectionHeader as Header } from "@/components/ui/Section";
export { SectionHeaderLeft as HeaderLeft } from "@/components/ui/Section";
export { SectionTitle as Title } from "@/components/ui/Typography";
export { SectionSubtitle as Subtitle } from "@/components/ui/Typography";
export { SubtleLink as BuyLink } from "@/components/ui/Link";
export { IconCircle as CryptoIcon } from "@/components/ui/IconWrapper";

export const AvatarGroup = styled.div`
  display: flex;
  gap: 0;
`;

export const Avatar = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  margin-left: -8px;
  border: 2px solid ${({ theme }) => theme.colors.background};

  &:first-child {
    margin-left: 0;
  }
`;

export const CryptoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const CryptoCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: border-color 0.3s, transform 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export const CryptoInfo = styled.div``;

export const CryptoName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const CryptoSymbol = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MiniChart = styled.div<{ $positive: boolean }>`
  width: 80px;
  height: 32px;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.primary : theme.colors.danger};
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const CryptoPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: right;
`;

export const CryptoChange = styled.div<{ $positive: boolean }>`
  font-size: 12px;
  text-align: right;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.primary : theme.colors.danger};
`;
