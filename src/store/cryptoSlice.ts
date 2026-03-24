import { createSlice } from "@reduxjs/toolkit";

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  changePositive: boolean;
  color: string;
  icon: string;
}

interface CryptoState {
  assets: CryptoAsset[];
}

const initialState: CryptoState = {
  assets: [
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      price: "$97,524.64",
      change: "+2.41%",
      changePositive: true,
      color: "#F7931A",
      icon: "₿",
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,421.18",
      change: "+1.87%",
      changePositive: true,
      color: "#627EEA",
      icon: "Ξ",
    },
    {
      id: "3",
      name: "Solana",
      symbol: "SOL",
      price: "$198.42",
      change: "+5.23%",
      changePositive: true,
      color: "#9945FF",
      icon: "◎",
    },
    {
      id: "4",
      name: "Cardano",
      symbol: "ADA",
      price: "$0.98",
      change: "-0.54%",
      changePositive: false,
      color: "#0033AD",
      icon: "₳",
    },
    {
      id: "5",
      name: "Ripple",
      symbol: "XRP",
      price: "$2.31",
      change: "+3.12%",
      changePositive: true,
      color: "#00AAE4",
      icon: "✕",
    },
    {
      id: "6",
      name: "Polkadot",
      symbol: "DOT",
      price: "$7.84",
      change: "+1.05%",
      changePositive: true,
      color: "#E6007A",
      icon: "●",
    },
  ],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
});

export default cryptoSlice.reducer;
