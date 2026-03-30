import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { PlanDto } from "@/api/types";
import { plansApi } from "@/api/plans";

// ─────────────────────────────────────────────
// A "tier group" combines monthly + yearly plans for one tier
// ─────────────────────────────────────────────

export interface TierGroup {
  tier: string; // "Free" | "Pro" | "Enterprise"
  description: string;
  features: string[];
  featureHeader: string;
  hasFreeTrial: boolean;
  trialDays: number;
  popular: boolean;
  monthlyPlan: PlanDto | null;
  yearlyPlan: PlanDto | null;
}

interface PricingState {
  billingCycle: "monthly" | "yearly";
  plans: PlanDto[];
  tierGroups: TierGroup[];
  isLoading: boolean;
  error: string | null;
  usedFallback: boolean;
}

// ─────────────────────────────────────────────
// Fallback plans — used when the API is unavailable
// so the landing page always renders correctly.
// ─────────────────────────────────────────────

const FALLBACK_TIER_GROUPS: TierGroup[] = [
  {
    tier: "Free",
    description: "Perfect for beginners exploring crypto trading.",
    featureHeader: "Included",
    features: [
      "Trade 50+ cryptocurrencies",
      "Standard trading fees (0.8%)",
      "Basic wallet security",
      "Mobile & desktop access",
      "Email support",
      "Market analysis tools",
      "Real-time price alerts",
    ],
    hasFreeTrial: false,
    trialDays: 0,
    popular: false,
    monthlyPlan: null,
    yearlyPlan: null,
  },
  {
    tier: "Pro",
    description: "Advanced tools for serious traders.",
    featureHeader: "Everything in Free, plus:",
    features: [
      "Reduced fees (0.4% per trade)",
      "Priority transaction processing",
      "Advanced charting & indicators",
      "Portfolio analytics dashboard",
      "Staking rewards (up to 12% APY)",
      "API access for automation",
      "Priority support (2h response)",
    ],
    hasFreeTrial: true,
    trialDays: 14,
    popular: true,
    monthlyPlan: null,
    yearlyPlan: null,
  },
  {
    tier: "Enterprise",
    description: "Built for institutions and high-volume traders.",
    featureHeader: "Everything in Pro, plus:",
    features: [
      "Ultra-low fees (0.1% per trade)",
      "Dedicated account manager",
      "OTC desk for large orders",
      "White-label solutions",
      "Custom API limits",
      "Multi-user team accounts",
      "24/7 phone support",
    ],
    hasFreeTrial: true,
    trialDays: 14,
    popular: false,
    monthlyPlan: null,
    yearlyPlan: null,
  },
];

const FALLBACK_PRICES: Record<string, { monthly: number; yearly: number }> = {
  Free: { monthly: 0, yearly: 0 },
  Pro: { monthly: 29.99, yearly: 287.90 },
  Enterprise: { monthly: 79.99, yearly: 767.90 },
};

const initialState: PricingState = {
  billingCycle: "monthly",
  plans: [],
  tierGroups: FALLBACK_TIER_GROUPS,
  isLoading: false,
  error: null,
  usedFallback: true,
};

// ─────────────────────────────────────────────
// Thunks
// ─────────────────────────────────────────────

export const fetchPlans = createAsyncThunk(
  "pricing/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await plansApi.getPlans();
      if (data.isSuccess && data.data) {
        return data.data;
      }
      return rejectWithValue("Failed to fetch plans");
    } catch {
      return rejectWithValue("Failed to fetch plans");
    }
  }
);

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const FEATURE_HEADERS: Record<string, string> = {
  Free: "Included",
  Pro: "Everything in Free, plus:",
  Enterprise: "Everything in Pro, plus:",
};

function buildTierGroups(plans: PlanDto[]): TierGroup[] {
  const tierOrder = ["Free", "Pro", "Enterprise"];
  const grouped: Record<string, { monthly: PlanDto | null; yearly: PlanDto | null }> = {};

  for (const plan of plans) {
    if (!grouped[plan.tier]) {
      grouped[plan.tier] = { monthly: null, yearly: null };
    }
    const period = plan.planBillingPeriod.toLowerCase();
    if (period === "free" || period.includes("monthly")) {
      grouped[plan.tier].monthly = plan;
    }
    if (period === "free" || period.includes("yearly")) {
      grouped[plan.tier].yearly = plan;
    }
  }

  return tierOrder
    .filter((tier) => grouped[tier] && (grouped[tier].monthly || grouped[tier].yearly))
    .map((tier) => {
      const g = grouped[tier];
      const refPlan = (g.monthly ?? g.yearly)!;
      // Features in DB are comma-separated
      const features = refPlan.features
        ? refPlan.features.split(",").map((f) => f.trim()).filter(Boolean)
        : [];

      return {
        tier,
        description: refPlan.description,
        features,
        featureHeader: FEATURE_HEADERS[tier] ?? "Features",
        hasFreeTrial: refPlan.hasFreeTrial,
        trialDays: refPlan.trialDays,
        popular: tier === "Pro",
        monthlyPlan: g.monthly,
        yearlyPlan: g.yearly,
      };
    });
}

// ─────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────

const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    setBillingCycle(state, action: PayloadAction<"monthly" | "yearly">) {
      state.billingCycle = action.payload;
    },
    toggleBillingCycle(state) {
      state.billingCycle =
        state.billingCycle === "monthly" ? "yearly" : "monthly";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = action.payload;
        state.tierGroups = buildTierGroups(action.payload);
        state.usedFallback = false;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // Keep fallback tier groups so the landing page always renders
      });
  },
});

export const { setBillingCycle, toggleBillingCycle } = pricingSlice.actions;
export default pricingSlice.reducer;

export { FALLBACK_PRICES };
