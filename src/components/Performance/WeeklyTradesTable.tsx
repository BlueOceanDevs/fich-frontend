import React from "react";
import styled from "styled-components";
import type { WeeklyTradeDto } from "@/api/types";

// ─────────────────────────────────────────────
// "Weekly BUYs and SELLs" table — driven by the
// same week selector as the donut chart above.
// Columns: Date / Type / Symbol / Price / % portfolio.
// BUY rows show green, SELL rows show red, in the
// Type cell only.
// ─────────────────────────────────────────────

interface Props {
  rows: WeeklyTradeDto[];
}

function fmtDate(iso: string): string {
  // Server sends "2026-03-06T00:00:00" — slice the ISO date prefix.
  return iso.slice(0, 10);
}

function fmtPrice(p: number): string {
  if (!Number.isFinite(p)) return "—";
  if (p >= 1000) return p.toFixed(2);
  if (p >= 1) return p.toFixed(4);
  return p.toFixed(6);
}

function fmtPct(p: number): string {
  if (!Number.isFinite(p)) return "—";
  return `${p.toFixed(2)}%`;
}

const WeeklyTradesTable: React.FC<Props> = ({ rows }) => {
  if (!rows || rows.length === 0) {
    return <EmptyMsg>No trades for this week.</EmptyMsg>;
  }

  return (
    <Scroll>
      <Table>
        <thead>
          <tr>
            <Th>date</Th>
            <Th>type</Th>
            <Th>symbol</Th>
            <ThRight>price</ThRight>
            <ThRight>% portfolio</ThRight>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <Tr key={`${r.symbol}-${r.type}-${i}`}>
              <Td>{fmtDate(r.tradeDate)}</Td>
              <TdType $type={r.type}>{r.type}</TdType>
              <Td>{r.symbol}</Td>
              <TdRight>{fmtPrice(r.price)}</TdRight>
              <TdRight>{fmtPct(r.costPctBalance)}</TdRight>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Scroll>
  );
};

export default WeeklyTradesTable;

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

const ThRight = styled(Th)`
  text-align: right;
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

const TdRight = styled(Td)`
  text-align: right;
`;

const TdType = styled(Td)<{ $type: string }>`
  font-weight: 700;
  letter-spacing: 0.3px;
  color: ${({ theme, $type }) =>
    $type === "BUY" ? theme.colors.success : theme.colors.danger};
`;

const EmptyMsg = styled.div`
  text-align: center;
  padding: 40px 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;
