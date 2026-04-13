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
  EmptyState,
} from "./styles";

interface Props {
  holdings: HoldingDto[];
}

const fmt = (val: number, digits = 2) =>
  val.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

const AssetPerformanceTable: React.FC<Props> = ({ holdings }) => {
  const sorted = [...holdings].sort((a, b) => b.pnlPercent - a.pnlPercent);

  return (
    <TableCard style={{ animationDelay: "0.2s" }}>
      <CardTitle>Asset Performance</CardTitle>
      {sorted.length === 0 ? (
        <EmptyState>No holdings to display.</EmptyState>
      ) : (
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>#</Th>
                <Th>Asset</Th>
                <ThRight>Avg Buy</ThRight>
                <ThRight>Current</ThRight>
                <ThRight>Value</ThRight>
                <ThRight>P&L ($)</ThRight>
                <ThRight>P&L (%)</ThRight>
                <ThRight>Allocation</ThRight>
              </tr>
            </thead>
            <tbody>
              {sorted.map((h, i) => (
                <tr key={h.symbol}>
                  <Td>{i + 1}</Td>
                  <Td>
                    <AssetCell>
                      <AssetIcon>{h.asset.slice(0, 3)}</AssetIcon>
                      <AssetName>
                        <AssetSymbol>{h.asset}</AssetSymbol>
                        <AssetPair>{h.symbol}</AssetPair>
                      </AssetName>
                    </AssetCell>
                  </Td>
                  <TdRight>${fmt(h.avgBuyPrice)}</TdRight>
                  <TdRight>${fmt(h.currentPrice)}</TdRight>
                  <TdRight>${fmt(h.valueUsd)}</TdRight>
                  <TdRight>
                    <PnlText $positive={h.pnlUsd >= 0}>
                      {h.pnlUsd >= 0 ? "+" : ""}${fmt(h.pnlUsd)}
                    </PnlText>
                  </TdRight>
                  <TdRight>
                    <PnlText $positive={h.pnlPercent >= 0}>
                      {h.pnlPercent >= 0 ? "+" : ""}{fmt(h.pnlPercent)}%
                    </PnlText>
                  </TdRight>
                  <TdRight>{fmt(h.allocationPercent, 1)}%</TdRight>
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
