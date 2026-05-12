import React from "react";
import styled, { useTheme } from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PieSliceDto } from "@/api/types";

// ─────────────────────────────────────────────
// Donut chart for the "Weekly Positions" section.
// Uses recharts' PieChart + Pie + Cell — these
// are the FIRST recharts pie components used in
// the codebase (no existing pattern to mirror).
//
// 8 distinct colours rotate across slices. The
// cash slice always gets the neutral grey so it
// reads as "uninvested" at a glance.
// ─────────────────────────────────────────────

interface Props {
  slices: PieSliceDto[];
}

/**
 * Slice palette, picked to read clearly on dark backgrounds. Rotated
 * by index so a portfolio with 9 holdings cycles back to slot 0;
 * acceptable since the cash slice is always at the top of the list
 * and rendered with `cashColor` regardless.
 */
const PALETTE = [
  "#00D897",   // primary green
  "#627EEA",   // accent blue
  "#F7931A",   // warning orange
  "#9945FF",   // purple
  "#E64980",   // pink
  "#FFD43B",   // yellow
  "#22B8CF",   // cyan
  "#FF6B6B",   // soft red
];

const PortfolioPieChart: React.FC<Props> = ({ slices }) => {
  const theme = useTheme() as any;

  if (!slices || slices.length === 0) {
    return (
      <EmptyMsg>No position data for the selected week.</EmptyMsg>
    );
  }

  return (
    <Layout>
      <ChartArea>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={slices}
              dataKey="weightPct"
              nameKey="label"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              stroke={theme.colors.card}
              strokeWidth={2}
            >
              {slices.map((s, i) => (
                <Cell
                  key={s.label}
                  fill={s.isCash ? theme.colors.textMuted : PALETTE[i % PALETTE.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: theme.colors.card,
                border: `1px solid ${theme.colors.cardBorder}`,
                borderRadius: theme.borderRadius.md,
                color: theme.colors.text,
                fontSize: 13,
              }}
              // Show the slice label (e.g. "SUNUSDT") as the metric
              // name with the percent as the value. Recharts renders
              // this as "SUNUSDT : 31.47%" — the symbol is the
              // primary information so it leads the tooltip.
              formatter={(value: any, _name: any, item: any) => [
                `${Number(value).toFixed(2)}%`,
                item?.payload?.label ?? "",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartArea>

      <Legend>
        {slices.map((s, i) => (
          <LegendRow key={s.label}>
            <LegendDot
              $color={s.isCash ? theme.colors.textMuted : PALETTE[i % PALETTE.length]}
            />
            <LegendLabel>{s.label}</LegendLabel>
            <LegendValue>{s.weightPct.toFixed(1)}%</LegendValue>
          </LegendRow>
        ))}
      </Legend>
    </Layout>
  );
};

export default PortfolioPieChart;

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const Layout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ChartArea = styled.div`
  width: 100%;
  min-height: 260px;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 260px;
  overflow-y: auto;
`;

const LegendRow = styled.div`
  display: grid;
  grid-template-columns: 12px 1fr auto;
  gap: 10px;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
`;

const LegendDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const LegendLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LegendValue = styled.span`
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const EmptyMsg = styled.div`
  text-align: center;
  padding: 40px 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;
