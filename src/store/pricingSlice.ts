import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  features: string[];
  popular: boolean;
  ctaLabel: string;
}

interface PricingState {
  billingCycle: "monthly" | "yearly";
  plans: PricingPlan[];
}

const initialState: PricingState = {
  billingCycle: "monthly",
  plans: [
    {
      id: "free",
      name: "Free",
      monthlyPrice: "€0",
      yearlyPrice: "€0",
      description: "Perfect for beginners exploring crypto trading.",
      features: [
        "Trade 50+ cryptocurrencies",
        "Automatic staking (up to 0.04%)",
        "Basic market charts",
        "Mobile & desktop access",
        "Email support",
        "Market analysis data",
        "Real-time price alerts",
      ],
      popular: false,
      ctaLabel: "Get started",
    },
    {
      id: "pro",
      name: "Pro",
      monthlyPrice: "€12",
      yearlyPrice: "€9",
      description: "Advanced tools for serious traders.",
      features: [
        "Everything in Free plan",
        "Reduced fees (0.4% per trade)",
        "Priority transaction processing",
        "Advanced charting & indicators",
        "Staking rewards (up to 5.84%)",
        "API access for automation",
        "Priority support (24/7 response)",
      ],
      popular: true,
      ctaLabel: "Get started",
    },
    {
      id: "business",
      name: "Business",
      monthlyPrice: "€39",
      yearlyPrice: "€29",
      description: "Built for institutions and high-volume traders.",
      features: [
        "Everything in Pro plan",
        "Access to free OTC/pre-market",
        "Custom transaction limits",
        "OTC desk for large orders",
        "Custom API limits",
        "Multi-user team dashboards",
        "SLA priority guarantee",
      ],
      popular: false,
      ctaLabel: "Get started",
    },
  ],
};

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
});

export const { setBillingCycle, toggleBillingCycle } = pricingSlice.actions;
export default pricingSlice.reducer;
