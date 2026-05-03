import styled from "styled-components";

// ─────────────────────────────────────────────
// Hero performance block — shared styled components
// ─────────────────────────────────────────────
//
// Used by StatsCard, PerformanceChart, MonthlyReturnsTable. Theme-
// aware via styled-components; the chart's recharts internals read
// from useTheme() since recharts props need raw color strings.

export const PerfBlockWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 880px;
  margin-left: auto;
  margin-right: auto;
`;

// ── "If you invested $X in {Month} {Year} you would now have $Y" ──

export const HeadlineCallout = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin: 24px auto 8px;
  line-height: 1.4;
  max-width: 720px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 18px;
  }
`;

export const HeadlineHighlight = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

// ── 3-stat card (Annual Return / Max Drawdown / Sharpe) ──

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 20px 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const StatCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: space-between;
  }
`;

export const StatLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const StatValue = styled.span<{ $tone?: "positive" | "negative" | "neutral" }>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme, $tone }) =>
    $tone === "positive"
      ? theme.colors.success
      : $tone === "negative"
      ? theme.colors.danger
      : theme.colors.text};
`;

// ── Performance chart card ──

export const ChartCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 24px;
`;

export const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 16px;
  text-align: center;
`;

export const ChartLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LegendDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: inline-block;
`;

// ── Monthly returns table ──
//
// Match the dark visual language of the chart card above. Defensive
// styling: every <table>/<thead>/<tbody>/<th>/<td> has explicit
// background+color rules so the table can NEVER fall back to default
// browser styling (which would render a white block on the dark
// page). The styled-component selectors target the bare HTML tags
// inside our wrappers so even if the inner element types are renamed
// upstream, the visual stays consistent.

export const TableCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

export const TableTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 16px;
  text-align: center;
`;

// Wrap the table in a horizontal-scroll container as a fallback for
// very narrow viewports (< 640px). On desktop the table is sized so
// all 14 columns (Year + 12 months + YTD) fit without scrolling —
// users see the full picture including YTD at a glance.
export const TableScroll = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const ReturnsTable = styled.table`
  /* No min-width on desktop — let the table fit the card. The cell
     padding/font is tuned so the widest YTD values (like "1214%")
     still fit within the ~830px parent. On mobile we drop a min-
     width to keep the columns legible and let the parent scroll. */
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  table-layout: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-width: 720px;
    font-size: 11px;
  }
`;

export const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.backgroundLight};

  th {
    text-align: right;
    padding: 8px 6px;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.backgroundLight};
    border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
    white-space: nowrap;
  }
  th:first-child {
    text-align: left;
    border-top-left-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-left-radius: 0;
  }
  th:last-child {
    /* YTD column — separated visually from the months. */
    border-left: 1px solid ${({ theme }) => theme.colors.cardBorder};
    color: ${({ theme }) => theme.colors.text};
    border-top-right-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export const TableBody = styled.tbody`
  td {
    text-align: right;
    padding: 8px 6px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    background: ${({ theme }) => theme.colors.card};
  }
  td:first-child {
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    padding-left: 10px;
  }
  td:last-child {
    /* YTD column — bold + left border to separate from months. */
    border-left: 1px solid ${({ theme }) => theme.colors.cardBorder};
    font-weight: 700;
    padding-right: 10px;
  }
  tr:last-child td {
    border-bottom: none;
  }
  /* Subtle hover state — emphasises the row admins are reading. */
  tr:hover td {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

export const ReturnCell = styled.td<{ $value: number | null }>`
  color: ${({ theme, $value }) =>
    $value == null
      ? theme.colors.textMuted
      : $value > 0
      ? theme.colors.success
      : $value < 0
      ? theme.colors.danger
      : theme.colors.text} !important;
`;

// ── "See historical performance" button ──

export const HistoricalLinkRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;
