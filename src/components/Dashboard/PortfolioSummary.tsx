import React from "react";
import type { PortfolioDto } from "@/api/types";
import {
  SummaryCard,
  SummaryLeft,
  SummaryLabel,
  SummaryValue,
  SummaryPnl,
  SummaryRight,
  StrategyBadge,
} from "./styles";

interface Props {
  portfolio: PortfolioDto;
}

const PortfolioSummary: React.FC<Props> = ({ portfolio }) => {
  const positive = portfolio.pnlUsd >= 0;

  return (
    <SummaryCard>
      <SummaryLeft>
        <SummaryLabel>Total Portfolio Value</SummaryLabel>
        <SummaryValue>${portfolio.totalValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</SummaryValue>
        <SummaryPnl $positive={positive}>
          {positive ? "+" : ""}{portfolio.pnlUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD ({positive ? "+" : ""}{portfolio.pnlPercent.toFixed(2)}%)
        </SummaryPnl>
      </SummaryLeft>
      <SummaryRight>
        <StrategyBadge>{portfolio.strategyName}</StrategyBadge>
        <SummaryLabel style={{ textTransform: "none", letterSpacing: 0 }}>
          USDT Balance: ${portfolio.usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </SummaryLabel>
      </SummaryRight>
    </SummaryCard>
  );
};

export default PortfolioSummary;
