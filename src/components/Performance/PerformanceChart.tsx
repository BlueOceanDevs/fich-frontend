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
import { useTheme } from "styled-components";
import type { EquityPointDto } from "@/api/types";
import {
  ChartCard,
  ChartTitle,
  ChartLegend,
  LegendItem,
  LegendDot,
} from "./styles";

interface Props {
  /** Equity-curve points for all three series. First point is the
   *  baseline anchor (all three values = BaselineAmountUsd). */
  data: EquityPointDto[];
}

// Brand-fixed line colors. Strategy uses the brand green (theme-
// dependent for light/dark), BTC + ETH use their canonical brand
// hexes (theme-INDEPENDENT — orange BTC + purple-blue ETH are
// universally recognizable regardless of the page's light/dark mode).
const BTC_COLOR = "#F7931A";
const ETH_COLOR = "#627EEA";

// X-axis label: "Jan 2020" for short dates, derived from the ISO
// timestamp. Shorter than the tooltip's full date — month/year is
// enough granularity for monthly buckets across multi-year ranges.
function formatTick(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    year: "2-digit",
  });
}

// Tooltip label: "Jan 1, 2020" — full date with year. Removes
// ambiguity vs the x-axis ticks (which collapse to month/year).
function formatTooltipLabel(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Y-axis tick: $1k, $50k, $100k. Compact representation that doesn't
// break wide-range charts (our seeded data goes from $1k to $160k+).
function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}k`;
  return `$${Math.round(value)}`;
}

// Tooltip value: full dollars with thousands separators, plus the
// period change vs the chart's starting baseline. The chart's first
// point is always either $1000 (shorter periods, normalised) or
// $1000 (Inception, seed baseline), so the baseline is well-known —
// passed in as `baseline` to keep the math explicit.
//
// Format example: "$1,250.42 (+25.04%)" — full dollar value with
// a coloured-by-sign change percentage in parens so the visitor
// can read "how much have I grown vs my starting investment" at a
// glance.
function formatTooltipValue(value: number, baseline: number): string {
  const dollars = `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
  if (baseline <= 0 || !Number.isFinite(baseline)) return dollars;
  const changePct = (value / baseline - 1) * 100;
  const sign = changePct > 0 ? "+" : changePct < 0 ? "−" : "";
  const changeStr = `${sign}${Math.abs(changePct).toFixed(2)}%`;
  return `${dollars} (${changeStr})`;
}

const PerformanceChart: React.FC<Props> = ({ data }) => {
  // Theme-aware chart chrome — recharts props need raw color strings,
  // so we read from the active theme manually. Re-renders flow
  // through naturally because useTheme subscribes to ThemeProvider.
  const theme = useTheme();
  const stratColor = theme.colors.primary;
  const gridColor = theme.colors.cardBorder;
  const axisColor = theme.colors.textMuted;
  const tooltipBg = theme.colors.card;
  const tooltipBorder = theme.colors.cardBorder;
  const tooltipText = theme.colors.text;

  if (!data || data.length === 0) {
    return null;
  }

  // Per-series baselines at the chart's start point. Strategy /
  // BTC / ETH each have their own anchor — the service re-anchors
  // every series to $1000 for shorter periods, but for Inception
  // they're the raw starting values. Look up dynamically rather
  // than hard-coding $1000 so the tooltip math stays correct under
  // both modes.
  const first = data[0];
  const baselines = {
    Strategy: first.strategyValueUsd,
    BTC: first.btcValueUsd,
    ETH: first.ethValueUsd,
  } as const;

  return (
    <ChartCard>
      <ChartTitle>Performance</ChartTitle>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <defs>
            {/* Strategy fill is the brand-green gradient — emphasizes
                the "our line is the headline" hierarchy over BTC/ETH
                which render as plain lines. */}
            <linearGradient id="strategyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stratColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={stratColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="date"
            tickFormatter={formatTick}
            tick={{ fill: axisColor, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            minTickGap={40}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: axisColor, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip
            contentStyle={{
              background: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: 8,
              fontSize: 12,
              color: tooltipText,
            }}
            itemStyle={{ color: tooltipText }}
            labelStyle={{ color: tooltipText }}
            labelFormatter={(label) => formatTooltipLabel(String(label))}
            // recharts' formatter signature accepts ValueType | undefined;
            // coerce defensively. `name` is whatever `name=` we passed
            // on the matching Area, mapped 1:1 to the legend. Each
            // series uses its own baseline (first chart point) so the
            // tooltip's change% reflects "growth from your starting
            // investment", not "growth from $1000 universally".
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any, name: any) => {
              const seriesName = String(name) as keyof typeof baselines;
              const baseline = baselines[seriesName] ?? 0;
              return [
                formatTooltipValue(Number(value), baseline),
                seriesName,
              ];
            }}
          />

          {/* Strategy renders LAST so its line sits on top of BTC/ETH.
              Filled-area for visual emphasis; BTC/ETH are line-only. */}
          <Area
            type="monotone"
            dataKey="btcValueUsd"
            name="BTC"
            stroke={BTC_COLOR}
            strokeWidth={1.5}
            fill="transparent"
            dot={false}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="ethValueUsd"
            name="ETH"
            stroke={ETH_COLOR}
            strokeWidth={1.5}
            fill="transparent"
            dot={false}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="strategyValueUsd"
            name="Strategy"
            stroke={stratColor}
            strokeWidth={2}
            fill="url(#strategyGradient)"
            dot={false}
            activeDot={{ r: 4, fill: stratColor }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      <ChartLegend>
        <LegendItem>
          <LegendDot $color={stratColor} />
          Strategy
        </LegendItem>
        <LegendItem>
          <LegendDot $color={BTC_COLOR} />
          BTC
        </LegendItem>
        <LegendItem>
          <LegendDot $color={ETH_COLOR} />
          ETH
        </LegendItem>
      </ChartLegend>
    </ChartCard>
  );
};

export default PerformanceChart;
