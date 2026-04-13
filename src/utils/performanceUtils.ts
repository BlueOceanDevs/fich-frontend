import type { PortfolioDto, HoldingDto, PortfolioSnapshotDto, TradeOrderDto } from "@/api/types";

export interface PerformanceStats {
  totalReturn: number;
  totalReturnPercent: number;
  winningAssets: number;
  losingAssets: number;
  winRate: number;
  bestAsset: { asset: string; pnlPercent: number } | null;
  worstAsset: { asset: string; pnlPercent: number } | null;
  filledTrades: number;
  failedTrades: number;
  pendingTrades: number;
  cancelledTrades: number;
}

export function computePerformanceStats(
  portfolio: PortfolioDto,
  trades: TradeOrderDto[]
): PerformanceStats {
  const { holdings } = portfolio;

  const winningAssets = holdings.filter((h) => h.pnlUsd > 0).length;
  const losingAssets = holdings.filter((h) => h.pnlUsd < 0).length;
  const totalHoldings = holdings.length;
  const winRate = totalHoldings > 0 ? (winningAssets / totalHoldings) * 100 : 0;

  const sorted = [...holdings].sort((a, b) => b.pnlPercent - a.pnlPercent);
  const bestAsset =
    sorted.length > 0
      ? { asset: sorted[0].asset, pnlPercent: sorted[0].pnlPercent }
      : null;
  const worstAsset =
    sorted.length > 0
      ? {
          asset: sorted[sorted.length - 1].asset,
          pnlPercent: sorted[sorted.length - 1].pnlPercent,
        }
      : null;

  const filledTrades = trades.filter((t) => t.status === "Filled").length;
  const failedTrades = trades.filter((t) => t.status === "Failed").length;
  const pendingTrades = trades.filter(
    (t) => t.status === "Pending" || t.status === "PartiallyFilled"
  ).length;
  const cancelledTrades = trades.filter((t) => t.status === "Cancelled").length;

  return {
    totalReturn: portfolio.pnlUsd,
    totalReturnPercent: portfolio.pnlPercent,
    winningAssets,
    losingAssets,
    winRate,
    bestAsset,
    worstAsset,
    filledTrades,
    failedTrades,
    pendingTrades,
    cancelledTrades,
  };
}

export function computeReturnByPeriod(
  history: PortfolioSnapshotDto[]
): { daily: number; weekly: number; monthly: number } {
  if (history.length < 2) return { daily: 0, weekly: 0, monthly: 0 };

  const sorted = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const latest = sorted[sorted.length - 1];
  const latestValue = latest.valueUsd;
  const now = new Date(latest.date).getTime();

  const findClosest = (daysAgo: number): number => {
    const target = now - daysAgo * 86400000;
    let closest = sorted[0];
    let minDiff = Math.abs(new Date(closest.date).getTime() - target);
    for (const snap of sorted) {
      const diff = Math.abs(new Date(snap.date).getTime() - target);
      if (diff < minDiff) {
        minDiff = diff;
        closest = snap;
      }
    }
    return closest.valueUsd;
  };

  const calcReturn = (oldVal: number): number =>
    oldVal > 0 ? ((latestValue - oldVal) / oldVal) * 100 : 0;

  return {
    daily: calcReturn(findClosest(1)),
    weekly: calcReturn(findClosest(7)),
    monthly: calcReturn(findClosest(30)),
  };
}
