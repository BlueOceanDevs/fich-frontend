import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Each FAQ entry tags its category (drives the section grouping on
// /faq) and a `featuredOnHomepage` flag (drives the 4-question
// preview rendered inline on the landing page). Keep the master list
// sorted by category, then by intended display order — that's the
// order the /faq page renders within each category.
export type FaqCategory = "security" | "strategy" | "logistics" | "risk";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  /**
   * If true, this item appears in the inline FAQ preview on the
   * landing page (the homepage shows up to 4 of these). Otherwise it
   * only surfaces on the dedicated /faq page.
   */
  featuredOnHomepage?: boolean;
}

interface FaqState {
  /** Currently expanded item id, or null if none. Single-open accordion. */
  openId: string | null;
  items: FaqItem[];
}

// Display labels for each category — used by the /faq page section
// headings. Keeping them centralized avoids drift between the slice
// (single source of truth) and the rendering components.
export const FAQ_CATEGORY_LABELS: Record<FaqCategory, string> = {
  security: "Security & Trust",
  strategy: "Strategy & Performance",
  logistics: "Setup & Logistics",
  risk: "Risk & Reality Check",
};

const initialState: FaqState = {
  openId: null,
  items: [
    // ── Category 1: Security & Trust ────────────────────────────
    {
      id: "team",
      category: "security",
      question: "Who is the team behind FICH?",
      answer:
        "Nobody. We are just Tier-1 quantitative traders who decided to give the public access to our algorithms.",
    },
    {
      id: "returns",
      category: "security",
      question: "How much money will I make?",
      answer:
        "We don't sell promises; we execute math. Historically, our algorithm has generated an annualized return of over 107%, turning a theoretical portfolio into a 10,000% total gain over 6 years. However, past performance does not guarantee future results. If you are looking for guaranteed daily profits, go buy government bonds. If you want access to a systematic momentum engine that historically crushes the market, FICH is the right place.",
    },
    {
      id: "withdraw-anytime",
      category: "security",
      question: "Can I withdraw my money at any time?",
      answer:
        "Yes. Because the funds are sitting in your own exchange account, you have complete sovereignty. You can pause the bot, withdraw your funds, or manually close trades whenever you want. You are never locked in.",
    },
    {
      id: "api-keys-security",
      category: "security",
      question: "How do you secure my API keys on your servers?",
      answer:
        "We treat your API credentials with bank-grade security. Your API keys are encrypted at rest using AES-256 encryption. Furthermore, because we strictly enforce the \"Trade-Only\" and \"No Withdrawal\" rule, even in the highly unlikely event of a server breach, bad actors cannot withdraw your funds.",
    },
    {
      id: "non-custodial",
      category: "security",
      question: "Do I need to send you my crypto?",
      answer:
        "Absolutely not. fich.ai is 100% non-custodial. Your funds always remain in your personal Binance account. You connect to our system using a \"Trade-Only\" Binance Futures API key. We physically cannot withdraw or transfer your assets.",
      featuredOnHomepage: true,
    },

    // ── Category 2: Strategy & Performance ──────────────────────
    {
      id: "crash-protection",
      category: "strategy",
      question: "How does FICH protect me during a market crash?",
      answer:
        "Our strategy isn't just programmed to buy; it's programmed to survive. We use strict volatility and momentum filters. If the broader market begins to bleed and loses momentum, our engine automatically rotates your portfolio into stablecoins (USDC/USDT) to preserve your capital until the trend reverses.",
      featuredOnHomepage: true,
    },
    {
      id: "win-rate",
      category: "strategy",
      question: "Will I win every trade?",
      answer:
        "No, and you shouldn't expect to. Our verified win rate is around 45%. Momentum trading is about asymmetric risk. We take small, calculated losses frequently, but we cut them instantly. When we catch a massive trend (like SOL or MATIC), the winners run hard enough to exponentially outpace the losers.",
    },
    {
      id: "weekly-rebalancing",
      category: "strategy",
      question: "What is \"Weekly Rebalancing\"?",
      answer:
        "Every week, our algorithm scans over 300 altcoins on Binance to calculate their relative momentum. It ruthlessly sells the coins that are slowing down and reallocates your capital into the fastest-moving assets. The machine does the heavy lifting so you don't have to stare at charts.",
    },

    // ── Category 3: Setup & Logistics ───────────────────────────
    {
      id: "supported-exchanges",
      category: "logistics",
      question: "Which exchanges do you support?",
      answer:
        "Currently, we exclusively support Binance. It provides the deepest liquidity and the widest selection of altcoins required for our quantitative momentum engine to operate at peak efficiency.",
    },
    {
      id: "setup-difficulty",
      category: "logistics",
      question: "How difficult is it to set up?",
      answer:
        "It takes less than 5 minutes. You simply create a \"Trade-Only\" API key inside your Binance Futures account and paste it into your fich.ai user dashboard. Once connected, the automated rotation begins on the very next rebalance cycle.",
      featuredOnHomepage: true,
    },
    {
      id: "separate-account",
      category: "logistics",
      question: "Do I need a separate Binance account for this?",
      answer:
        "Highly Recommended. While you can connect your main account, our algorithm calculates your portfolio balance to determine position sizing during the weekly rebalance. If you are manually trading meme coins or holding long-term Bitcoin in the same account, it will interfere with the bot's math. We strongly advise creating a dedicated Binance Sub-Account (or a fresh account) specifically and only for the fich.ai algorithm.",
    },
    {
      id: "minimum-portfolio",
      category: "logistics",
      question: "What size portfolio do I need for this to make sense?",
      answer:
        "While there is no technical minimum nor maximum, our flat subscription fee means this strategy is mathematically best suited for traders with a starting capital of at least $500 to $1000. This ensures the subscription cost doesn't eat into your compound growth.",
    },
    {
      id: "payment-method",
      category: "logistics",
      question: "How do I pay for the subscription?",
      answer:
        "We are crypto-native. We accept payments directly in USDC/USDT via our decentralized payment gateway. No banks, no credit card chargebacks, and no unnecessary KYC for your subscription.",
    },
    {
      id: "no-performance-fees",
      category: "logistics",
      question: "Are there any hidden performance fees or profit sharing?",
      answer:
        "No. Traditional quant funds take a 2% management fee and 20% of your profits. We charge a flat, transparent monthly subscription. You keep 100% of the alpha you generate.",
    },

    // ── Category 4: Risk & Reality Check ────────────────────────
    {
      id: "drawdowns",
      category: "risk",
      question: "Will my portfolio experience deep losses or drawdowns?",
      answer:
        "Yes. This is a high-alpha, high-volatility momentum strategy. While our \"Cash Filter\" is designed to prevent total ruin during prolonged bear markets, our historical maximum drawdown is -68% (compared to the benchmark's -84%). If you cannot stomach waking up to a 30% to 50% temporary dip in your portfolio value during choppy markets, this strategy is not for you.",
      featuredOnHomepage: true,
    },
    {
      id: "no-guarantees",
      category: "risk",
      question:
        "Is this a guaranteed way to make money since it uses quantitative math?",
      answer:
        "Absolutely not. Past performance—even a stellar 6-year track record—does not guarantee future results. Crypto is inherently unpredictable. You are exposed to Black Swan events, regulatory crackdowns, and exchange risk (e.g., if Binance were to freeze trading). We have built the best systematic engine possible, but you should never connect capital you cannot afford to lose entirely.",
    },
  ],
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    toggleFaq(state, action: PayloadAction<string>) {
      state.openId = state.openId === action.payload ? null : action.payload;
    },
    closeFaq(state) {
      state.openId = null;
    },
  },
});

export const { toggleFaq, closeFaq } = faqSlice.actions;
export default faqSlice.reducer;
