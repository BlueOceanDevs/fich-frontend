import React from "react";
import type { PerformanceStats as Stats } from "@/utils/performanceUtils";
import {
  PerfStatsGrid,
  PerfStatCard,
  PerfStatLabel,
  PerfStatValue,
  PerfReturnValue,
} from "./performanceStyles";

interface Props {
  stats: Stats;
  returns: { daily: number; weekly: number; monthly: number };
}

const fmt = (val: number) =>
  `$${Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const fmtPct = (val: number) =>
  `${val >= 0 ? "+" : ""}${val.toFixed(2)}%`;

const PerformanceStats: React.FC<Props> = ({ stats, returns }) => {
  return (
    <PerfStatsGrid>
      <PerfStatCard>
        <PerfStatLabel>Total Return</PerfStatLabel>
        <PerfReturnValue $positive={stats.totalReturn >= 0}>
          {stats.totalReturn >= 0 ? "+" : "-"}{fmt(stats.totalReturn)}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Total Return %</PerfStatLabel>
        <PerfReturnValue $positive={stats.totalReturnPercent >= 0}>
          {fmtPct(stats.totalReturnPercent)}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Daily Return</PerfStatLabel>
        <PerfReturnValue $positive={returns.daily >= 0}>
          {fmtPct(returns.daily)}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Weekly Return</PerfStatLabel>
        <PerfReturnValue $positive={returns.weekly >= 0}>
          {fmtPct(returns.weekly)}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Monthly Return</PerfStatLabel>
        <PerfReturnValue $positive={returns.monthly >= 0}>
          {fmtPct(returns.monthly)}
        </PerfReturnValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Win Rate</PerfStatLabel>
        <PerfStatValue>{stats.winRate.toFixed(1)}%</PerfStatValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Winning / Losing</PerfStatLabel>
        <PerfStatValue>
          <span style={{ color: "#00d897" }}>{stats.winningAssets}</span>
          {" / "}
          <span style={{ color: "#ef4444" }}>{stats.losingAssets}</span>
        </PerfStatValue>
      </PerfStatCard>

      <PerfStatCard>
        <PerfStatLabel>Best Asset</PerfStatLabel>
        <PerfStatValue>
          {stats.bestAsset ? (
            <>
              {stats.bestAsset.asset}{" "}
              <span style={{ fontSize: 14, color: stats.bestAsset.pnlPercent >= 0 ? "#00d897" : "#ef4444" }}>
                {fmtPct(stats.bestAsset.pnlPercent)}
              </span>
            </>
          ) : (
            "—"
          )}
        </PerfStatValue>
      </PerfStatCard>
    </PerfStatsGrid>
  );
};

export default PerformanceStats;
