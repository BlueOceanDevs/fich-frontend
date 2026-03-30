import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import uiReducer from "./uiSlice";
import cryptoReducer from "./cryptoSlice";
import pricingReducer from "./pricingSlice";
import testimonialReducer from "./testimonialSlice";
import faqReducer from "./faqSlice";
import authReducer from "./authSlice";
import subscriptionReducer from "./subscriptionSlice";

// ─────────────────────────────────────────────
// Root reducer
// ─────────────────────────────────────────────

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  crypto: cryptoReducer,
  pricing: pricingReducer,
  testimonials: testimonialReducer,
  faq: faqReducer,
  subscription: subscriptionReducer,
});

// ─────────────────────────────────────────────
// Persist config
// ─────────────────────────────────────────────

const persistConfig = {
  key: "fich",
  version: 1,
  storage,
  whitelist: ["auth", "ui"], // only persist auth & ui (theme preference)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches non-serializable actions — ignore them
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
