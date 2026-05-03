import React from "react";
import { StatsRow, StatCell, StatLabel, StatValue } from "./styles";

interface Props {
  /** Decimal ratio: 1.14 = +114%. */
  annualReturnPct: number;
  /** Negative decimal ratio: -0.68 = -68%. */
  maxDrawdownPct: number;
  /** Plain decimal: 1.45. No % suffix. */
  sharpeRatio: number;
}

// Format a decimal ratio as a signed percent string. 1.14 → "+114%".
// -0.68 → "-68%". 0 → "0%". Round to whole percent for display
// density on the hero — full precision is in the table below.
function fmtPct(ratio: number): string {
  const pct = ratio * 100;
  const rounded = Math.round(pct);
  const sign = rounded > 0 ? "+" : "";
  return `${sign}${rounded}%`;
}

// Sharpe shown to two decimals. No sign — Sharpe is unitless.
function fmtSharpe(value: number): string {
  return value.toFixed(2);
}

const StatsCard: React.FC<Props> = ({
  annualReturnPct,
  maxDrawdownPct,
  sharpeRatio,
}) => {
  return (
    <StatsRow>
      <StatCell>
        <StatLabel>Annual return</StatLabel>
        <StatValue $tone={annualReturnPct >= 0 ? "positive" : "negative"}>
          {fmtPct(annualReturnPct)}
        </StatValue>
      </StatCell>
      <StatCell>
        <StatLabel>Max Drawdown</StatLabel>
        <StatValue $tone="negative">{fmtPct(maxDrawdownPct)}</StatValue>
      </StatCell>
      <StatCell>
        <StatLabel>Sharpe Ratio</StatLabel>
        <StatValue $tone="neutral">{fmtSharpe(sharpeRatio)}</StatValue>
      </StatCell>
    </StatsRow>
  );
};

export default StatsCard;
