import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo } from "@/api/types";
import { userApi } from "@/api/user";
import { authApi } from "@/api/auth";
import { disableGoogleAutoSelect } from "@/utils/google-identity";

// ─────────────────────────────────────────────
// State
// ─────────────────────────────────────────────

interface AuthState {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /**
   * True after the bootstrap fetchUser() has resolved (success OR fail).
   * Lets protected pages render a loader while the initial auth-check
   * round-trip is in flight, instead of flashing public-mode chrome and
   * then resolving to logged-in (or vice versa). Always starts false on
   * page load — the auth slice is NOT persisted, so this resets every
   * reload.
   */
  hasCheckedAuth: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  hasCheckedAuth: false,
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
      disableGoogleAutoSelect();
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
    updateUser(state, action: PayloadAction<Partial<UserInfo>>) {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },
    clearAuth(state) {
      state.user = null;
      state.isAuthenticated = false;
      // Refresh failed / session expired → we DID check, the answer is
      // "not logged in." Don't reset hasCheckedAuth — that would flash
      // a loader on every protected page after a 401-induced cleanup.
      state.hasCheckedAuth = true;
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
        state.hasCheckedAuth = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.hasCheckedAuth = true;
        state.error = action.payload as string;
      });

    // logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // hasCheckedAuth stays true — we DID check, the user is now confirmed
      // logged out. Resetting to false would cause protected pages to flash
      // their loader unnecessarily after an explicit logout.
      state.error = null;
    });
  },
});

export const { setAuthenticated, setUser, updateUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
