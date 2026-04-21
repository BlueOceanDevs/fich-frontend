import React from "react";
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
              </tr>
            </thead>
            <tbody>
              {sorted.map((s) => (
                <tr key={s.strategyId ?? "manual"}>
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
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScroll>
      )}
    </TableCard>
  );
};

export default StrategyPerformanceTable;
