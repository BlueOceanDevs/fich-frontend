import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo } from "@/api/types";
import { userApi } from "@/api/user";
import { authApi } from "@/api/auth";

// ─────────────────────────────────────────────
// State
// ─────────────────────────────────────────────

interface AuthState {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// ─────────────────────────────────────────────
// Async thunks
// ─────────────────────────────────────────────

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getUserInfo();
      if (data.isSuccess && data.data) {
        return data.data;
      }
      return rejectWithValue("Failed to fetch user info");
    } catch {
      return rejectWithValue("Failed to fetch user info");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
    } catch {
      return rejectWithValue("Logout failed");
    }
  }
);

// ─────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /** Call after a successful login/register to mark authenticated before fetching full user */
    setAuthenticated(state) {
      state.isAuthenticated = true;
      state.error = null;
    },
    setUser(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearAuth(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchUser
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { setAuthenticated, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
