import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import type { StrategyPerformanceDto } from "@/api/types";
import {
  ChartModalOverlay,
  ChartModalCard,
  ChartModalClose,
  ChartModalTitle,
  ChartModalSubtitle,
  ChartModalGrid,
  ChartPanel,
  ChartPanelTitle,
  ChartStatsRow,
  ChartStat,
  ChartStatLabel,
  ChartStatValue,
  ChartEmptyState,
} from "./performanceStyles";

interface Props {
  strategy: StrategyPerformanceDto;
  onClose: () => void;
}

// Kept in sync with the backend/user-style dark theme: green for positive
// P&L, red for negative, neutral for axes. These ARE the user-dashboard
// accent colors from the theme; reading them from the theme via the
// ThemeContext would be more correct but adds noise for values that
// don't change.
const COLOR_POSITIVE = "#00D897";
const COLOR_NEGATIVE = "#EF4444";
const COLOR_AXIS = "#5A5A6A";

const fmtUsd = (v: number) =>
  `$${Math.abs(v).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const fmtSignedUsd = (v: number) => {
  if (v > 0) return `+${fmtUsd(v)}`;
  if (v < 0) return `-${fmtUsd(v)}`;
  return fmtUsd(v);
};

const fmtDateShort = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const fmtMonth = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
};

/**
 * Drill-down modal that opens from the "View charts" button on a row of
 * the user's Strategy Performance table. Shows the same visual shape the
 * admin gets for platform-wide per-strategy stats, but filtered to just
 * this user's trades on the selected strategy.
 *
 * <para>
 * The two charts ride on <c>strategy.cumulativeSeries</c> and
 * <c>strategy.monthlySeries</c> which are populated by the existing
 * <c>/Trade/Performance</c> endpoint — no second round-trip needed to
 * open the modal. For a strategy with no closed trades the empty-state
 * renders so the modal is always safe to open.
 * </para>
 *
 * <para>
 * Dismissal: Esc key, X button, click on the overlay backdrop. Click
 * inside the card is stopped so highlighting chart values doesn't
 * accidentally close.
 * </para>
 */
const StrategyPerformanceChartModal: React.FC<Props> = ({ strategy, onClose }) => {
  // Close on Escape. Attached / detached on mount so the listener doesn't
  // live longer than the modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const cumulativeData = strategy.cumulativeSeries.map((p) => ({
    label: fmtDateShort(p.date),
    value: p.realizedPnlUsd,
  }));

  // Force the Y domain to always include zero so tiny-by-magnitude values
  // look tiny. Without this, recharts auto-fits the axis to the data range
  // and a single −$0.05 bar fills the whole chart — visually reading as
  // "catastrophic loss" when it's actually a rounding-noise loss.
  const yDomainIncludeZero: [(dataMin: number) => number, (dataMax: number) => number] = [
    (dataMin) => (Number.isFinite(dataMin) ? Math.min(0, dataMin) : 0),
    (dataMax) => (Number.isFinite(dataMax) ? Math.max(0, dataMax) : 0),
  ];
  const monthlyData = strategy.monthlySeries.map((p) => ({
    label: fmtMonth(p.date),
    value: p.realizedPnlUsd,
  }));

  const hasAnyTrades = strategy.closedTradeCount > 0;

  // Strategy's overall P&L drives the cumulative line colour — green when
  // net positive across the window, red when net negative. Matches the
  // row colour in the table so the chart's identity is obvious.
  const lineColor = strategy.realizedPnlUsd >= 0 ? COLOR_POSITIVE : COLOR_NEGATIVE;
  // Unique gradient id per strategy so two modals rapid-opened don't
  // stomp each other's SVG defs (unlikely, but cheap to make safe).
  const gradientId = `cumulative-fill-${strategy.strategyId ?? "manual"}`;

  return (
    <ChartModalOverlay onClick={onClose}>
      <ChartModalCard onClick={(e) => e.stopPropagation()}>
        <ChartModalClose onClick={onClose} aria-label="Close chart modal">
          ×
        </ChartModalClose>

        <ChartModalTitle>{strategy.strategyName}</ChartModalTitle>
        <ChartModalSubtitle>
          {strategy.activeSince ? (
            <>
              Since {fmtDateShort(strategy.activeSince)}
              {strategy.activeUntil && strategy.activeUntil !== strategy.activeSince
                ? ` → ${fmtDateShort(strategy.activeUntil)}`
                : ""}
              {" · "}
              All times UTC
            </>
          ) : (
            "No closed trades in this period"
          )}
        </ChartModalSubtitle>

        {/*
          Compact summary row so the modal is self-contained — users know
          which numbers they're looking at without remembering the table row.
          Signed colours on the P&L value; everything else neutral.
        */}
        <ChartStatsRow>
          <ChartStat>
            <ChartStatLabel>Realized P&amp;L</ChartStatLabel>
            <ChartStatValue
              style={{ color: strategy.realizedPnlUsd >= 0 ? COLOR_POSITIVE : COLOR_NEGATIVE }}
            >
              {fmtSignedUsd(strategy.realizedPnlUsd)}
            </ChartStatValue>
          </ChartStat>
          <ChartStat>
            <ChartStatLabel>Closed Trades</ChartStatLabel>
            <ChartStatValue>{strategy.closedTradeCount.toLocaleString()}</ChartStatValue>
          </ChartStat>
          <ChartStat>
            <ChartStatLabel>Wins</ChartStatLabel>
            <ChartStatValue>{strategy.winningTradeCount.toLocaleString()}</ChartStatValue>
          </ChartStat>
          <ChartStat>
            <ChartStatLabel>Win Rate</ChartStatLabel>
            <ChartStatValue>
              {strategy.closedTradeCount > 0
                ? `${strategy.winRatePercent.toFixed(1)}%`
                : "—"}
            </ChartStatValue>
          </ChartStat>
          <ChartStat>
            <ChartStatLabel>Commission</ChartStatLabel>
            <ChartStatValue>${strategy.commissionUsd.toFixed(2)}</ChartStatValue>
          </ChartStat>
        </ChartStatsRow>

        <ChartModalGrid>
          <ChartPanel>
            <ChartPanelTitle>Cumulative Realized P&amp;L</ChartPanelTitle>
            {hasAnyTrades && cumulativeData.length > 0 ? (
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={cumulativeData}
                    margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={lineColor} stopOpacity={0.35} />
                        <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E1E28" vertical={false} />
                    <XAxis
                      dataKey="label"
                      stroke={COLOR_AXIS}
                      tick={{ fontSize: 11, fill: COLOR_AXIS }}
                      interval="preserveStartEnd"
                      minTickGap={30}
                    />
                    <YAxis
                      stroke={COLOR_AXIS}
                      tick={{ fontSize: 11, fill: COLOR_AXIS }}
                      tickFormatter={(v: number) => fmtSignedUsd(v)}
                      width={80}
                      domain={yDomainIncludeZero}
                    />
                    <ReferenceLine y={0} stroke={COLOR_AXIS} strokeDasharray="2 4" />
                    <Tooltip
                      // Dark popup to match the rest of the user dashboard.
                      contentStyle={{
                        background: "#14141C",
                        border: "1px solid #1E1E28",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      labelStyle={{ color: "#E5E5EC" }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(v: any) => [
                        fmtSignedUsd(typeof v === "number" ? v : Number(v)),
                        "Cumulative P&L",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={lineColor}
                      strokeWidth={2}
                      fill={`url(#${gradientId})`}
                      dot={cumulativeData.length <= 12 ? { r: 3 } : false}
                      isAnimationActive={false}
                    />
                    {cumulativeData.length === 1 && (
                      // Single-point fallback — an area with one point
                      // renders nothing, so overlay a dot explicitly.
                      <Line
                        type="linear"
                        dataKey="value"
                        stroke={lineColor}
                        dot={{ r: 5 }}
                        isAnimationActive={false}
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <ChartEmptyState>No closed-trade data for this strategy.</ChartEmptyState>
            )}
          </ChartPanel>

          <ChartPanel>
            <ChartPanelTitle>Monthly Realized P&amp;L</ChartPanelTitle>
            {hasAnyTrades && monthlyData.length > 0 ? (
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E1E28" vertical={false} />
                    <XAxis
                      dataKey="label"
                      stroke={COLOR_AXIS}
                      tick={{ fontSize: 11, fill: COLOR_AXIS }}
                      interval="preserveStartEnd"
                      minTickGap={20}
                    />
                    <YAxis
                      stroke={COLOR_AXIS}
                      tick={{ fontSize: 11, fill: COLOR_AXIS }}
                      tickFormatter={(v: number) => fmtSignedUsd(v)}
                      width={70}
                      domain={yDomainIncludeZero}
                    />
                    <ReferenceLine y={0} stroke={COLOR_AXIS} />
                    <Tooltip
                      contentStyle={{
                        background: "#14141C",
                        border: "1px solid #1E1E28",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      labelStyle={{ color: "#E5E5EC" }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(v: any) => [
                        fmtSignedUsd(typeof v === "number" ? v : Number(v)),
                        "Realized P&L",
                      ]}
                    />
                    <Bar dataKey="value" isAnimationActive={false}>
                      {monthlyData.map((d, i) => (
                        <Cell
                          key={i}
                          fill={d.value >= 0 ? COLOR_POSITIVE : COLOR_NEGATIVE}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <ChartEmptyState>No monthly data yet.</ChartEmptyState>
            )}
          </ChartPanel>
        </ChartModalGrid>
      </ChartModalCard>
    </ChartModalOverlay>
  );
};

export default StrategyPerformanceChartModal;
