import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeName } from "@/styles/theme";

interface UiState {
  mobileMenuOpen: boolean;
  activeSection: string;
  themeName: ThemeName;
}

const initialState: UiState = {
  mobileMenuOpen: false,
  activeSection: "hero",
  themeName: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
    setTheme(state, action: PayloadAction<ThemeName>) {
      state.themeName = action.payload;
    },
    toggleTheme(state) {
      state.themeName = state.themeName === "dark" ? "light" : "dark";
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  setActiveSection,
  setTheme,
  toggleTheme,
} = uiSlice.actions;
export default uiSlice.reducer;
