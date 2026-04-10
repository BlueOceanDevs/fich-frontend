import React from "react";
import type { HoldingDto } from "@/api/types";
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
  AssetPair,
  AllocationBar,
  AllocationFill,
  EmptyState,
} from "./styles";

interface Props {
  holdings: HoldingDto[];
}

const COLORS = ["#00D897", "#627EEA", "#F7931A", "#9945FF", "#00AAE4", "#E8920A", "#FF4D4D", "#8B5CF6"];

const fmt = (n: number, decimals = 2) =>
  n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const HoldingsTable: React.FC<Props> = ({ holdings }) => {
  return (
    <TableCard>
      <CardTitle>Holdings</CardTitle>
      {holdings.length === 0 ? (
        <EmptyState>No active holdings. Your assets will appear here after trades are executed.</EmptyState>
      ) : (
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Asset</Th>
                <ThRight>Quantity</ThRight>
                <ThRight>Avg Buy</ThRight>
                <ThRight>Price</ThRight>
                <ThRight>Value</ThRight>
                <ThRight>P&L</ThRight>
                <Th style={{ width: 120 }}>Allocation</Th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h, i) => {
                const positive = h.pnlUsd >= 0;
                return (
                  <tr key={h.symbol}>
                    <Td>
                      <AssetCell>
                        <AssetIcon>{h.asset.slice(0, 3)}</AssetIcon>
                        <AssetName>
                          <AssetSymbol>{h.asset}</AssetSymbol>
                          <AssetPair>{h.symbol}</AssetPair>
                        </AssetName>
                      </AssetCell>
                    </Td>
                    <TdRight>{fmt(h.quantity, 6)}</TdRight>
                    <TdRight>${fmt(h.avgBuyPrice > 0 ? h.avgBuyPrice : h.currentPrice)}</TdRight>
                    <TdRight>${fmt(h.currentPrice)}</TdRight>
                    <TdRight>${fmt(h.valueUsd)}</TdRight>
                    <TdRight>
                      <PnlText $positive={positive}>
                        {positive ? "+" : ""}{fmt(h.pnlUsd)} ({positive ? "+" : ""}{fmt(h.pnlPercent)}%)
                      </PnlText>
                    </TdRight>
                    <Td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <AllocationBar>
                          <AllocationFill $pct={h.allocationPercent} $color={COLORS[i % COLORS.length]} />
                        </AllocationBar>
                        <span style={{ fontSize: 11, color: "#8A8A9A", whiteSpace: "nowrap" }}>
                          {fmt(h.allocationPercent, 1)}%
                        </span>
                      </div>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableScroll>
      )}
    </TableCard>
  );
};

export default HoldingsTable;
