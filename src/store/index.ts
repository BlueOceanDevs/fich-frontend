import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import cryptoReducer from "./cryptoSlice";
import pricingReducer from "./pricingSlice";
import testimonialReducer from "./testimonialSlice";
import faqReducer from "./faqSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    crypto: cryptoReducer,
    pricing: pricingReducer,
    testimonials: testimonialReducer,
    faq: faqReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
