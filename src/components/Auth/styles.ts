import styled, { css } from "styled-components";
import { fadeInUp } from "@/components/ui/animations";

// Re-export shared components used by Auth pages
export {
  PrimaryButton,
  SecondaryButton as GoogleButton,
  Spinner,
  SpinnerLarge,
} from "@/components/ui/Button";
export { Input, Label, FieldGroup, FieldRow, FieldError } from "@/components/ui/Input";
export { PrimaryLink as AuthLink, PrimaryLink as InlineLink } from "@/components/ui/Link";
export { Divider } from "@/components/ui/Typography";
export { Alert } from "@/components/ui/Alert";

// ─────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────

export const AuthPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -300px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 700px;
    background: radial-gradient(
      circle,
      rgba(0, 216, 151, 0.06) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 40px;
  animation: ${fadeInUp} 0.5s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 28px 20px;
  }
`;

export const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

export const AuthLogo = styled.a`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  text-decoration: none;
`;

export const LogoDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
`;

export const AuthTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const AuthSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

// ─────────────────────────────────────────────
// Form
// ─────────────────────────────────────────────

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// ─────────────────────────────────────────────
// Footer links
// ─────────────────────────────────────────────

export const AuthFooter = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ForgotRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -12px;
`;

// ─────────────────────────────────────────────
// Password visibility toggle
// ─────────────────────────────────────────────

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  padding: 4px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

// ─────────────────────────────────────────────
// Theme toggle for auth pages
// ─────────────────────────────────────────────

export const ThemeToggleFloat = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
