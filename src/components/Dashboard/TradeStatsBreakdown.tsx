import React from "react";
import type { PerformanceStats } from "@/utils/performanceUtils";
import { Card, CardTitle, StatusBadge } from "./styles";
import {
  TradeStatusGrid,
  TradeStatusItem,
  TradeStatusCount,
  TradeStatusLabel,
} from "./performanceStyles";

interface Props {
  stats: PerformanceStats;
}

const TradeStatsBreakdown: React.FC<Props> = ({ stats }) => {
  const total =
    stats.filledTrades +
    stats.failedTrades +
    stats.pendingTrades +
    stats.cancelledTrades;

  return (
    <Card style={{ marginTop: 20, animationDelay: "0.25s" }}>
      <CardTitle>
        Trade Breakdown
        <span style={{ fontSize: 13, fontWeight: 400, color: "#5A5A6A", marginLeft: 8 }}>
          {total} total
        </span>
      </CardTitle>
      <TradeStatusGrid>
        <TradeStatusItem>
          <TradeStatusCount>{stats.filledTrades}</TradeStatusCount>
          <StatusBadge $status="Filled">Filled</StatusBadge>
        </TradeStatusItem>
        <TradeStatusItem>
          <TradeStatusCount>{stats.pendingTrades}</TradeStatusCount>
          <StatusBadge $status="Pending">Pending</StatusBadge>
        </TradeStatusItem>
        <TradeStatusItem>
          <TradeStatusCount>{stats.failedTrades}</TradeStatusCount>
          <StatusBadge $status="Failed">Failed</StatusBadge>
        </TradeStatusItem>
        <TradeStatusItem>
          <TradeStatusCount>{stats.cancelledTrades}</TradeStatusCount>
          <StatusBadge $status="Cancelled">Cancelled</StatusBadge>
        </TradeStatusItem>
      </TradeStatusGrid>
    </Card>
  );
};

export default TradeStatsBreakdown;
