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

// "Member since" date format: "Apr 20, 2026" — concise and month-aware, works
// for users worldwide. Full time is dropped on purpose; day-level precision is
// what matters for this "when did the platform start managing my money" line.
const memberSinceFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const PortfolioSummary: React.FC<Props> = ({ portfolio }) => {
  const positive = portfolio.pnlUsd >= 0;

  // "Member since" is anchored to the user's first EXECUTED signal — i.e. the
  // first time a rebalance actually filled on their account. This is a more
  // meaningful "start date" than account creation (which could be months of
  // browsing before a trade) or subscription start (which could precede the
  // first signal cycle).
  const memberSince = portfolio.firstSignalExecutedAt
    ? memberSinceFormatter.format(new Date(portfolio.firstSignalExecutedAt))
    : null;

  return (
    <SummaryCard>
      <SummaryLeft>
        <SummaryLabel>Total Portfolio Value</SummaryLabel>
        <SummaryValue>${portfolio.totalValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</SummaryValue>
        <SummaryPnl $positive={positive}>
          {positive ? "+" : ""}{portfolio.pnlUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD ({positive ? "+" : ""}{portfolio.pnlPercent.toFixed(2)}%)
        </SummaryPnl>
        {memberSince && (
          <SummaryLabel style={{ textTransform: "none", letterSpacing: 0, marginTop: 8 }}>
            Member since {memberSince}
          </SummaryLabel>
        )}
      </SummaryLeft>
      <SummaryRight>
        <StrategyBadge>{portfolio.strategyName}</StrategyBadge>
        <SummaryLabel style={{ textTransform: "none", letterSpacing: 0 }}>
          {/* EU/EEA Credits-mode accounts hold BNFCR instead of USDT (MiCA rule) —
              the quote-asset name comes from the backend, not hardcoded here. */}
          {portfolio.cashAssetName || "USDT"} Balance: {portfolio.usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </SummaryLabel>
      </SummaryRight>
    </SummaryCard>
  );
};

export default PortfolioSummary;
