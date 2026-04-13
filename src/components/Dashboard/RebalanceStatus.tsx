import React, { useEffect, useState } from "react";
import type { LastRebalanceDto } from "@/api/types";
import { tradesApi } from "@/api/trades";
import {
  Card,
  CardTitle,
  StatLabel,
  StatusBadge,
} from "./styles";
import {
  RebalanceGrid,
  RebalanceStat,
  RebalanceStatValue,
  RebalanceRow,
  RebalanceTime,
} from "./rebalanceStyles";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const RebalanceStatus: React.FC = () => {
  const [data, setData] = useState<LastRebalanceDto | null>(null);

  useEffect(() => {
    tradesApi
      .getLastRebalance()
      .then(({ data: res }) => {
        if (res.isSuccess && res.data) setData(res.data);
      })
      .catch(() => {});
  }, []);

  if (!data) return null;

  const batchStatus = data.status === "Completed" ? "Filled" : "Pending";

  return (
    <Card style={{ marginTop: 20, animationDelay: "0.15s" }}>
      <RebalanceRow>
        <CardTitle style={{ marginBottom: 0 }}>Last Rebalance</CardTitle>
        <RebalanceTime>{timeAgo(data.receivedAt)}</RebalanceTime>
      </RebalanceRow>

      <RebalanceGrid>
        <RebalanceStat>
          <StatLabel>Date</StatLabel>
          <RebalanceStatValue>{formatDate(data.signalDate)}</RebalanceStatValue>
        </RebalanceStat>
        <RebalanceStat>
          <StatLabel>Status</StatLabel>
          <div>
            <StatusBadge $status={batchStatus}>
              {data.status === "Completed" ? "Completed" : "Partially Failed"}
            </StatusBadge>
          </div>
        </RebalanceStat>
        <RebalanceStat>
          <StatLabel>Signals</StatLabel>
          <RebalanceStatValue>{data.totalSignals}</RebalanceStatValue>
        </RebalanceStat>
        <RebalanceStat>
          <StatLabel>Your Trades</StatLabel>
          <RebalanceStatValue>{data.userTradeCount}</RebalanceStatValue>
        </RebalanceStat>
        {data.userFailedCount > 0 && (
          <RebalanceStat>
            <StatLabel>Failed</StatLabel>
            <RebalanceStatValue style={{ color: "#ef4444" }}>
              {data.userFailedCount}
            </RebalanceStatValue>
          </RebalanceStat>
        )}
      </RebalanceGrid>
    </Card>
  );
};

export default RebalanceStatus;
