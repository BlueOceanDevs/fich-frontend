import React from "react";
import type { PerformanceDto, PortfolioDto } from "@/api/types";
import { StatsGrid, StatCard, StatLabel, StatValue, PnlText } from "./styles";

interface Props {
  portfolio: PortfolioDto;
  /**
   * Lifetime Performance snapshot. Optional — when present we add a "Net P&L"
   * card (realized + unrealized + funding − commission, per the P&L plan
   * §Phase 6). When absent (e.g. the Performance endpoint was down), we just
   * drop that card so the dashboard still renders.
   */
  perf?: PerformanceDto | null;
}

const fmtMoney = (val: number) =>
  `$${Math.abs(val).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const fmtUsd = (val: number) =>
  `$${val.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const QuickStats: React.FC<Props> = ({ portfolio, perf }) => {
  return (
    <StatsGrid>
      {/*
        Net P&L card — Phase 6 deliverable. Lifetime-scoped ("All" period)
        so it's a single decision-grade number the user sees first.
        Breakdown (realized / unrealized / funding / commission) lives on
        /dashboard/performance — this card is just the headline.
      */}
      {perf && (
        <StatCard>
          <StatLabel>Net P&L (All Time)</StatLabel>
          <StatValue>
            <PnlText $positive={perf.netPnlUsd >= 0}>
              {perf.netPnlUsd >= 0 ? "+" : "-"}
              {fmtMoney(perf.netPnlUsd)}
            </PnlText>
          </StatValue>
        </StatCard>
      )}

      <StatCard>
        <StatLabel>Portfolio Value</StatLabel>
        <StatValue>{fmtUsd(portfolio.totalValueUsd)}</StatValue>
      </StatCard>

      <StatCard>
        <StatLabel>Total Invested</StatLabel>
        <StatValue>{fmtUsd(portfolio.totalInvestedUsd)}</StatValue>
      </StatCard>

      <StatCard>
        <StatLabel>Total Trades</StatLabel>
        <StatValue>{portfolio.totalTrades.toString()}</StatValue>
      </StatCard>

      <StatCard>
        <StatLabel>Active Holdings</StatLabel>
        <StatValue>{portfolio.activeHoldings.toString()}</StatValue>
      </StatCard>
    </StatsGrid>
  );
};

export default QuickStats;
