import React from "react";
import type { PerformanceDto } from "@/api/types";
import {
  PerfStatsGrid,
  PerfStatCard,
  PerfStatLabel,
  PerfStatValue,
  PerfReturnValue,
} from "./performanceStyles";

interface Props {
  perf: PerformanceDto;
}

// ─────────────────────────────────────────────
// Formatting helpers
// ─────────────────────────────────────────────
// Keep formatters colocated: every number on this page is money or percent,
// and we always want the same rounding + sign convention. Defining them
// inline avoids a shared-util ping-pong for two one-liners.

const fmtMoney = (val: number) =>
  `$${Math.abs(val).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const fmtSignedMoney = (val: number) =>
  `${val >= 0 ? "+" : "-"}${fmtMoney(val)}`;

const fmtPct = (val: number) => `${val >= 0 ? "+" : ""}${val.toFixed(2)}%`;

/**
 * Top-of-page stat grid for the Performance view. All values come from a
 * single `PerformanceDto` — no client-side aggregation.
 *
 * Period context (All / 1M / 7D / 1D) is owned by the page above; this
 * component is period-agnostic so the same grid can render any window.
 *
 * Notes on two fields that surprise people:
 *
 * - **Return %** is `netPnl / netDeposits`, which matches how Binance
 *   shows "ROI" on the wallet tab. It's _not_ a time-weighted return.
 *   If `netDeposits` is zero (paper account, fully withdrawn), the
 *   backend sends 0 and we render "—".
 *
 * - **Profit factor** is `sum(wins) / |sum(losses)|`. When losses are
 *   zero the backend returns 0 rather than Infinity to stay JSON-safe;
 *   we show "∞" in that case to communicate "all wins, no losses".
 */
const PerformanceStats: React.FC<Props> = ({ perf }) => {
  // Match PerformanceService.MinNetDepositsForReturnPct (backend returns 0
  // for Return % when NetDeposits is below this threshold). Keeping the
  // frontend threshold in sync means the "—" placeholder renders for the
  // exact same accounts that the backend refuses to compute a percent for.
  const hasDeposits = perf.netDepositsUsd >= 1;
  const profitFactorDisplay =
    perf.profitFactor > 0
      ? perf.profitFactor.toFixed(2)
      : perf.winningTradeCount > 0
      ? "∞"
      : "—";

  return (
    <PerfStatsGrid>
      <PerfStatCard>
        <PerfStatLabel>Net P&L</PerfStatLabel>
        <PerfReturnValue $positive={perf.netPnlUsd >= 0}>
          {fmtSignedMoney(perf.netPnlUsd)}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Return %</PerfStatLabel>
        <PerfReturnValue $positive={perf.returnPercent >= 0}>
          {hasDeposits ? fmtPct(perf.returnPercent) : "—"}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Realized P&L</PerfStatLabel>
        <PerfReturnValue $positive={perf.realizedPnlUsd >= 0}>
          {fmtSignedMoney(perf.realizedPnlUsd)}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Unrealized P&L</PerfStatLabel>
        <PerfReturnValue $positive={perf.unrealizedPnlUsd >= 0}>
          {fmtSignedMoney(perf.unrealizedPnlUsd)}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Win Rate</PerfStatLabel>
        <PerfStatValue>
          {perf.closedTradeCount > 0
            ? `${perf.winRatePercent.toFixed(1)}%`
            : "—"}
        </PerfStatValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Wins / Losses</PerfStatLabel>
        <PerfStatValue>
          <span style={{ color: "#00d897" }}>{perf.winningTradeCount}</span>
          {" / "}
          <span style={{ color: "#ef4444" }}>{perf.losingTradeCount}</span>
        </PerfStatValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Profit Factor</PerfStatLabel>
        <PerfStatValue>{profitFactorDisplay}</PerfStatValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Max Drawdown</PerfStatLabel>
        <PerfReturnValue $positive={false}>
          {perf.maxDrawdownUsd > 0
            ? `-${fmtMoney(perf.maxDrawdownUsd)} (${perf.maxDrawdownPercent.toFixed(
                2
              )}%)`
            : "—"}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Avg Win</PerfStatLabel>
        <PerfReturnValue $positive={true}>
          {perf.winningTradeCount > 0 ? fmtMoney(perf.avgWinUsd) : "—"}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Avg Loss</PerfStatLabel>
        <PerfReturnValue $positive={false}>
          {perf.losingTradeCount > 0 ? fmtMoney(perf.avgLossUsd) : "—"}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Largest Win</PerfStatLabel>
        <PerfReturnValue $positive={true}>
          {perf.winningTradeCount > 0 ? fmtMoney(perf.largestWinUsd) : "—"}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Largest Loss</PerfStatLabel>
        <PerfReturnValue $positive={false}>
          {perf.losingTradeCount > 0 ? fmtMoney(perf.largestLossUsd) : "—"}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Commission</PerfStatLabel>
        <PerfStatValue>{fmtMoney(perf.commissionUsd)}</PerfStatValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Funding Fees</PerfStatLabel>
        <PerfReturnValue $positive={perf.fundingFeeUsd >= 0}>
          {fmtSignedMoney(perf.fundingFeeUsd)}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Net Deposits</PerfStatLabel>
        <PerfStatValue>{fmtMoney(perf.netDepositsUsd)}</PerfStatValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Closed Trades</PerfStatLabel>
        <PerfStatValue>{perf.closedTradeCount.toLocaleString()}</PerfStatValue>
      </PerfStatCard>
    </PerfStatsGrid>
  );
};

export default PerformanceStats;
