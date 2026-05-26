// ─────────────────────────────────────────────
// Base API response
// ─────────────────────────────────────────────

export interface ApiResponse {
  isSuccess: boolean;
  successMessage?: string | null;
  errors?: string[];
}

export interface ApiResponseOf<T> extends ApiResponse {
  data?: T | null;
}

// ─────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────

/**
 * Surface a login is being attempted from. Mirrors backend
 * `LoginContext` enum. The user-facing app always sends "User"; the
 * admin panel sends "Admin". Drives whether 2FA is enforced and what
 * scope is baked into the resulting JWT.
 */
export type LoginContext = "User" | "Admin";

export interface LoginRequest {
  email: string;
  password: string;
  /** Always "User" from this app — JWT will be issued with scope=user. */
  context: LoginContext;
}

export interface RegisterRequest {
  email: string;
  password: string;
  /**
   * Optional ISO 3166-1 alpha-2 country code ("US", "GB", "AE"). Users
   * can skip on signup and set it later from the profile page.
   */
  country?: string;
}

export interface ConfirmEmailRequest {
  userId: string;
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  userId: string;
  token: string;
  newPassword: string;
}

export interface GoogleLoginRequest {
  idToken: string;
  /** Always "User" from this app. Same semantics as LoginRequest.context. */
  context: LoginContext;
}

// ─────────────────────────────────────────────
// Homepage performance (public, anonymous)
// ─────────────────────────────────────────────
//
// Mirrors the backend `HomepagePerformanceDto`. Powers the hero block:
// dynamic headline ("If you invested $X..."), 3-stat card (Annual
// Return / Max DD / Sharpe), 3-line equity-curve chart, monthly-
// returns table. Single fetch on hero mount; backend caches in Redis
// with a 1-hour TTL so this is cheap to call.

/** One point on the equity-curve chart. ISO date + 3 dollar values. */
export interface EquityPointDto {
  /** UTC month-start, e.g. "2020-01-01T00:00:00Z". */
  date: string;
  strategyValueUsd: number;
  btcValueUsd: number;
  ethValueUsd: number;
}

/**
 * One year of monthly strategy returns + YTD aggregate. Each month is
 * nullable — partial-year rows (e.g. current year through last
 * complete month) leave future months as null. Stored as DECIMAL
 * RATIOS (0.2640 = +26.40%); the FE multiplies by 100 for display.
 */
export interface MonthlyReturnsRowDto {
  year: number;
  jan: number | null;
  feb: number | null;
  mar: number | null;
  apr: number | null;
  may: number | null;
  jun: number | null;
  jul: number | null;
  aug: number | null;
  sep: number | null;
  oct: number | null;
  nov: number | null;
  dec: number | null;
  /** YTD = product of (1 + filled month) − 1. Null when all months null. */
  ytd: number | null;
}

/**
 * Single payload powering the entire hero performance block. Decimal
 * ratios throughout: 1.14 = +114%, -0.68 = -68%.
 */
export interface HomepagePerformanceDto {
  // Headline
  baselineAmountUsd: number;          // 1000
  baselineStartLabel: string;         // "Jan 2020"
  currentValueUsd: number;            // 107758.94

  // Stats card
  annualReturnPct: number;            // 1.14 = +114%
  maxDrawdownPct: number;             // -0.68 = -68%
  sharpeRatio: number;                // 1.45

  // Chart
  equityCurve: EquityPointDto[];

  // Monthly returns table
  monthlyReturns: MonthlyReturnsRowDto[];
}

// ─────────────────────────────────────────────
// Rich /performance page DTOs
// ─────────────────────────────────────────────
//
// The public performance page has its own richer payload (6 stats
// instead of 3, plus winners/losers/cash%/per-week breakdowns).
// Mirror of backend `PerformancePageDto` and `WeekDetailDto`.

/**
 * Period selector values. Default `Inception` shows the full
 * backtest. The 4 trailing-window values use the latest weekly row
 * as the anchor (not "today") so the period stays stable as data
 * extends.
 */
// NB: name differs from the existing dashboard `PerformancePeriod`
// (which has OneDay/SevenDays/OneMonth/etc. values for the user's
// own portfolio chart). The public /performance page deals in
// trailing-year windows over the audited backtest, so it gets its
// own type. Backend C# enum is `PerformancePeriod` (no namespace
// clash there).
export type PerformancePagePeriod =
  | "Inception"
  | "ThreeYears"
  | "TwoYears"
  | "OneYear"
  | "SixMonths";

/**
 * Headline stats — period-aware. Nullable fields render as "—" in
 * the UI when the underlying weekly metric isn't populated.
 */
