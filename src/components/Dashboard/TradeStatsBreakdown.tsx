import React from "react";
import type { PerformanceDto } from "@/api/types";
import { Card, CardTitle, StatusBadge } from "./styles";
import {
  TradeStatusGrid,
  TradeStatusItem,
  TradeStatusCount,
  ExecQualityPill,
} from "./performanceStyles";

interface Props {
  perf: PerformanceDto;
}

/**
 * Trade-count breakdown + execution-quality pill.
 *
 * The four counts (closed, wins, losses, failed) are the ones that carry
 * decision-making value. "Cancelled" used to live here as its own cell,
 * but in practice it's noise: most cancels are auto-replace operations
 * our own system does. We kept it in the DTO for future debug use but
 * don't surface it here unless it spikes.
 *
 * Execution quality thresholds are documented in the plan:
 *   <1% failure rate → good (green), <5% → warn (yellow), ≥5% → bad (red).
 * Denominator is `closed + failed` not `all trades` — cancelled trades
 * don't represent execution failures, so excluding them avoids inflating
 * the rate when a strategy legitimately cancels a lot.
 */
const TradeStatsBreakdown: React.FC<Props> = ({ perf }) => {
  const attemptedTotal = perf.closedTradeCount + perf.failedTradeCount;
  const failureRate =
    attemptedTotal > 0 ? (perf.failedTradeCount / attemptedTotal) * 100 : 0;

  const health: "good" | "warn" | "bad" =
    failureRate < 1 ? "good" : failureRate < 5 ? "warn" : "bad";

  const healthLabel =
    attemptedTotal === 0
      ? "No trades yet"
      : `${failureRate.toFixed(2)}% failure rate`;

  return (
    <Card style={{ marginTop: 20, animationDelay: "0.25s" }}>
      <CardTitle>
        Trade Breakdown
        <span
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: "#5A5A6A",
            marginLeft: 8,
          }}
        >
          {perf.closedTradeCount.toLocaleString()} closed
        </span>
        <ExecQualityPill $health={health} style={{ marginLeft: "auto" }}>
          {healthLabel}
        </ExecQualityPill>
      </CardTitle>

      <TradeStatusGrid>
        <TradeStatusItem>
          <TradeStatusCount>{perf.closedTradeCount}</TradeStatusCount>
          <StatusBadge $status="Filled">Closed</StatusBadge>
        </TradeStatusItem>
        <TradeStatusItem>
          <TradeStatusCount>{perf.winningTradeCount}</TradeStatusCount>
          <StatusBadge $status="Filled">Wins</StatusBadge>
        </TradeStatusItem>
        <TradeStatusItem>
          <TradeStatusCount>{perf.losingTradeCount}</TradeStatusCount>
          <StatusBadge $status="Failed">Losses</StatusBadge>
        </TradeStatusItem>
        <TradeStatusItem>
          <TradeStatusCount>{perf.failedTradeCount}</TradeStatusCount>
          <StatusBadge $status="Failed">Failed</StatusBadge>
        </TradeStatusItem>
      </TradeStatusGrid>
    </Card>
  );
};

export default TradeStatsBreakdown;
