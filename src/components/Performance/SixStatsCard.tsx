import React from "react";
import styled from "styled-components";
import type { PerformancePageStatsDto } from "@/api/types";

// ─────────────────────────────────────────────
// 6-stat card for the public /performance page.
// The homepage uses a 3-stat variant (existing
// `StatsCard`); this richer card shows two
// additional rows of stats specific to the
// performance page mockup.
// ─────────────────────────────────────────────

interface Props {
  stats: PerformancePageStatsDto;
}

/** Format a percent value for display ("+110.00%" / "-65.00%" / "—"). */
function fmtPct(value: number | null, decimals = 2): string {
  if (value == null || !Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

/** Format a plain number ("1.45" / "—"). Always 2 decimals. */
function fmtNum(value: number | null, decimals = 2): string {
  if (value == null || !Number.isFinite(value)) return "—";
  return value.toFixed(decimals);
}

type Tone = "positive" | "negative" | "neutral";

function tonePct(value: number | null): Tone {
  if (value == null || !Number.isFinite(value)) return "neutral";
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

const SixStatsCard: React.FC<Props> = ({ stats }) => {
  return (
    <Card>
      <Cell>
        <Label>Annual return</Label>
        <Value $tone={tonePct(stats.annualReturnPct)}>
          {fmtPct(stats.annualReturnPct)}
        </Value>
      </Cell>
      <Cell>
        <Label>Max Drawdown</Label>
        <Value $tone={tonePct(stats.maxDrawdownPct)}>
          {fmtPct(stats.maxDrawdownPct)}
        </Value>
      </Cell>
      <Cell>
        <Label>Sharpe Ratio</Label>
        <Value $tone="neutral">{fmtNum(stats.sharpeRatio)}</Value>
      </Cell>

      <Cell>
        <Label>Strategy profitable weeks</Label>
        <Value $tone={tonePct(stats.profitableWeeksPct)}>
          {fmtPct(stats.profitableWeeksPct, 0)}
        </Value>
      </Cell>
      <Cell>
        <Label>Calmar Ratio</Label>
        <Value $tone="neutral">{fmtNum(stats.calmarRatio)}</Value>
      </Cell>
      <Cell>
        <Label>Profit Factor</Label>
        <Value $tone="neutral">{fmtNum(stats.profitFactor)}</Value>
      </Cell>
    </Card>
  );
};

export default SixStatsCard;

// ─────────────────────────────────────────────
// Styled components
// ─────────────────────────────────────────────

const Card = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 18px 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
`;

const Label = styled.span`
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  letter-spacing: 0.2px;
`;

const Value = styled.span<{ $tone: Tone }>`
  font-size: 17px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${({ theme, $tone }) =>
    $tone === "positive"
      ? theme.colors.success
      : $tone === "negative"
      ? theme.colors.danger
      : theme.colors.text};
`;