export interface PerformancePageStatsDto {
  /** CAGR as PERCENT, e.g. 110.0. */
  annualReturnPct: number | null;
  /** NEGATIVE percent, e.g. -65.0. */
  maxDrawdownPct: number | null;
  sharpeRatio: number | null;
  /** Profitable weeks as PERCENT of weeks in the period. */
  profitableWeeksPct: number | null;
  calmarRatio: number | null;
  profitFactor: number | null;
}

/** One row in the top-winners or top-losers table. */
export interface ClosedTradeDto {
  symbol: string;
  buyPrice: number;
  sellPrice: number;
  buyDate: string;       // ISO datetime
  sellDate: string;      // ISO datetime
  /** P&L as PERCENT, e.g. +786.71. */
  profitPnlPercent: number;
}

/** One point on the all-time Cash% chart. */
export interface CashPctPointDto {
  /** ISO date "yyyy-MM-dd". */
  date: string;
  /** Cash as PERCENT of equity, e.g. 5.49. */
  cashPct: number;
}

/** Full payload for `GET /Performance/Page?period=...`. */
export interface PerformancePageDto {
  period: PerformancePagePeriod;
  stats: PerformancePageStatsDto;
  equityCurve: EquityPointDto[];
  monthlyReturns: MonthlyReturnsRowDto[];
  topWinners: ClosedTradeDto[];
  topLosers: ClosedTradeDto[];
  cashPctSeries: CashPctPointDto[];
  /** ISO dates "yyyy-MM-dd", descending — drives the dropdown. */
  availableWeeks: string[];
  /** ISO date or null. Default value of the week selector on first load. */
  latestWeek: string | null;
}

/** One slice of the donut chart on a week's view. */
export interface PieSliceDto {
  /** Asset symbol or "Cash (BNFCR)". */
  label: string;
  /** Slice weight as PERCENT, e.g. 24.2. */
  weightPct: number;
  /** True for the cash slice — FE renders with the neutral colour. */
  isCash: boolean;
}

/** One row in the weekly BUYs and SELLs table. */
export interface WeeklyTradeDto {
  /** ISO datetime. */
  tradeDate: string;
  /** "BUY" or "SELL". */
  type: string;
  symbol: string;
  price: number;
  /** Already converted to PERCENT (e.g. 9.03 = 9.03 %) on the wire. */
  costPctBalance: number;
}

/** Payload for `GET /Performance/Week/{weekEndDate}`. */
export interface WeekDetailDto {
  weekEndDate: string;
  pieSlices: PieSliceDto[];
  trades: WeeklyTradeDto[];
}

// ─────────────────────────────────────────────
// Marketing-email unsubscribe (public, anonymous)
// ─────────────────────────────────────────────

/**
 * Response of `GET /auth/UnsubscribeStatus?token=...`. Lets the
 * /unsubscribe page render "We've unsubscribed jane@example.com" before
 * the user clicks the confirm button — avoids GET-causes-state-change
 * pitfalls (link prefetchers, email security scanners hitting the URL).
 */
export interface UnsubscribeStatusDto {
  email: string;
  /** True after a successful unsubscribe (or if the user was already opted out). */
  isOptedOut: boolean;
}

/** Body for `POST /auth/Unsubscribe`. */
export interface UnsubscribeRequest {
  token: string;
}

// ─────────────────────────────────────────────
// User
// ─────────────────────────────────────────────

export interface UserInfo {
  userId: string;
  email: string;
  displayName: string | null;
  /** ISO 3166-1 alpha-2 country code, or null if the user hasn't set one. */
  country: string | null;
  imageUrl: string | null;
  roles: string[];
  isEmailConfirmed: boolean;
}

/**
 * Body for `PUT /User/SetCountry`. Pass an ISO 3166-1 alpha-2 code, or
 * null/empty to clear. Replaces the old SetNameRequest.
 */
export interface SetCountryRequest {
  country: string | null;
}

// ─────────────────────────────────────────────
// Plans
// ─────────────────────────────────────────────

export interface PlanDto {
  id: number;
  name: string;
  description: string;
  priceUsd: number;
  effectivePriceUsd: number;
  planBillingPeriod: string; // "Free" | "Monthly" | "Yearly"
  tier: string; // "Free" | "Pro" | "Enterprise"
  hasFreeTrial: boolean;
  trialDays: number;
  isOnSale: boolean;
  salePercentage: number;
  features: string | null;
  sortOrder: number;
}

// ─────────────────────────────────────────────
// Orders
// ─────────────────────────────────────────────

export interface CreateOrderRequest {
  planId: number;
  payCurrency?: string;
}

export interface OrderDto {
  id: number;
  planId: number;
  planName: string;
  priceUsd: number;
  currencyPaid: string | null;
  currencyAmount: number | null;
  status: string;
  invoiceUrl: string | null;
  payAddress: string | null;
  isTrial: boolean;
  createdAt: string | null;
}

