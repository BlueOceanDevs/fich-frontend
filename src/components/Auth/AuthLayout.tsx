import React from "react";
import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/uiSlice";
import {
  AuthPage,
  AuthCard,
  AuthHeader,
  AuthLogo,
  LogoDot,
  AuthTitle,
  AuthSubtitle,
  ThemeToggleFloat,
} from "./styles";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const dispatch = useAppDispatch();
  const themeName = useAppSelector((s) => s.ui.themeName);

  return (
    <AuthPage>
      <ThemeToggleFloat onClick={() => dispatch(toggleTheme())}>
        {themeName === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
      </ThemeToggleFloat>

      <AuthCard>
        <AuthHeader>
          <Link href="/" passHref legacyBehavior>
            <AuthLogo>
              <LogoDot />
              Fich
            </AuthLogo>
          </Link>
          <AuthTitle>{title}</AuthTitle>
          <AuthSubtitle>{subtitle}</AuthSubtitle>
        </AuthHeader>

        {children}
      </AuthCard>
    </AuthPage>
  );
};

export default AuthLayout;
