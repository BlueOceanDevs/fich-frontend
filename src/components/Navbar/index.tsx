import React from "react";
import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleMobileMenu,
  closeMobileMenu,
  toggleTheme,
} from "@/store/uiSlice";
import { logout } from "@/store/authSlice";
import UserMenu from "./UserMenu";
import {
  Nav,
  NavContainer,
  Logo,
  LogoDot,
  NavLinks,
  NavLink,
  ThemeToggle,
  Hamburger,
  HamburgerLine,
  MobileMenu,
  MobileNavLink,
  RightGroup,
  NavAuthGroup,
  NavLoginButton,
  NavSignupButton,
  MobileAuthGroup,
  MobileLoginButton,
  MobileSignupButton,
} from "./styles";

const NAV_ITEMS = [
  { label: "Cryptos", href: "/#cryptos" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Pricing", href: "/plans" },
  { label: "FAQ", href: "/#faq" },
];

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const themeName = useAppSelector((s) => s.ui.themeName);
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  return (
    <Nav>
      <NavContainer>
        <Logo href="/">
          <LogoDot />
          Fich
        </Logo>

        <NavLinks>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <RightGroup>
          <ThemeToggle
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            {themeName === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
          </ThemeToggle>

          {isAuthenticated ? (
            <NavAuthGroup>
              <UserMenu />
            </NavAuthGroup>
          ) : (
            <NavAuthGroup>
              <Link href="/login" passHref legacyBehavior>
                <NavLoginButton>Log in</NavLoginButton>
              </Link>
              <Link href="/signup" passHref legacyBehavior>
                <NavSignupButton>Sign up</NavSignupButton>
              </Link>
            </NavAuthGroup>
          )}

          <Hamburger
            onClick={() => dispatch(toggleMobileMenu())}
            $open={mobileMenuOpen}
          >
            <HamburgerLine />
            <HamburgerLine />
            <HamburgerLine />
          </Hamburger>
        </RightGroup>
      </NavContainer>

      <MobileMenu $open={mobileMenuOpen}>
        {NAV_ITEMS.map((item) => (
          <MobileNavLink
            key={item.label}
            href={item.href}
            onClick={() => dispatch(closeMobileMenu())}
          >
            {item.label}
          </MobileNavLink>
        ))}

        {isAuthenticated ? (
          <MobileAuthGroup>
            <Link href="/profile" passHref legacyBehavior>
              <MobileLoginButton onClick={() => dispatch(closeMobileMenu())}>
                Profile
              </MobileLoginButton>
            </Link>
            <MobileLoginButton
              onClick={() => {
                dispatch(logout());
                dispatch(closeMobileMenu());
              }}
            >
              Log out
            </MobileLoginButton>
          </MobileAuthGroup>
        ) : (
          <MobileAuthGroup>
            <Link href="/login" passHref legacyBehavior>
              <MobileLoginButton onClick={() => dispatch(closeMobileMenu())}>
                Log in
              </MobileLoginButton>
            </Link>
            <Link href="/signup" passHref legacyBehavior>
              <MobileSignupButton onClick={() => dispatch(closeMobileMenu())}>
                Sign up
              </MobileSignupButton>
            </Link>
          </MobileAuthGroup>
        )}
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