// ─────────────────────────────────────────────
// Subscriptions
// ─────────────────────────────────────────────

export interface SubscriptionDto {
  id: number;
  planId: number;
  planName: string;
  planTier: string;
  billingPeriod: string;
  startDate: string;
  endDate: string;
  isTrial: boolean;
  isActive: boolean;
  isExpired: boolean;
}

export interface StartTrialRequest {
  planId: number;
}

// ─────────────────────────────────────────────
// Exchange Connection
// ─────────────────────────────────────────────

export interface ConnectExchangeRequest {
  apiKey: string;
  apiSecret: string;
  strategyId: number;
}

export interface UpdateExchangeKeysRequest {
  apiKey: string;
  apiSecret: string;
}

// ─────────────────────────────────────────────
// Onboarding
// ─────────────────────────────────────────────

export interface OnboardingStatusDto {
  hasActiveSubscription: boolean;
  hasActiveExchange: boolean;
  exchangeStatus: string | null;
  subscriptionTier: string | null;
  setupComplete: boolean;
}

// ─────────────────────────────────────────────
// Strategies
// ─────────────────────────────────────────────

export interface StrategyDto {
  id: number;
  name: string;
  slug: string;
  description: string;
  minPortfolioUsd: number;
  exchange: string;
  badge: string | null;
  features: string[];
  iconName: string;
  chartColor: string;
  chartPath: string | null;
  sortOrder: number;
}

// ─────────────────────────────────────────────
// Trade Orders
// ─────────────────────────────────────────────

