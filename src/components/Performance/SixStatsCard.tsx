import React from "react";
import styled from "styled-components";
import type { PerformancePageStatsDto, PerformancePagePeriod } from "@/api/types";

// ─────────────────────────────────────────────
// 6-stat card for the public /performance page.
//
// All six stats render with consistent treatment:
//   - Returns / drawdowns: signed percent, +/− sign, green/red tone.
//   - Profitable Weeks %: unsigned percent (0–100 by definition;
//     a "+" prefix on a count percentage reads as a return).
//   - Sharpe / Calmar / Profit Factor: plain numbers with sign-aware
//     tone — positive green, negative red, null grey.
//
// The first stat's label is period-aware: "6-month return" on the
// 6-month view, "Annual return" on Since-Inception (where the
// underlying value IS annualized CAGR), etc. — clears the
// "annual but actually 6-month return?" ambiguity.
//
// Every stat carries a `title` tooltip with a one-line plain-English
// explanation so users who don't know what Sharpe / Calmar / Profit
// Factor mean can hover for a definition.
// ─────────────────────────────────────────────

interface Props {
  stats: PerformancePageStatsDto;
  period: PerformancePagePeriod;
}

/** Signed percent: "+110.50%" / "−65.00%" / "—". */
function fmtPctSigned(value: number | null, decimals = 2): string {
  if (value == null || !Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toFixed(decimals)}%`;
}

/** Unsigned percent: "37%" / "—". Used for count-percentages (0–100). */
function fmtPctUnsigned(value: number | null, decimals = 0): string {
  if (value == null || !Number.isFinite(value)) return "—";
  return `${value.toFixed(decimals)}%`;
}

/** Plain number with optional sign: "1.45" / "−0.14" / "—". */
function fmtNum(value: number | null, decimals = 2): string {
  if (value == null || !Number.isFinite(value)) return "—";
  const sign = value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toFixed(decimals)}`;
}

type Tone = "positive" | "negative" | "neutral";

function toneOf(value: number | null): Tone {
  if (value == null || !Number.isFinite(value)) return "neutral";
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

// First-stat label per period. Inception is the only true "annual"
// (it shows rolling CAGR); the others show the simple cumulative
// return over the window, so the label adapts.
function returnLabel(period: PerformancePagePeriod): string {
  switch (period) {
    case "SixMonths":  return "6-month return";
    case "OneYear":    return "1-year return";
    case "TwoYears":   return "2-year return";
    case "ThreeYears": return "3-year return";
    case "Inception":  return "Annual return";
  }
  // Exhaustiveness fallback (TS narrows but kept defensively).
  return "Return";
}

// Plain-English one-liners shown on hover via the native `title`
// attribute — works on desktop without a tooltip library, and screen
// readers announce it too.
const TOOLTIPS = {
  return:
    "Cumulative return over the selected period. Inception view shows annualized CAGR.",
  maxDrawdown:
    "Worst peak-to-trough decline within the period. -10% means the strategy dropped 10% from a high before recovering.",
  sharpe:
    "Return per unit of volatility (mean weekly return × √52 / stdev). >1 is strong; <0 means the strategy lost money on average.",
  profitableWeeks:
    "Share of weeks in the period that ended with a positive return.",
  calmar:
    "Period return ÷ max drawdown magnitude. Higher = better return-for-pain trade-off. <0 means a losing period.",
  profitFactor:
    "Total realized profit ÷ total realized loss across closed trades in the period. >1 means winners outpaced losers.",
} as const;

const SixStatsCard: React.FC<Props> = ({ stats, period }) => {
  return (
    <Card>
      <Cell title={TOOLTIPS.return}>
        <Label>{returnLabel(period)}</Label>
        <Value $tone={toneOf(stats.annualReturnPct)}>
          {fmtPctSigned(stats.annualReturnPct)}
        </Value>
      </Cell>
      <Cell title={TOOLTIPS.maxDrawdown}>
        <Label>Max Drawdown</Label>
        <Value $tone={toneOf(stats.maxDrawdownPct)}>
          {fmtPctSigned(stats.maxDrawdownPct)}
        </Value>
      </Cell>
      <Cell title={TOOLTIPS.sharpe}>
        <Label>Sharpe Ratio</Label>
        <Value $tone={toneOf(stats.sharpeRatio)}>
          {fmtNum(stats.sharpeRatio)}
        </Value>
      </Cell>

      <Cell title={TOOLTIPS.profitableWeeks}>
        <Label>Strategy profitable weeks</Label>
        {/* Count-percentage — no +/− sign, no tone (always
            non-negative; coloring it green could read as "good
            return" which it isn't). */}
        <Value $tone="neutral">
          {fmtPctUnsigned(stats.profitableWeeksPct)}
        </Value>
      </Cell>
      <Cell title={TOOLTIPS.calmar}>
        <Label>Calmar Ratio</Label>
        <Value $tone={toneOf(stats.calmarRatio)}>
          {fmtNum(stats.calmarRatio)}
        </Value>
      </Cell>
      <Cell title={TOOLTIPS.profitFactor}>
        <Label>Profit Factor</Label>
        {/* Profit Factor below 1 = bad; tone reflects "< 1" not
            "< 0". Subtracting 1 lets us reuse toneOf without a new
            branch. */}
        <Value $tone={toneOf(stats.profitFactor == null ? null : stats.profitFactor - 1)}>
          {fmtNum(stats.profitFactor)}
        </Value>
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
  /* cursor:help on hover signals the native title-tooltip will
     appear — small but clear UX affordance. */
  cursor: help;
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
