import React from "react";
import type { PortfolioDto } from "@/api/types";
import { StatsGrid, StatCard, StatLabel, StatValue } from "./styles";

interface Props {
  portfolio: PortfolioDto;
}

const QuickStats: React.FC<Props> = ({ portfolio }) => {
  const stats = [
    {
      label: "Portfolio Value",
      value: `$${portfolio.totalValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      label: "Total Invested",
      value: `$${portfolio.totalInvestedUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      label: "Total Trades",
      value: portfolio.totalTrades.toString(),
    },
    {
      label: "Active Holdings",
      value: portfolio.activeHoldings.toString(),
    },
  ];

  return (
    <StatsGrid>
      {stats.map((s) => (
        <StatCard key={s.label}>
          <StatLabel>{s.label}</StatLabel>
          <StatValue>{s.value}</StatValue>
        </StatCard>
      ))}
    </StatsGrid>
  );
};

export default QuickStats;
