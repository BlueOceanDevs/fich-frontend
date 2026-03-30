import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { SubscriptionDto } from "@/api/types";
import { subscriptionsApi } from "@/api/subscriptions";

interface SubscriptionState {
  subscription: SubscriptionDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscription: null,
  isLoading: false,
  error: null,
};

export const fetchSubscription = createAsyncThunk(
  "subscription/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await subscriptionsApi.getMySubscription();
      if (data.isSuccess && data.data) {
        return data.data;
      }
      return rejectWithValue("No active subscription");
    } catch {
      return rejectWithValue("Failed to fetch subscription");
    }
  }
);

export const activateFreePlan = createAsyncThunk(
  "subscription/activateFree",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await subscriptionsApi.activateFree();
      if (data.isSuccess && data.data) {
        return data.data;
      }
      return rejectWithValue(data.errors?.[0] ?? "Failed to activate free plan");
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errors?.[0] ?? "Failed to activate free plan"
      );
    }
  }
);

export const startTrial = createAsyncThunk(
  "subscription/startTrial",
  async (planId: number, { rejectWithValue }) => {
    try {
      const { data } = await subscriptionsApi.startTrial({ planId });
      if (data.isSuccess && data.data) {
        return data.data;
      }
      return rejectWithValue(data.errors?.[0] ?? "Failed to start trial");
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errors?.[0] ?? "Failed to start trial"
      );
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    clearSubscription(state) {
      state.subscription = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchSubscription
    builder
      .addCase(fetchSubscription.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subscription = action.payload;
      })
      .addCase(fetchSubscription.rejected, (state) => {
        state.isLoading = false;
        state.subscription = null;
      });

    // activateFreePlan
    builder
      .addCase(activateFreePlan.fulfilled, (state, action) => {
        state.subscription = action.payload;
      });

    // startTrial
    builder
      .addCase(startTrial.fulfilled, (state, action) => {
        state.subscription = action.payload;
      });
  },
});

export const { clearSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
