import styled, { keyframes, css } from "styled-components";

// ─────────────────────────────────────────────
// Animations
// ─────────────────────────────────────────────

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

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

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldRow = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }

  & > ${FieldGroup} {
    flex: 1;
  }
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError
          ? `${theme.colors.danger}20`
          : `${theme.colors.primary}20`};
  }
`;

export const FieldError = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

// ─────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────

export const PrimaryButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  height: 46px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 15px;
  font-weight: 600;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: 0 4px 20px ${({ theme }) => theme.colors.primary}40;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      pointer-events: none;
    `}
`;

export const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const GoogleButton = styled.button`
  width: 100%;
  height: 46px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textMuted};
    background: ${({ theme }) => theme.colors.card};
  }
`;

// ─────────────────────────────────────────────
// Divider
// ─────────────────────────────────────────────

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 4px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.divider};
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
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

export const AuthLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const InlineLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const ForgotRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -12px;
`;

// ─────────────────────────────────────────────
// Alert
// ─────────────────────────────────────────────

export const Alert = styled.div<{ $variant?: "error" | "success" }>`
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 13px;
  line-height: 1.5;

  ${({ theme, $variant = "error" }) =>
    $variant === "error"
      ? css`
          background: ${theme.colors.danger}15;
          border: 1px solid ${theme.colors.danger}30;
          color: ${theme.colors.danger};
        `
      : css`
          background: ${theme.colors.success}15;
          border: 1px solid ${theme.colors.success}30;
          color: ${theme.colors.success};
        `}
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

// ─────────────────────────────────────────────
// Large spinner (confirm-email page)
// ─────────────────────────────────────────────

export const SpinnerLarge = styled.span`
  display: block;
  width: 32px;
  height: 32px;
  margin: 20px auto;
  border: 3px solid transparent;
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;
