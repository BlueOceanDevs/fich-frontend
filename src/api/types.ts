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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
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
}

// ─────────────────────────────────────────────
// User
// ─────────────────────────────────────────────

export interface UserInfo {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  imageUrl: string | null;
  roles: string[];
  isEmailConfirmed: boolean;
}

export interface SetNameRequest {
  firstName: string;
  lastName: string;
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
  pnlUsd: number;
  pnlPercent: number;
  usdtBalance: number;
  totalTrades: number;
  activeHoldings: number;
  strategyName: string;
  holdings: HoldingDto[];
  history: PortfolioSnapshotDto[];
}

export interface HoldingDto {
  symbol: string;
  asset: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  valueUsd: number;
  pnlUsd: number;
  pnlPercent: number;
  allocationPercent: number;
}

export interface PortfolioSnapshotDto {
  date: string;
  valueUsd: number;
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
