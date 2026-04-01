import styled, { css } from "styled-components";
import { spin } from "./animations";

// ─────────────────────────────────────────────
// Primary Button
// Full-width form button (login, signup, etc.)
// ─────────────────────────────────────────────

export const PrimaryButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  height: 46px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
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

// ─────────────────────────────────────────────
// CTA Button
// Inline pill-shaped button used in hero/CTA sections
// ─────────────────────────────────────────────

export const CTAButton = styled.a`
  display: inline-block;
  padding: 14px 32px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 216, 151, 0.3);
  }
`;

// ─────────────────────────────────────────────
// Secondary Button
// Outline style with background on hover
// ─────────────────────────────────────────────

export const SecondaryButton = styled.button`
  width: 100%;
  height: 46px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
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
// Pill Button
// Small pill-shaped button for nav/inline use
// ─────────────────────────────────────────────

export const PillButton = styled.a`
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}40;
  }
`;

// ─────────────────────────────────────────────
// Ghost Button
// Text-only button with hover color change
// ─────────────────────────────────────────────

export const GhostButton = styled.a`
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

// ─────────────────────────────────────────────
// Spinner
// ─────────────────────────────────────────────

export const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

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
