import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.navBg};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const NavContainer = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.a`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: inline-block;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const NavLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s;
  font-weight: 400;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ThemeToggle = styled.button`
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

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Hamburger = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  padding: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }

  span:nth-child(1) {
    transform: ${({ $open }) =>
      $open ? "rotate(45deg) translateY(7px)" : "none"};
  }
  span:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }
  span:nth-child(3) {
    transform: ${({ $open }) =>
      $open ? "rotate(-45deg) translateY(-7px)" : "none"};
  }
`;

export const HamburgerLine = styled.span`
  width: 24px;
  height: 2px;
  background: ${({ theme }) => theme.colors.text};
  transition: all 0.3s;
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: ${({ $open }) => ($open ? "24px" : "0 24px")};
    max-height: ${({ $open }) => ($open ? "400px" : "0")};
    overflow: hidden;
    transition: all 0.3s ease;
    background: ${({ theme }) => theme.colors.navBg};
    backdrop-filter: blur(20px);
    border-bottom: ${({ $open, theme }) =>
      $open ? `1px solid ${theme.colors.divider}` : "none"};
  }
`;

export const MobileNavLink = styled.a`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const NavAuthGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const NavLoginButton = styled.a`
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const NavSignupButton = styled.a`
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: background 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const MobileAuthGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const MobileLoginButton = styled.a`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const MobileSignupButton = styled.a`
  padding: 10px 32px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}30;
  }
`;

// ─────────────────────────────────────────────
// User menu dropdown
// ─────────────────────────────────────────────

export const UserAvatarButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: box-shadow 0.2s;
  padding: 0;
  border: none;

  &:hover {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}30;
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarInitials = styled.span`
  color: ${({ theme }) => theme.colors.background};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const DropdownOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow: hidden;
`;

export const DropdownHeader = styled.div`
  padding: 14px 16px;

  strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 2px;
  }
`;

export const DropdownEmail = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.divider};
`;

export const DropdownItem = styled.div<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.danger : theme.colors.text};
  cursor: pointer;
  transition: background 0.15s;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

export const DropdownItemIcon = styled.span`
  display: flex;
  align-items: center;
  color: inherit;
  opacity: 0.7;
`;
