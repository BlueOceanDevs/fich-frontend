import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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

// Public navigation. Performance and FAQ get their own dedicated
// pages (FAQ landed its full version after the homepage preview was
// trimmed to 4 questions); Pricing remains an anchor into the
// homepage's pricing section. Contact Us points to /contact.
// `external: true` items are off-app URLs (e.g. Research lives on a
// subdomain) — they render with target="_blank" + rel="noopener".
//
// Note: the "Crypto Performance" label expands on the previous plain
// "Performance" — the page shows Fich's historical crypto-trading
// track record, and the more specific label both helps SEO and
// distinguishes the public marketing surface from the logged-in
// dashboard's "Performance" tab (which shows the *user's own* trading
// stats, not Fich's aggregate).
const NAV_ITEMS: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Crypto Performance", href: "/performance" },
  { label: "Research", href: "https://research.fich.ai/", external: true },
  // WAITLIST MODE — Pricing nav item hidden. Restore when plans launch.
  // { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

/**
 * Whether a nav item should render as "current page".
 *
 *  - Home (`/`)            → only when pathname is exactly "/"
 *  - Hash-anchor items     → never (they live on the homepage; marking
 *                            them active would double up with Home).
 *  - Everything else       → pathname equals href, OR pathname starts
 *                            with `href + "/"` so nested routes
 *                            (e.g. `/performance/details`) still
 *                            highlight the parent tab.
 */
function isItemActive(href: string, pathname: string): boolean {
  if (href.startsWith("/#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const themeName = useAppSelector((s) => s.ui.themeName);
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  return (
    <Nav>
      <NavContainer>
        <Logo href="/">fich</Logo>

        <NavLinks>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              $active={isItemActive(item.href, router.pathname)}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
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
            $active={isItemActive(item.href, router.pathname)}
            onClick={() => dispatch(closeMobileMenu())}
            {...(item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {item.label}
          </MobileNavLink>
        ))}

        {isAuthenticated ? (
          <MobileAuthGroup>
            <Link href="/dashboard" passHref legacyBehavior>
              <MobileLoginButton onClick={() => dispatch(closeMobileMenu())}>
                Dashboard
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
