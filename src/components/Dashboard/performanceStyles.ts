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

// ── Period selector tabs (Phase 6) ──
// Used at the top of the Performance page. Active tab picks up the primary
// colour; hover state is a subtle highlight. Kept styled-component rather
// than inline so the visual language stays consistent with the rest of the
// dashboard.
export const PeriodTabsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const PeriodTab = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.cardBorder)};
  background: ${({ $active, theme }) =>
    $active ? `${theme.colors.primary}20` : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ── Reconciliation footer (Phase 6) ──
// Small honesty marker at the bottom of the Performance page. Green tick when
// reconciled recently + clean; yellow when drift detected. Users reading fine
// print gets peace of mind that numbers were checked against Binance.
export const ReconFooter = styled.div<{ $drift: boolean }>`
  margin-top: 24px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 12px;
  color: ${({ $drift, theme }) =>
    $drift ? theme.colors.warning : theme.colors.textSecondary};
  background: ${({ $drift }) =>
    $drift ? "rgba(234, 179, 8, 0.08)" : "transparent"};
  border: 1px solid
    ${({ $drift }) => ($drift ? "rgba(234, 179, 8, 0.3)" : "transparent")};
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ReconFooterIcon = styled.span<{ $drift: boolean }>`
  color: ${({ $drift, theme }) =>
    $drift ? theme.colors.warning : theme.colors.success};
  font-size: 14px;
`;

// ── Execution-quality bar (Phase 6) ──
// A tiny status pill showing failed-trade rate. Three thresholds from the
// plan: <1% green, <5% yellow, higher red. Takes a compact footprint so it
// fits inline with the trade-stats breakdown.
export const ExecQualityPill = styled.span<{ $health: "good" | "warn" | "bad" }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2px;
  background: ${({ $health }) =>
    $health === "good" ? "rgba(0, 216, 151, 0.12)" :
    $health === "warn" ? "rgba(234, 179, 8, 0.12)" :
    "rgba(239, 68, 68, 0.12)"};
  color: ${({ $health, theme }) =>
    $health === "good" ? theme.colors.success :
    $health === "warn" ? theme.colors.warning :
    theme.colors.danger};
`;
