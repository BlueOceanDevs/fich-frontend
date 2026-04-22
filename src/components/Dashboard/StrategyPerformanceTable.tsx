import React, { useState } from "react";
import type { StrategyPerformanceDto } from "@/api/types";
import {
  TableCard,
  CardTitle,
  TableScroll,
  Table,
  Th,
  ThRight,
  Td,
  TdRight,
  PnlText,
  EmptyState,
} from "./styles";
import { ChartButton } from "./performanceStyles";
import StrategyPerformanceChartModal from "./StrategyPerformanceChartModal";

interface Props {
  /** Per-strategy aggregates from the Performance endpoint. */
  perStrategy: StrategyPerformanceDto[];
}

const fmt = (val: number, digits = 2) =>
  val.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

// ── Strategy date formatter ──
// activeSince / activeUntil are ISO timestamps. We show a date-only
// representation because the time-of-day is noise — users care that a
// strategy was in play during, say, Q1, not that they switched at
// 14:37 UTC on a Tuesday.
const fmtDate = (iso: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Per-strategy attribution table. This exists because users can switch
 * strategies (Feature 2 in CLAUDE memory) and the P&L delta of each is
 * what actually matters when comparing them.
 *
 * "Manual" bucket has `strategyId === null` — trades placed by admins or
 * shadow orders for external trades don't belong to any strategy. We show
 * it as a regular row so users can see the volume and P&L impact.
 *
 * Row ordering is best→worst by realized P&L, same as the asset table,
 * so the eye lands on the winning strategy first.
 */
const StrategyPerformanceTable: React.FC<Props> = ({ perStrategy }) => {
  const sorted = [...perStrategy].sort(
    (a, b) => b.realizedPnlUsd - a.realizedPnlUsd
  );

  // Tracking the drill-down target as a key rather than the dto directly
  // makes the cleanup on unmount simple and keeps the render idempotent
  // on prop updates — if the parent re-fetches, the modal target is
  // resolved from the current list on each render via key lookup.
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const activeStrategy = activeKey
    ? sorted.find((s) => (s.strategyId?.toString() ?? "manual") === activeKey) ?? null
    : null;

  return (
    <TableCard style={{ animationDelay: "0.22s" }}>
      <CardTitle>Strategy Performance</CardTitle>
      {sorted.length === 0 ? (
        <EmptyState>No strategy activity in this period.</EmptyState>
      ) : (
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Strategy</Th>
                <ThRight>Closed Trades</ThRight>
                <ThRight>Wins</ThRight>
                <ThRight>Win Rate</ThRight>
                <ThRight>Realized P&L</ThRight>
                <ThRight>Commission</ThRight>
                <ThRight>Active</ThRight>
                <ThRight>Charts</ThRight>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s) => {
                const key = s.strategyId?.toString() ?? "manual";
                // "View charts" is meaningful only when there's at least
                // one closed trade to plot; otherwise disable the button
                // rather than opening an empty modal.
                const hasChartsData = s.closedTradeCount > 0;
                return (
                  <tr key={key}>
                    <Td>{s.strategyName}</Td>
                    <TdRight>{s.closedTradeCount.toLocaleString()}</TdRight>
                    <TdRight>{s.winningTradeCount.toLocaleString()}</TdRight>
                    <TdRight>
                      {s.closedTradeCount > 0
                        ? `${fmt(s.winRatePercent, 1)}%`
                        : "—"}
                    </TdRight>
                    <TdRight>
                      <PnlText $positive={s.realizedPnlUsd >= 0}>
                        {s.realizedPnlUsd >= 0 ? "+" : "-"}$
                        {fmt(Math.abs(s.realizedPnlUsd))}
                      </PnlText>
                    </TdRight>
                    <TdRight>${fmt(s.commissionUsd)}</TdRight>
                    <TdRight>
                      {fmtDate(s.activeSince)}
                      {s.activeUntil ? ` → ${fmtDate(s.activeUntil)}` : ""}
                    </TdRight>
                    <TdRight>
                      <ChartButton
                        type="button"
                        onClick={() => setActiveKey(key)}
                        disabled={!hasChartsData}
                        // Visually dim the button when there's nothing to
                        // plot; still interactive so keyboard users can
                        // focus past it without it being a mystery button.
                        style={!hasChartsData ? { opacity: 0.4, cursor: "default" } : undefined}
                        title={hasChartsData ? "View cumulative + monthly charts" : "No closed trades to chart"}
                      >
                        View
                      </ChartButton>
                    </TdRight>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableScroll>
      )}

      {activeStrategy && (
        <StrategyPerformanceChartModal
          strategy={activeStrategy}
          onClose={() => setActiveKey(null)}
        />
      )}
    </TableCard>
  );
};

export default StrategyPerformanceTable;
