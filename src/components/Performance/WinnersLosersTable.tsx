import React, { useMemo, useState } from "react";
import styled from "styled-components";
import type { ClosedTradeDto } from "@/api/types";

// ─────────────────────────────────────────────
// Top Winners + Top Losers tables. Same layout
// for both — `mode` only swaps the colour and
// the empty-state message. Columns match the
// mockup: COIN / BUY PRICE / SELL PRICE / BUY DATE /
// SELL DATE / P&L %.
//
// All 6 columns are click-to-sort. Default sort
// matches the section's framing — winners by
// P&L DESC, losers by P&L ASC — so the table
// arrives looking right; users only need to
// click headers to re-slice.
// ─────────────────────────────────────────────

interface Props {
  rows: ClosedTradeDto[];
  mode: "winners" | "losers";
}

type SortKey =
  | "symbol"
  | "buyPrice"
  | "sellPrice"
  | "buyDate"
  | "sellDate"
  | "profitPnlPercent";

type SortDir = "asc" | "desc";

function fmtDate(iso: string): string {
  return iso.slice(0, 10);
}

function fmtPrice(p: number): string {
  if (!Number.isFinite(p)) return "—";
  if (p >= 1000) return p.toFixed(2);
  if (p >= 1) return p.toFixed(4);
  return p.toFixed(6);
}

function fmtPnl(p: number): string {
  if (!Number.isFinite(p)) return "—";
  const sign = p > 0 ? "+" : "";
  return `${sign}${p.toFixed(2)}%`;
}

/** Generic comparator. Strings sort lexicographically; numbers numerically. */
function compare(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}

const WinnersLosersTable: React.FC<Props> = ({ rows, mode }) => {
  // Default sort matches the section's framing: winners arrive sorted
  // P&L DESC, losers ASC. Click any header to override.
  const [sortKey, setSortKey] = useState<SortKey>("profitPnlPercent");
  const [sortDir, setSortDir] = useState<SortDir>(
    mode === "winners" ? "desc" : "asc",
  );

  const sortedRows = useMemo(() => {
    if (!rows) return [];
    const copy = [...rows];
    copy.sort((a, b) => {
      const cmp = compare(a[sortKey], b[sortKey]);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  if (!rows || rows.length === 0) {
    return <EmptyMsg>No {mode === "winners" ? "winners" : "losers"} on record.</EmptyMsg>;
  }

  function onHeaderClick(key: SortKey) {
    if (key === sortKey) {
      // Same column → flip direction.
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      // New column → use a sensible default direction (numeric DESC,
      // text/date ASC matches what users expect from "show me biggest
      // first" / "show me earliest first").
      setSortKey(key);
      setSortDir(
        key === "buyPrice" || key === "sellPrice" || key === "profitPnlPercent"
          ? "desc"
          : "asc",
      );
    }
  }

  function arrow(key: SortKey) {
    if (key !== sortKey) return null;
    return <SortArrow>{sortDir === "asc" ? "▲" : "▼"}</SortArrow>;
  }

  return (
    <Scroll>
      <Table>
        <thead>
          <tr>
            <ThSortable onClick={() => onHeaderClick("symbol")}>
              coin{arrow("symbol")}
            </ThSortable>
            <ThSortableRight onClick={() => onHeaderClick("buyPrice")}>
              buy price{arrow("buyPrice")}
            </ThSortableRight>
            <ThSortableRight onClick={() => onHeaderClick("sellPrice")}>
              sell price{arrow("sellPrice")}
            </ThSortableRight>
            <ThSortable onClick={() => onHeaderClick("buyDate")}>
              buy date{arrow("buyDate")}
            </ThSortable>
            <ThSortable onClick={() => onHeaderClick("sellDate")}>
              sell date{arrow("sellDate")}
            </ThSortable>
            <ThSortableRight onClick={() => onHeaderClick("profitPnlPercent")}>
              P&amp;L{arrow("profitPnlPercent")}
            </ThSortableRight>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((r, i) => (
            <Tr key={`${r.symbol}-${r.buyDate}-${i}`}>
              <TdSymbol>{r.symbol}</TdSymbol>
              <TdRight>{fmtPrice(r.buyPrice)}</TdRight>
              <TdRight>{fmtPrice(r.sellPrice)}</TdRight>
              <Td>{fmtDate(r.buyDate)}</Td>
              <Td>{fmtDate(r.sellDate)}</Td>
              <TdPnl $mode={mode}>{fmtPnl(r.profitPnlPercent)}</TdPnl>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Scroll>
  );
};

export default WinnersLosersTable;

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const Scroll = styled.div`
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  white-space: nowrap;
`;

const ThSortable = styled(Th)`
  cursor: pointer;
  user-select: none;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ThSortableRight = styled(ThSortable)`
  text-align: right;
`;

const SortArrow = styled.span`
  display: inline-block;
  margin-left: 6px;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Tr = styled.tr`
  &:hover td {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

const Td = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  background: ${({ theme }) => theme.colors.card};
  font-variant-numeric: tabular-nums;
`;

const TdSymbol = styled(Td)`
  font-weight: 700;
  letter-spacing: 0.2px;
`;

const TdRight = styled(Td)`
  text-align: right;
`;

const TdPnl = styled(Td)<{ $mode: "winners" | "losers" }>`
  text-align: right;
  font-weight: 700;
  color: ${({ theme, $mode }) =>
    $mode === "winners" ? theme.colors.success : theme.colors.danger};
`;

const EmptyMsg = styled.div`
  text-align: center;
  padding: 40px 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;
