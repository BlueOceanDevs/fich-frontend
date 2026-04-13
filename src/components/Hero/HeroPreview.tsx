import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  PreviewWrapper,
  PreviewCard,
  PreviewHeader,
  PreviewValue,
  PreviewPnl,
  PreviewLabel,
  PreviewStatsRow,
  PreviewStat,
  PreviewStatValue,
  PreviewStatLabel,
  PreviewChartsGrid,
  PreviewChartCard,
  PreviewChartTitle,
  PreviewLegend,
  PreviewLegendItem,
  PreviewLegendDot,
  PreviewHoldingsTable,
  PreviewTh,
  PreviewTd,
  PreviewTdRight,
  PreviewPnlText,
} from "./previewStyles";

// ── Static mock data ──

const CHART_DATA = [
  { date: "Jan 1", value: 10000 },
  { date: "Jan 8", value: 10250 },
  { date: "Jan 15", value: 10480 },
  { date: "Jan 22", value: 10120 },
  { date: "Feb 1", value: 10650 },
  { date: "Feb 8", value: 11200 },
  { date: "Feb 15", value: 10980 },
  { date: "Feb 22", value: 11450 },
  { date: "Mar 1", value: 11800 },
  { date: "Mar 8", value: 12100 },
  { date: "Mar 15", value: 11950 },
  { date: "Mar 22", value: 12480 },
];

const ALLOCATION_DATA = [
  { name: "BTC", value: 45, color: "#F7931A" },
  { name: "ETH", value: 25, color: "#627EEA" },
  { name: "SOL", value: 15, color: "#9945FF" },
  { name: "USDT", value: 15, color: "#26A17B" },
];

const HOLDINGS = [
  { symbol: "BTC", pair: "BTCUSDT", qty: "0.1420", price: "$67,245", value: "$9,548", pnl: "+12.4%", positive: true },
  { symbol: "ETH", pair: "ETHUSDT", qty: "2.8500", price: "$3,420", value: "$9,747", pnl: "+8.2%", positive: true },
  { symbol: "SOL", pair: "SOLUSDT", qty: "42.000", price: "$148.50", value: "$6,237", pnl: "-2.1%", positive: false },
];

const HeroPreview: React.FC = () => {
  return (
    <PreviewWrapper>
      {/* Summary */}
      <PreviewCard>
        <PreviewHeader>
          <div>
            <PreviewLabel>Total Portfolio Value</PreviewLabel>
            <PreviewValue>$12,480.00</PreviewValue>
            <PreviewPnl $positive>+$2,480.00 (+24.8%)</PreviewPnl>
          </div>
          <PreviewStatsRow>
            <PreviewStat>
              <PreviewStatLabel>Invested</PreviewStatLabel>
              <PreviewStatValue>$10,000</PreviewStatValue>
            </PreviewStat>
            <PreviewStat>
              <PreviewStatLabel>Trades</PreviewStatLabel>
              <PreviewStatValue>47</PreviewStatValue>
            </PreviewStat>
            <PreviewStat>
              <PreviewStatLabel>Holdings</PreviewStatLabel>
              <PreviewStatValue>3</PreviewStatValue>
            </PreviewStat>
          </PreviewStatsRow>
        </PreviewHeader>
      </PreviewCard>

      {/* Charts */}
      <PreviewChartsGrid>
        <PreviewChartCard>
          <PreviewChartTitle>Portfolio Value</PreviewChartTitle>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D897" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00D897" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E28" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#5A5A6A", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#5A5A6A", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "#14141C",
                  border: "1px solid #1E1E28",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#8A8A9A" }}
                formatter={(v) => [`$${Number(v).toLocaleString()}`, "Value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00D897"
                strokeWidth={2}
                fill="url(#heroGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </PreviewChartCard>

        <PreviewChartCard>
          <PreviewChartTitle>Allocation</PreviewChartTitle>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={ALLOCATION_DATA}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                dataKey="value"
                stroke="none"
              >
                {ALLOCATION_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <PreviewLegend>
            {ALLOCATION_DATA.map((a) => (
              <PreviewLegendItem key={a.name}>
                <PreviewLegendDot $color={a.color} />
                {a.name} {a.value}%
              </PreviewLegendItem>
            ))}
          </PreviewLegend>
        </PreviewChartCard>
      </PreviewChartsGrid>

      {/* Holdings */}
      <PreviewCard>
        <PreviewChartTitle>Holdings</PreviewChartTitle>
        <PreviewHoldingsTable>
          <thead>
            <tr>
              <PreviewTh>Asset</PreviewTh>
              <PreviewTh style={{ textAlign: "right" }}>Qty</PreviewTh>
              <PreviewTh style={{ textAlign: "right" }}>Price</PreviewTh>
              <PreviewTh style={{ textAlign: "right" }}>Value</PreviewTh>
              <PreviewTh style={{ textAlign: "right" }}>P&L</PreviewTh>
            </tr>
          </thead>
          <tbody>
            {HOLDINGS.map((h) => (
              <tr key={h.symbol}>
                <PreviewTd>
                  <strong>{h.symbol}</strong>
                  <span style={{ marginLeft: 6, opacity: 0.5, fontSize: 11 }}>{h.pair}</span>
                </PreviewTd>
                <PreviewTdRight>{h.qty}</PreviewTdRight>
                <PreviewTdRight>{h.price}</PreviewTdRight>
                <PreviewTdRight>{h.value}</PreviewTdRight>
                <PreviewTdRight>
                  <PreviewPnlText $positive={h.positive}>{h.pnl}</PreviewPnlText>
                </PreviewTdRight>
              </tr>
            ))}
          </tbody>
        </PreviewHoldingsTable>
      </PreviewCard>
    </PreviewWrapper>
  );
};

export default HeroPreview;
