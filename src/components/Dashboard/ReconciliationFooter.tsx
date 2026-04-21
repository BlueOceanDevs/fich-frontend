import React from "react";
import type { PerformanceDto } from "@/api/types";
import { ReconFooter, ReconFooterIcon } from "./performanceStyles";

interface Props {
  perf: PerformanceDto;
}

/**
 * Compact "last reconciled" footer for the Performance page.
 *
 * Why this is here: users who read fine print want to know the numbers
 * above weren't hallucinated. We run a periodic backfill that compares
 * our ledger against Binance's income history and flags drift. If the
 * last reconciliation was clean within the documented SLA (currently
 * 24 h), we show a quiet green tick. If drift was detected — or the
 * ledger hasn't been reconciled for over 24 h — we show a yellow
 * warning so the user knows to look twice.
 *
 * Drift magnitude is in the DTO but we don't surface the dollar amount
 * here: it's almost always noise (sub-cent rounding from different fee
 * precision rules), and showing "$0.004 drift" looks worse than
 * reassuring. Admin tools see the exact number; users see "ok / not-ok".
 */
const ReconciliationFooter: React.FC<Props> = ({ perf }) => {
  const drift = perf.hasReconciliationDrift;

  // Format the "last checked" relative time in a lightweight way.
  // Full locale formatting via Intl.RelativeTimeFormat would be overkill
  // for one line of copy we refresh on page load.
  const relativeTime = (iso: string | null): string => {
    if (!iso) return "never";
    const t = new Date(iso).getTime();
    if (Number.isNaN(t)) return "never";
    const mins = Math.round((Date.now() - t) / 60_000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.round(hrs / 24);
    return `${days}d ago`;
  };

  const when = relativeTime(perf.lastReconciliationAt);

  const message = drift
    ? `Reconciliation check detected a small drift vs. Binance's ledger. Our team has been notified. Last checked ${when}.`
    : perf.lastReconciliationAt
    ? `Reconciled against Binance ${when}. Numbers match within tolerance.`
    : "Reconciliation has not completed yet. Numbers will be verified against Binance shortly.";

  return (
    <ReconFooter $drift={drift}>
      <ReconFooterIcon $drift={drift} aria-hidden="true">
        {drift ? "!" : "✓"}
      </ReconFooterIcon>
      <span>{message}</span>
      {/*
        Per the P&L accuracy plan: every period window on this page is measured
        in UTC, not the viewer's local time. Making that explicit prevents the
        obvious support ticket ("why doesn't 1D match my today?"). Kept as a
        small muted span on the same line so it doesn't dominate the footer
        when drift is present.
      */}
      <span style={{ opacity: 0.65, marginLeft: "auto", fontSize: 11 }}>
        All times UTC
      </span>
    </ReconFooter>
  );
};

export default ReconciliationFooter;
