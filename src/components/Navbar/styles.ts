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
