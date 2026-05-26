import React from "react";
import type { PortfolioDto } from "@/api/types";
import {
  SummaryCard,
  SummaryLeft,
  SummaryLabel,
  SummaryValue,
  SummaryPnl,
  SummarySubline,
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

// Tooltips for the three-line P&L breakdown. Helps a user who sees
// "Portfolio dropped but Fich shows +profit" understand the
// distinction between trading performance (Fich's contribution) and
// collateral drift (user's market exposure on deposited non-stable
// assets). The tooltips appear on hover via the native `title=`
// attribute — no extra component, no a11y regression.
const TOOLTIPS = {
  totalValue:
    "Current account equity converted to USD at live market prices. Includes the quote-asset wallet (BNFCR/USDT), open-position unrealized P&L, and any non-stablecoin assets you've deposited valued at their current market price.",
  tradingPnl:
    "Fich's lifetime trading performance: realized + unrealized + funding − commission, all in quote-asset terms. This is the portion of your portfolio's change that's attributable to the strategy.",
  collateralDrift:
    "Mark-to-market changes on non-stablecoin assets you deposited as collateral (e.g. ETH). Not part of Fich's trading return — these moves come from market price changes on assets you hold, not from positions Fich opens or closes.",
} as const;

const PortfolioSummary: React.FC<Props> = ({ portfolio }) => {
  const tradingPositive = portfolio.pnlUsd >= 0;
  const driftPositive = portfolio.collateralDriftUsd >= 0;

  // Hide the collateral-drift subline when it rounds to zero — pure
  // BNFCR/USDT wallets don't have anything to surface here, and the
  // extra row would only add noise. 1¢ threshold matches the
  // backend's Math.Round(_, 2) precision so a value of exactly 0
  // after rounding never renders.
  const showDriftLine = Math.abs(portfolio.collateralDriftUsd) >= 0.01;

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
        <SummaryLabel title={TOOLTIPS.totalValue}>Total Portfolio Value</SummaryLabel>
        <SummaryValue>${portfolio.totalValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</SummaryValue>
        <SummaryPnl $positive={tradingPositive} title={TOOLTIPS.tradingPnl}>
          Trading P&amp;L: {tradingPositive ? "+" : ""}{portfolio.pnlUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD ({tradingPositive ? "+" : ""}{portfolio.pnlPercent.toFixed(2)}%)
        </SummaryPnl>
        {showDriftLine && (
          <SummarySubline $positive={driftPositive} title={TOOLTIPS.collateralDrift}>
            Collateral drift: {driftPositive ? "+" : ""}{portfolio.collateralDriftUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
          </SummarySubline>
        )}
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
