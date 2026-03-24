import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMobileMenu, closeMobileMenu, toggleTheme } from "@/store/uiSlice";
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
} from "./styles";

const NAV_ITEMS = [
  { label: "Cryptos", href: "#cryptos" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const themeName = useAppSelector((s) => s.ui.themeName);

  return (
    <Nav>
      <NavContainer>
        <Logo href="#">
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
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