export interface TradeOrderDto {
  id: number;
  signalId: number;
  symbol: string;
  side: string;
  status: string;
  requestedQuantity: number;
  filledQuantity: number;
  requestedPrice: number;
  avgFillPrice: number | null;
  binanceOrderId: number | null;
  errorMessage: string | null;
  retryCount: number;
  filledAt: string | null;
  lastCheckedAt: string | null;
  createdAt: string;
  /** "Signal" | "Manual" | "External" | "Liquidation" — surfaces where this trade came from. */
  source: string;
  /** Signed realized P&L in USD. Null while Binance fills are still being ingested. */
  realizedPnlUsd: number | null;
  /** Commission in USD. Null while ingesting. */
  commissionUsd: number | null;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─────────────────────────────────────────────
// Portfolio
// ─────────────────────────────────────────────

export interface PortfolioDto {
  totalValueUsd: number;
  totalInvestedUsd: number;
  /**
   * Fich's lifetime trading P&L — realized + unrealized + funding − commission,
   * all in BNFCR/USDT quote-asset terms. Excludes market drift on non-stable
   * collateral (that shows in `collateralDriftUsd`).
   */
  pnlUsd: number;
  /** `pnlUsd / netDepositsUsd × 100`. The Return % the user sees. */
  pnlPercent: number;
  /** Contributed-capital baseline — `OpeningEquityUsd + Σpost-activation Transfers`. The denominator behind `pnlPercent`. */
  netDepositsUsd: number;
  /**
   * `totalValueUsd − netDepositsUsd − pnlUsd`. The "everything else" that
   * moved the wallet — primarily mark-to-market changes on non-stablecoin
   * collateral the user deposited. Rounds to 0 for single-stablecoin wallets;
   * the UI hides the line in that case. For multi-asset wallets it explains
   * why "Total Portfolio Value dropped" while "Trading P&L is positive" can
   * both be true.
   */
  collateralDriftUsd: number;
  /** Available cash balance. Label with `cashAssetName` — not hardcoded "USDT". */
  usdtBalance: number;
  /** Actual quote asset: "USDT" for normal accounts, "BNFCR" for EU Credits-mode. */
  cashAssetName: string;
  totalTrades: number;
  activeHoldings: number;
  strategyName: string;
  /** ISO timestamp of the user's first filled signal-based trade. Null until the first rebalance actually executes. */
  firstSignalExecutedAt: string | null;
  holdings: HoldingDto[];
  history: PortfolioSnapshotDto[];
  /** Echoes the period query param so the client can render the active selector without duplicating state. */
  historyPeriod: PerformancePeriod;
  /** Bucket size used for `history` — drives x-axis tick formatting. */
  historyGranularity: ChartGranularity;
}

export interface HoldingDto {
  symbol: string;
  asset: string;
  /** Absolute position size. Direction is in `side`. */
  quantity: number;
  /** "Long" or "Short". Long = holding the asset; Short = sold borrowed asset. */
  side: string;
  /** Leverage multiplier (1 = spot-equivalent). */
  leverage: number;
  /** Weighted-average entry price. For longs: avg buy; for shorts: avg sell open. */
  avgBuyPrice: number;
  currentPrice: number;
  /** Absolute notional value at current price (|quantity| × currentPrice). */
  valueUsd: number;
  /** Signed unrealized P&L (positive = gain whether long or short). */
  pnlUsd: number;
  pnlPercent: number;
  allocationPercent: number;
  /**
   * Timestamp of the trade that opened the current position run for this
   * symbol — the most recent fill where the user's net position crossed
   * from zero to non-zero. Null when the position was opened outside Fich
   * or before the backfill window covered. Frontend renders "—" in that
   * case.
   */
  openedAt: string | null;
}

export interface PortfolioSnapshotDto {
  date: string;
  valueUsd: number;
}

export interface LastRebalanceDto {
  batchId: number;
  signalDate: string;
  status: string;
  totalSignals: number;
  userTradeCount: number;
  userFailedCount: number;
  receivedAt: string;
}

// ─────────────────────────────────────────────
// Exchange Connection
// ─────────────────────────────────────────────

export interface ExchangeConnectionDto {
  id: number;
  exchangeType: string; // "Binance"
  status: string; // "Pending" | "Active" | "Invalid" | "Disconnected"
  binanceUid: string | null;
  lastValidatedAt: string | null;
  lastValidationError: string | null;
  createdAt: string | null;
  strategyId: number;
  strategyName: string;
  strategySlug: string;
}

// ─────────────────────────────────────────────
// Performance (Phase 5 endpoint)
// ─────────────────────────────────────────────

/**
 * Period filter for the Performance endpoint and the Portfolio history
 * chart. Values match the backend's `PerformancePeriod` enum names exactly
 * because the API accepts them as strings in the query param.
 *
 * All windows are UTC — "OneDay" means last 24 hours, not "today so far
 * in the user's timezone."
 */
export type PerformancePeriod =
  | "All"
  | "OneMonth"
  | "SevenDays"
  | "OneDay"
  | "ThreeMonths"
  | "OneYear";

/**
 * Bucket size used for time-series charts. Backend chooses this per
 * period (Hourly for 24h/7d, Daily for 1m/3m, Weekly for 1y) and echoes
 * it in the response so the frontend can format x-axis ticks to match.
 */
export type ChartGranularity = "Hourly" | "Daily" | "Weekly";

export interface AssetPerformanceDto {
  asset: string;
  closedTradeCount: number;
  winningTradeCount: number;
  winRatePercent: number;
  realizedPnlUsd: number;
  commissionUsd: number;
}

/**
 * One point on a strategy's realized-P&L time series.
 *
 * Interpretation depends on which list the point came from:
 * - `cumulativeSeries` → running total lifetime-to-that-day (line chart)
 * - `monthlySeries`   → that month's contribution in isolation (bar chart)
 */
export interface StrategyPnlPointDto {
  /** Day-aligned UTC for cumulative, 1st-of-month UTC for monthly. */
  date: string;
  realizedPnlUsd: number;
}

export interface StrategyPerformanceDto {
  strategyName: string;
  /** null for the "Manual" bucket (trades without a signal). */
  strategyId: number | null;
  closedTradeCount: number;
  winningTradeCount: number;
  winRatePercent: number;
  realizedPnlUsd: number;
  commissionUsd: number;
  activeSince: string | null;
  activeUntil: string | null;
  /** Daily running totals — feeds the cumulative line chart in the drill-down modal. */
  cumulativeSeries: StrategyPnlPointDto[];
  /** Per-month deltas — feeds the monthly bar chart. */
  monthlySeries: StrategyPnlPointDto[];
}

export interface PerformanceDto {
  period: string;
  windowStart: string | null;
  windowEnd: string;

  // P&L core
  realizedPnlUsd: number;
  unrealizedPnlUsd: number;
  commissionUsd: number;
  fundingFeeUsd: number;
  netPnlUsd: number;
  netDepositsUsd: number;
  returnPercent: number;

  // Trade-level stats (closed-trades only)
  closedTradeCount: number;
  winningTradeCount: number;
  losingTradeCount: number;
  failedTradeCount: number;
  cancelledTradeCount: number;
  winRatePercent: number;
  avgWinUsd: number;
  avgLossUsd: number;
  largestWinUsd: number;
  largestLossUsd: number;
  /** Zero means losses were zero; UI should render as "—" or "∞". */
  profitFactor: number;

  // Drawdown (from equity snapshots)
  maxDrawdownUsd: number;
  maxDrawdownPercent: number;

  // Attribution
  perAsset: AssetPerformanceDto[];
  perStrategy: StrategyPerformanceDto[];

  // Reconciliation markers
  lastReconciliationAt: string | null;
  lastReconciliationDriftUsd: number | null;
  hasReconciliationDrift: boolean;
}
