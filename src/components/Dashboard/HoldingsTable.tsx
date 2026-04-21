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
  DirectionBadge,
  LeverageTag,
} from "./styles";

interface Props {
  holdings: HoldingDto[];
  /** Free cash balance from the futures wallet — rendered as its own row at the top of the table. */
  cashBalance?: number;
  /** "USDT" or "BNFCR" — label for the cash row. Defaults to "USDT" if absent. */
  cashAssetName?: string;
  /** Portfolio total used to compute the cash row's allocation % (cash + |position notional|). */
  totalAllocationBase?: number;
}

const COLORS = ["#00D897", "#627EEA", "#F7931A", "#9945FF", "#00AAE4", "#E8920A", "#FF4D4D", "#8B5CF6"];
const CASH_COLOR = "#4A90E2";

const fmt = (n: number, decimals = 2) =>
  n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const HoldingsTable: React.FC<Props> = ({ holdings, cashBalance, cashAssetName, totalAllocationBase }) => {
  // Show a cash row when there's any meaningful balance — otherwise an empty row
  // just adds noise. The 1 USDT threshold matches the "skip dust" filter the
  // backend applies to holdings, keeping the two lists visually consistent.
  const showCashRow = (cashBalance ?? 0) > 1;
  const cashLabel = cashAssetName || "USDT";
  const cashAlloc =
    showCashRow && totalAllocationBase && totalAllocationBase > 0
      ? ((cashBalance ?? 0) / totalAllocationBase) * 100
      : 0;

  return (
    <TableCard>
      <CardTitle>Holdings</CardTitle>
      {holdings.length === 0 && !showCashRow ? (
        <EmptyState>No active holdings. Your assets will appear here after trades are executed.</EmptyState>
      ) : (
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Asset</Th>
                <Th>Position</Th>
                <ThRight>Quantity</ThRight>
                <ThRight>Avg Entry</ThRight>
                <ThRight>Price</ThRight>
                <ThRight>Value</ThRight>
                <ThRight>P&L</ThRight>
                <Th style={{ width: 120 }}>Allocation</Th>
              </tr>
            </thead>
            <tbody>
              {/* Cash row — rendered at the top so users can see their idle
                  balance alongside their positions in a single view. The label
                  is dynamic (USDT or BNFCR) because EU/EEA accounts under MiCA
                  hold BNFCR instead of USDT; both are 1:1 USD. Dashes occupy
                  the per-trade columns because none apply to a pure cash balance. */}
              {showCashRow && (
                <tr key="__cash__">
                  <Td>
                    <AssetCell>
                      <AssetIcon style={{ background: CASH_COLOR }}>{cashLabel.slice(0, 3)}</AssetIcon>
                      <AssetName>
                        <AssetSymbol>{cashLabel}</AssetSymbol>
                        <AssetPair>Available Cash</AssetPair>
                      </AssetName>
                    </AssetCell>
                  </Td>
                  <Td>—</Td>
                  <TdRight>{fmt(cashBalance ?? 0)}</TdRight>
                  <TdRight>—</TdRight>
                  <TdRight>$1.00</TdRight>
                  <TdRight>${fmt(cashBalance ?? 0)}</TdRight>
                  <TdRight>—</TdRight>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <AllocationBar>
                        <AllocationFill $pct={cashAlloc} $color={CASH_COLOR} />
                      </AllocationBar>
                      <span style={{ fontSize: 11, color: "#8A8A9A", whiteSpace: "nowrap" }}>
                        {fmt(cashAlloc, 1)}%
                      </span>
                    </div>
                  </Td>
                </tr>
              )}
              {holdings.map((h, i) => {
                const positive = h.pnlUsd >= 0;
                const isShort = h.side === "Short";
                // Use the authoritative avgBuyPrice from Binance directly. The
                // previous fallback to currentPrice made P&L look zero whenever
                // the backend hadn't populated it — which is now fixed, but the
                // fallback itself is still wrong for any real position, so drop it.
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
                    <Td>
                      <DirectionBadge $side={h.side}>{isShort ? "Short" : "Long"}</DirectionBadge>
                      {h.leverage > 1 && <LeverageTag>{h.leverage}×</LeverageTag>}
                    </Td>
                    <TdRight>{fmt(h.quantity, 6)}</TdRight>
                    <TdRight>{h.avgBuyPrice > 0 ? `$${fmt(h.avgBuyPrice)}` : "—"}</TdRight>
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
