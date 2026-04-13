import styled from "styled-components";
import { Card } from "./styles";

export const PerfSection = styled.div`
  margin-top: 20px;
`;

export const PerfStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const PerfStatCard = styled(Card)`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PerfStatLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const PerfStatValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const PerfReturnValue = styled.span<{ $positive: boolean }>`
  font-size: 22px;
  font-weight: 700;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.success : theme.colors.danger};
`;

export const TradeStatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const TradeStatusItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const TradeStatusCount = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const TradeStatusLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;
