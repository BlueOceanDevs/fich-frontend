export const baseTheme = {
  fonts: {
    primary:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  maxWidth: "1200px",
  borderRadius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    background: "#08080C",
    backgroundLight: "#111118",
    card: "#14141C",
    cardBorder: "#1E1E28",
    primary: "#00D897",
    primaryHover: "#00C085",
    primaryDark: "#00B377",
    text: "#FFFFFF",
    textSecondary: "#8A8A9A",
    textMuted: "#5A5A6A",
    accent: "#627EEA",
    danger: "#FF4D4D",
    success: "#00D897",
    warning: "#F7931A",
    divider: "#1A1A24",
    navBg: "rgba(8, 8, 12, 0.85)",
  },
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    background: "#FFFFFF",
    backgroundLight: "#F5F5F7",
    card: "#FFFFFF",
    cardBorder: "#E2E2EA",
    primary: "#00B377",
    primaryHover: "#009966",
    primaryDark: "#008055",
    text: "#111118",
    textSecondary: "#5A5A6A",
    textMuted: "#8A8A9A",
    accent: "#627EEA",
    danger: "#E53E3E",
    success: "#00B377",
    warning: "#E8920A",
    divider: "#E2E2EA",
    navBg: "rgba(255, 255, 255, 0.85)",
  },
};

export type ThemeType = typeof darkTheme;

export const themes = { dark: darkTheme, light: lightTheme } as const;
export type ThemeName = keyof typeof themes;
