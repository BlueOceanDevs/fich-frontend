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

// Format a decimal ratio cell. Compact width-aware formatting so all
// 14 columns (Year + 12 months + YTD) fit in the parent card without
// horizontal scroll on desktop:
//   - null → "—" (em-dash, future month)
//   - |val| ≥ 100% → no decimals: "+1214%" / "-105%"
//   - |val| < 100%  → 2 decimals: "+26.40%" / "-36.06%"
//   - Sign omitted for positives in compact mode is tempting, but we
//     keep it because the green/red color is the primary signal and
//     the explicit "+" reads cleaner alongside negatives.
function formatCell(value: number | null): string {
  if (value == null) return "—";
  const pct = value * 100;
  const sign = pct > 0 ? "+" : "";
  const abs = Math.abs(pct);
  const decimals = abs >= 100 ? 0 : 2;
  return `${sign}${pct.toFixed(decimals)}%`;
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
      <TableTitle>Monthly returns</TableTitle>
      <TableScroll>
        <ReturnsTable>
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
