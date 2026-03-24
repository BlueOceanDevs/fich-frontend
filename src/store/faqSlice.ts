import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqState {
  openId: string | null;
  items: FaqItem[];
}

const initialState: FaqState = {
  openId: null,
  items: [
    {
      id: "1",
      question: "What is Fich?",
      answer:
        "Fich is a secure, fast, and intuitive cryptocurrency trading platform that allows you to buy, sell, and manage digital assets with ease. We support 50+ cryptocurrencies with competitive fees.",
    },
    {
      id: "2",
      question: "Is Fich secure?",
      answer:
        "Yes, Fich employs industry-leading security measures including cold storage, two-factor authentication, encryption protocols, and regular security audits to protect your assets.",
    },
    {
      id: "3",
      question: "Which cryptocurrencies are supported?",
      answer:
        "Fich supports over 50 cryptocurrencies including Bitcoin, Ethereum, Solana, Cardano, Ripple, Polkadot, and many more. We continuously add new assets based on market demand.",
    },
    {
      id: "4",
      question: "What are the fees for transactions?",
      answer:
        "Fees vary based on your plan. Free users pay standard rates, Pro users get reduced fees at 0.4% per trade, and Business users enjoy custom pricing for high-volume trading.",
    },
    {
      id: "5",
      question: "How fast are transactions?",
      answer:
        "Transactions on Fich are processed in real-time. Most trades are executed within milliseconds, ensuring you never miss a market opportunity.",
    },
    {
      id: "6",
      question: "Do I need to verify my identity?",
      answer:
        "Yes, identity verification (KYC) is required to comply with regulations and to ensure the safety of all users on the platform. The process is quick and straightforward.",
    },
    {
      id: "7",
      question: "Can I access Fich on mobile?",
      answer:
        "Absolutely! Fich is fully responsive and works on all devices. We also have dedicated mobile apps for both iOS and Android platforms.",
    },
    {
      id: "8",
      question: "How can I contact support?",
      answer:
        "You can reach our support team via email, live chat, or through our help center. Pro and Business users enjoy priority support with 24/7 response times.",
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
  },
});

export const { toggleFaq } = faqSlice.actions;
export default faqSlice.reducer;
