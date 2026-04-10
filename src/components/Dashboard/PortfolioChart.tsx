import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { PortfolioSnapshotDto } from "@/api/types";
import { ChartCard, CardTitle, EmptyState } from "./styles";

interface Props {
  history: PortfolioSnapshotDto[];
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatValue = (val: number) =>
  `$${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const PortfolioChart: React.FC<Props> = ({ history }) => {
  return (
    <ChartCard>
      <CardTitle>Portfolio Value</CardTitle>
      {history.length === 0 ? (
        <EmptyState>No history data yet. Portfolio chart will appear after your first trades.</EmptyState>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={history} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D897" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00D897" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E28" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fill: "#5A5A6A", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatValue}
              tick={{ fill: "#5A5A6A", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip
              contentStyle={{
                background: "#14141C",
                border: "1px solid #1E1E28",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelFormatter={(label) => formatDate(String(label))}
              formatter={(value) => [formatValue(Number(value)), "Value"]}
            />
            <Area
              type="monotone"
              dataKey="valueUsd"
              stroke="#00D897"
              strokeWidth={2}
              fill="url(#portfolioGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "#00D897" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default PortfolioChart;
