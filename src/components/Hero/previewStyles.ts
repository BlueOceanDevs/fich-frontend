import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PreviewWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 48px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeIn} 0.9s ease-out 0.3s both;
  text-align: left;
`;

export const PreviewCard = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

export const PreviewLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PreviewValue = styled.div`
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 4px 0 2px;
`;

export const PreviewPnl = styled.span<{ $positive: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.success : theme.colors.danger};
`;

export const PreviewStatsRow = styled.div`
  display: flex;
  gap: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 16px;
  }
`;

export const PreviewStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const PreviewStatLabel = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const PreviewStatValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

// ── Charts ──

export const PreviewChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const PreviewChartCard = styled(PreviewCard)`
  min-height: 0;
`;

export const PreviewChartTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

// ── Allocation legend ──

export const PreviewLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
  justify-content: center;
`;

export const PreviewLegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const PreviewLegendDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

// ── Holdings table ──

export const PreviewHoldingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

export const PreviewTh = styled.th`
  text-align: left;
  padding: 8px 10px;
  font-weight: 500;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const PreviewTd = styled.td`
  padding: 10px;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  white-space: nowrap;
`;

export const PreviewTdRight = styled(PreviewTd)`
  text-align: right;
`;

export const PreviewPnlText = styled.span<{ $positive: boolean }>`
  font-weight: 600;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.success : theme.colors.danger};
`;
