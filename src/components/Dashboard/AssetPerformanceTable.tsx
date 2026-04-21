import React from "react";
import type { AssetPerformanceDto } from "@/api/types";
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
  AssetCell,
  AssetIcon,
  AssetName,
  AssetSymbol,
  EmptyState,
} from "./styles";

interface Props {
  /** Per-asset aggregates from the Performance endpoint. Pre-aggregated server-side. */
  perAsset: AssetPerformanceDto[];
}

const fmt = (val: number, digits = 2) =>
  val.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

/**
 * Per-asset realized-P&L table, sorted best→worst by realized P&L.
 *
 * Backend sends one row per base asset over the chosen period window.
 * Rows with zero closed trades never appear — the backend skips them, so
 * we don't filter again here. Commissions are cumulative period-wide
 * (open + close legs combined) to match how Binance reports them.
 *
 * An asset with losses still shows full-red P&L text. We intentionally
 * don't colour win-rate — a 100% win rate on two trades reads misleading
 * next to a 55% win rate on 200 trades, so we leave the number neutral
 * and let the trade-count column provide context.
 */
const AssetPerformanceTable: React.FC<Props> = ({ perAsset }) => {
  const sorted = [...perAsset].sort(
    (a, b) => b.realizedPnlUsd - a.realizedPnlUsd
  );

  return (
    <TableCard style={{ animationDelay: "0.2s" }}>
      <CardTitle>Asset Performance</CardTitle>
      {sorted.length === 0 ? (
        <EmptyState>No closed trades in this period.</EmptyState>
      ) : (
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>#</Th>
                <Th>Asset</Th>
                <ThRight>Closed Trades</ThRight>
                <ThRight>Wins</ThRight>
                <ThRight>Win Rate</ThRight>
                <ThRight>Realized P&L</ThRight>
                <ThRight>Commission</ThRight>
              </tr>
            </thead>
            <tbody>
              {sorted.map((a, i) => (
                <tr key={a.asset}>
                  <Td>{i + 1}</Td>
                  <Td>
                    <AssetCell>
                      <AssetIcon>{a.asset.slice(0, 3)}</AssetIcon>
                      <AssetName>
                        <AssetSymbol>{a.asset}</AssetSymbol>
                      </AssetName>
                    </AssetCell>
                  </Td>
                  <TdRight>{a.closedTradeCount.toLocaleString()}</TdRight>
                  <TdRight>{a.winningTradeCount.toLocaleString()}</TdRight>
                  <TdRight>
                    {a.closedTradeCount > 0
                      ? `${fmt(a.winRatePercent, 1)}%`
                      : "—"}
                  </TdRight>
                  <TdRight>
                    <PnlText $positive={a.realizedPnlUsd >= 0}>
                      {a.realizedPnlUsd >= 0 ? "+" : "-"}$
                      {fmt(Math.abs(a.realizedPnlUsd))}
                    </PnlText>
                  </TdRight>
                  <TdRight>${fmt(a.commissionUsd)}</TdRight>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScroll>
      )}
    </TableCard>
  );
};

export default AssetPerformanceTable;
