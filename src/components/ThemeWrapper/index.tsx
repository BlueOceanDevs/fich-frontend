import React from "react";
import { ThemeProvider } from "styled-components";
import { useAppSelector } from "@/store/hooks";
import { themes } from "@/styles/theme";
import GlobalStyles from "@/styles/GlobalStyles";

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const themeName = useAppSelector((s) => s.ui.themeName);
  const currentTheme = themes[themeName];

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
