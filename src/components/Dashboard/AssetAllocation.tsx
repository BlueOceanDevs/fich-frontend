import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import type { HoldingDto } from "@/api/types";
import { ChartCard, CardTitle, EmptyState } from "./styles";

interface Props {
  holdings: HoldingDto[];
  usdtBalance: number;
  totalValue: number;
}

const COLORS = ["#00D897", "#627EEA", "#F7931A", "#9945FF", "#00AAE4", "#E8920A", "#FF4D4D", "#8B5CF6"];

const AssetAllocation: React.FC<Props> = ({ holdings, usdtBalance, totalValue }) => {
  if (holdings.length === 0 && usdtBalance <= 0) {
    return (
      <ChartCard>
        <CardTitle>Asset Allocation</CardTitle>
        <EmptyState>No assets to display.</EmptyState>
      </ChartCard>
    );
  }

  const data = [
    ...holdings.map((h) => ({
      name: h.asset,
      value: h.valueUsd,
    })),
    ...(usdtBalance > 1
      ? [{ name: "USDT", value: usdtBalance }]
      : []),
  ];

  return (
    <ChartCard>
      <CardTitle>Asset Allocation</CardTitle>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#14141C",
              border: "1px solid #1E1E28",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value) => {
              const v = Number(value);
              return [
                `$${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${totalValue > 0 ? ((v / totalValue) * 100).toFixed(1) : 0}%)`,
                "",
              ];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        {data.map((d, i) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i % COLORS.length] }} />
            <span style={{ color: "#8A8A9A" }}>{d.name}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

export default AssetAllocation;
