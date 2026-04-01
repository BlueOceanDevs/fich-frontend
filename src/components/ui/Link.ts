import styled from "styled-components";

// ─────────────────────────────────────────────
// Primary Link
// Green colored link with hover color shift
// ─────────────────────────────────────────────

export const PrimaryLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

// ─────────────────────────────────────────────
// Subtle Link
// Green link with opacity hover (for inline/secondary use)
// ─────────────────────────────────────────────

export const SubtleLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

// ─────────────────────────────────────────────
// Muted Link
// Gray link that brightens on hover (footer, nav)
// ─────────────────────────────────────────────

export const MutedLink = styled.a`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

// ─────────────────────────────────────────────
// Nav Link
// For navigation items
// ─────────────────────────────────────────────

export const NavLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 400;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
