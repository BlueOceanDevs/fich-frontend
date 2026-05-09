import React from "react";
import styled, { useTheme } from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { CashPctPointDto } from "@/api/types";

// ─────────────────────────────────────────────
// "Cash in %" line chart — single orange series
// over the full backtest. Theme `warning` colour
// to distinguish it from the green/blue/purple
// of the equity-curve chart.
// ─────────────────────────────────────────────

interface Props {
  data: CashPctPointDto[];
}

function fmtMonthYear(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", year: "2-digit" });
}

const CashPctChart: React.FC<Props> = ({ data }) => {
  const theme = useTheme() as any;

  if (!data || data.length === 0) {
    return <EmptyMsg>No cash-percentage data available.</EmptyMsg>;
  }

  return (
    <ChartArea>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 12, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.colors.cardBorder}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={fmtMonthYear}
            tick={{ fill: theme.colors.textMuted, fontSize: 11 }}
            stroke={theme.colors.cardBorder}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: theme.colors.textMuted, fontSize: 11 }}
            stroke={theme.colors.cardBorder}
            width={42}
          />
          <Tooltip
            contentStyle={{
              background: theme.colors.card,
              border: `1px solid ${theme.colors.cardBorder}`,
              borderRadius: theme.borderRadius.md,
              color: theme.colors.text,
              fontSize: 13,
            }}
            labelFormatter={(label: any) => fmtMonthYear(String(label))}
            formatter={(value: any) => [`${Number(value).toFixed(2)}%`, "Cash"]}
          />
          <Line
            type="monotone"
            dataKey="cashPct"
            stroke={theme.colors.warning}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartArea>
  );
};

export default CashPctChart;

const ChartArea = styled.div`
  width: 100%;
  min-height: 240px;
`;

const EmptyMsg = styled.div`
  text-align: center;
  padding: 40px 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;
