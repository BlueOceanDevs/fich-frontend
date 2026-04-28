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
import type {
  ChartGranularity,
  PerformancePeriod,
  PortfolioSnapshotDto,
} from "@/api/types";
import {
  CardTitle,
  ChartBody,
  ChartCard,
  ChartHeaderRow,
  ChartLoadingOverlay,
  ChartSpinner,
  EmptyState,
  PeriodPill,
  PeriodSelectorRow,
} from "./styles";

interface Props {
  history: PortfolioSnapshotDto[];
  /** Current selected period — drives which pill is active and how ticks are formatted. */
  period: PerformancePeriod;
  /** Granularity the backend chose for the response; controls x-axis tick format. */
  granularity: ChartGranularity;
  /** Parent handles refetching when the selection changes. */
  onPeriodChange: (next: PerformancePeriod) => void;
  /** True while a refetch is in-flight — pills stay clickable but the chart shows the previous data. */
  loading?: boolean;
}

// Fixed ordering for the pill row. Matches the enum values the backend
// accepts. "All" and "OneMonth" (the default) plus the four timescales the
// product wants — 24h / 7d / 1m / 3m / 1y.
const PERIODS: Array<{ value: PerformancePeriod; label: string }> = [
  { value: "OneDay", label: "24h" },
  { value: "SevenDays", label: "7d" },
  { value: "OneMonth", label: "1m" },
  { value: "ThreeMonths", label: "3m" },
  { value: "OneYear", label: "1y" },
];

const formatValue = (val: number) =>
  `$${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

/**
 * Formats a UTC timestamp for the x-axis according to the granularity the
 * backend bucketed by:
 *   • Hourly (24h / 7d): "14:00" on the same day, "Apr 22 14:00" across days
 *   • Daily  (1m / 3m): "Apr 22"
 *   • Weekly (1y):      "Apr 20"  (Monday of that week)
 *
 * Everything is rendered in the user's local TZ; the underlying data is
 * UTC-bucketed but users expect to see their own time when glancing at a
 * chart. Tooltips include the year + full date for unambiguity.
 */
const makeTickFormatter =
  (granularity: ChartGranularity, series: PortfolioSnapshotDto[]) =>
  (iso: string): string => {
    const d = new Date(iso);
    if (granularity === "Hourly") {
      // Collapse to "HH:mm" when the whole series is within one calendar
      // day (the 24h view), otherwise include the date so a 7d hourly
      // chart doesn't repeat the same 24 labels seven times.
      const sameDay =
        series.length > 0 &&
        new Date(series[0].date).toDateString() ===
          new Date(series[series.length - 1].date).toDateString();
      return sameDay
        ? d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
        : d.toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
          });
    }
    // Daily and Weekly both format as "Mon DD". Weekly users will still
    // see distinct labels since the buckets are 7 days apart.
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

const tooltipLabelFormatter = (granularity: ChartGranularity) => (iso: string) => {
  const d = new Date(String(iso));
  if (granularity === "Hourly") {
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const PortfolioChart: React.FC<Props> = ({
  history,
  period,
  granularity,
  onPeriodChange,
  loading = false,
}) => {
  const tickFormatter = makeTickFormatter(granularity, history);
  const labelFormatter = tooltipLabelFormatter(granularity);

  // Theme-aware colors. recharts props expect raw color strings, so we
  // can't rely on styled-components for the chart innards — we read from
  // the active theme manually. Re-renders flow through naturally because
  // useTheme subscribes to the ThemeProvider.
  const theme = useTheme();
  const lineColor = theme.colors.primary;
  const gridColor = theme.colors.cardBorder;
  const axisColor = theme.colors.textMuted;
  const tooltipBg = theme.colors.card;
  const tooltipBorder = theme.colors.cardBorder;
  const tooltipText = theme.colors.text;

  return (
    <ChartCard>
      <ChartHeaderRow>
        <CardTitle>Portfolio Value</CardTitle>
        <PeriodSelectorRow>
          {PERIODS.map((p) => (
            <PeriodPill
              key={p.value}
              type="button"
              $active={p.value === period}
              $disabled={loading && p.value !== period}
              disabled={loading && p.value !== period}
              onClick={() => p.value !== period && onPeriodChange(p.value)}
              aria-pressed={p.value === period}
            >
              {p.label}
            </PeriodPill>
          ))}
        </PeriodSelectorRow>
      </ChartHeaderRow>

      {history.length === 0 ? (
        <EmptyState>No history data yet. Portfolio chart will appear after your first trades.</EmptyState>
      ) : (
        <ChartBody>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={history} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={lineColor} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="date"
                tickFormatter={tickFormatter}
                tick={{ fill: axisColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                // Let recharts thin ticks automatically for dense hourly series
                // (7d at Hourly = 168 points; showing every one would overlap).
                minTickGap={40}
              />
              <YAxis
                tickFormatter={formatValue}
                tick={{ fill: axisColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={70}
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
                labelFormatter={(label) => labelFormatter(String(label))}
                formatter={(value) => [formatValue(Number(value)), "Value"]}
              />
              <Area
                type="monotone"
                dataKey="valueUsd"
                stroke={lineColor}
                strokeWidth={2}
                fill="url(#portfolioGradient)"
                dot={false}
                activeDot={{ r: 4, fill: lineColor }}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Overlay a spinner on top of the existing chart while a period
              change is refetching. Keeping the old chart visible underneath
              prevents layout jump and gives a faint "previous data" hint
              the user can still read. aria-live tells screen readers a
              refresh is happening. */}
          {loading && (
            <ChartLoadingOverlay role="status" aria-live="polite" aria-label="Loading chart">
              <ChartSpinner />
            </ChartLoadingOverlay>
          )}
        </ChartBody>
      )}
    </ChartCard>
  );
};

export default PortfolioChart;
