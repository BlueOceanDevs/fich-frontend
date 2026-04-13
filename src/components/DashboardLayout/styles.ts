import styled, { css } from "styled-components";

// ── Wrapper ──

export const DashboardWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

// ── Sidebar ──

export const Sidebar = styled.aside<{ $mobileOpen?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background: ${({ theme }) => theme.colors.card};
  border-right: 1px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform 0.25s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    transform: ${({ $mobileOpen }) =>
      $mobileOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 20px 28px;
`;

export const SidebarLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  cursor: pointer;
`;

export const SidebarLogoDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 12px;
  flex: 1;
`;

export const SidebarSection = styled.div`
  margin-top: 24px;
  margin-bottom: 8px;
  padding: 0 8px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SidebarLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;

  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.colors.text};
      background: ${theme.colors.primary}14;

      svg {
        color: ${theme.colors.primary};
      }
    `}

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => `${theme.colors.primary}0C`};
  }
`;

export const SidebarIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  flex-shrink: 0;
  color: inherit;
`;

export const SidebarFooter = styled.div`
  padding: 16px 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// ── Mobile overlay ──

export const MobileOverlay = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
`;

// ── Main content area ──

export const MainContent = styled.main`
  margin-left: 240px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

// ── Top bar ──

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.background};
  position: sticky;
  top: 0;
  z-index: 50;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 12px 16px;
  }
`;

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TopBarTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

export const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// ── Page content wrapper ──

export const PageContent = styled.div`
  padding: 32px;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px 16px;
  }
`;

// ── User section in sidebar ──

export const SidebarUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: default;
`;

export const SidebarAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.cardBorder};
`;

export const SidebarUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const SidebarUserName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SidebarUserEmail = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
