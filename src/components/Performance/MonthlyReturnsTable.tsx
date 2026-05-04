import React from "react";
import type { MonthlyReturnsRowDto } from "@/api/types";
import {
  TableCard,
  TableTitle,
  TableScroll,
  ReturnsTable,
  TableHead,
  TableBody,
  ReturnCell,
} from "./styles";

interface Props {
  /** One row per year, ascending. Each cell is a decimal ratio
   *  (0.2640 = +26.40%) or null for unfilled months. */
  rows: MonthlyReturnsRowDto[];
}

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

// Format a decimal ratio cell. Aggressively compact so all 14 columns
// (Year + 12 months + YTD) fit in the ~830px parent card without
// horizontal scroll:
//   - null → "—" (em-dash, future month)
//   - "+" prefix dropped — color (green/red) is the primary signal
//     and saves 1 character per positive cell
//   - "%" suffix dropped — the table title "Monthly returns" already
//     implies these are percentages; saves 1 character per cell
//   - |val| ≥ 100% → no decimals (e.g. "1214" / "-105")
//   - 10 ≤ |val| < 100 → 1 decimal (e.g. "26.4")
//   - |val| < 10 → 2 decimals (e.g. "0.46" / "-0.78")
// Negative sign always shown.
function formatCell(value: number | null): string {
  if (value == null) return "—";
  const pct = value * 100;
  const abs = Math.abs(pct);
  const decimals = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  return pct.toFixed(decimals);
}

// Pull a row's value for column index 0..11 (Jan..Dec).
function valueAtMonth(row: MonthlyReturnsRowDto, monthIndex: number): number | null {
  switch (monthIndex) {
    case 0: return row.jan;
    case 1: return row.feb;
    case 2: return row.mar;
    case 3: return row.apr;
    case 4: return row.may;
    case 5: return row.jun;
    case 6: return row.jul;
    case 7: return row.aug;
    case 8: return row.sep;
    case 9: return row.oct;
    case 10: return row.nov;
    case 11: return row.dec;
    default: return null;
  }
}

const MonthlyReturnsTable: React.FC<Props> = ({ rows }) => {
  if (!rows || rows.length === 0) return null;

  return (
    <TableCard>
      <TableTitle>Monthly returns (%)</TableTitle>
      <TableScroll>
        <ReturnsTable>
          {/*
            Column-width hints used by `table-layout: fixed` in
            styles.ts. Year and YTD get a hair more room than the
            month columns; everything's relative so it scales with
            the parent card width. Without these hints the table
            would split the available width equally — fine, but
            this gives YTD breathing room for "1214"-class values.
          */}
          <colgroup>
            <col className="year" />
            {MONTH_LABELS.map((m) => (
              <col key={m} className="month" />
            ))}
            <col className="ytd" />
          </colgroup>
          <TableHead>
            <tr>
              <th>Year</th>
              {MONTH_LABELS.map((m) => (
                <th key={m}>{m}</th>
              ))}
              <th>YTD</th>
            </tr>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                {MONTH_LABELS.map((m, i) => {
                  const v = valueAtMonth(row, i);
                  return (
                    <ReturnCell key={m} $value={v}>
                      {formatCell(v)}
                    </ReturnCell>
                  );
                })}
                {/* YTD also color-coded — bold via td:last-child rule. */}
                <ReturnCell $value={row.ytd}>{formatCell(row.ytd)}</ReturnCell>
              </tr>
            ))}
          </TableBody>
        </ReturnsTable>
      </TableScroll>
    </TableCard>
  );
};

export default MonthlyReturnsTable;
