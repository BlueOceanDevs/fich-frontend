import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaChartPie,
  FaChartLine,
  FaWallet,
  FaHistory,
  FaUserCog,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { clearSubscription } from "@/store/subscriptionSlice";
import { toggleTheme } from "@/store/uiSlice";
import { SpinnerLarge } from "@/components/ui/Button";
import {
  DashboardWrapper,
  Sidebar,
  SidebarHeader,
  SidebarLogo,
  SidebarLogoDot,
  SidebarNav,
  SidebarSection,
  SidebarLink,
  SidebarIcon,
  SidebarFooter,
  SidebarUser,
  SidebarAvatar,
  SidebarUserInfo,
  SidebarUserName,
  SidebarUserEmail,
  MobileOverlay,
  MainContent,
  TopBar,
  TopBarLeft,
  TopBarTitle,
  TopBarRight,
  MobileMenuButton,
  ThemeButton,
  PageContent,
} from "./styles";

interface NavItem {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { key: "overview", label: "Overview", href: "/dashboard", icon: <FaChartPie size={15} /> },
  { key: "portfolio", label: "Portfolio", href: "/dashboard/portfolio", icon: <FaWallet size={15} /> },
  { key: "performance", label: "Performance", href: "/dashboard/performance", icon: <FaChartLine size={15} /> },
  { key: "trades", label: "Trades", href: "/dashboard/trades", icon: <FaHistory size={15} /> },
  { key: "account", label: "Account", href: "/dashboard/account", icon: <FaUserCog size={15} /> },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, hasCheckedAuth, user } = useAppSelector((s) => s.auth);
  const themeName = useAppSelector((s) => s.ui.themeName);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auth guard — redirect unauthenticated users.
  //
  // Gate on hasCheckedAuth: until the bootstrap fetchUser() has resolved,
  // we don't know whether the user is actually logged in or not. Without
  // this gate, every page load would briefly see isAuthenticated=false
  // (the initial state since the auth slice is no longer persisted) and
  // bounce the user to /login before the cookie-backed check completes.
  useEffect(() => {
    if (hasCheckedAuth && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hasCheckedAuth, isAuthenticated, router]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  // While the auth bootstrap is in flight, show a centered spinner
  // instead of a blank page. The bootstrap is typically <300ms but on
  // slow connections can be longer; users seeing a spinner read it as
  // "still loading" rather than "broken / blank page."
  if (!hasCheckedAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SpinnerLarge />
      </div>
    );
  }
  // hasCheckedAuth is true but the answer is "not logged in" — the
  // useEffect above is mid-redirect to /login. Render nothing so we
  // don't paint dashboard chrome for a frame on the way out.
  if (!isAuthenticated) return null;

  // FirstName/LastName were removed from the profile model — the only
  // available presentation sources are now DisplayName (user-provided)
  // and Email (guaranteed). Email is the last-resort fallback so there's
  // always *something* to render in the sidebar greeting.
  const displayName = user?.displayName || user?.email || null;

  const isActive = (href: string) => {
    if (href === "/dashboard") return router.pathname === "/dashboard";
    return router.pathname.startsWith(href);
  };

  const handleLogout = () => {
    dispatch(clearSubscription());
    dispatch(logout());
  };

  return (
    <DashboardWrapper>
      {/* Mobile overlay */}
      <MobileOverlay $open={mobileOpen} onClick={() => setMobileOpen(false)} />

      {/* Sidebar */}
      <Sidebar $mobileOpen={mobileOpen}>
        <SidebarHeader>
          <Link href="/" passHref legacyBehavior>
            <SidebarLogo>
              <SidebarLogoDot />
              Fich
            </SidebarLogo>
          </Link>
        </SidebarHeader>

        <SidebarNav>
          <SidebarSection>Menu</SidebarSection>
          {NAV_ITEMS.map((item) => (
            <Link key={item.key} href={item.href} passHref legacyBehavior>
              <SidebarLink $active={isActive(item.href)}>
                <SidebarIcon>{item.icon}</SidebarIcon>
                {item.label}
              </SidebarLink>
            </Link>
          ))}

          <SidebarSection>Quick Links</SidebarSection>
          <Link href="/" passHref legacyBehavior>
            <SidebarLink>
              <SidebarIcon><FaHome size={15} /></SidebarIcon>
              Home
            </SidebarLink>
          </Link>
        </SidebarNav>

        <SidebarFooter>
          <SidebarUser>
            <SidebarAvatar
              src={user?.imageUrl || "/default-avatar.svg"}
              alt="Avatar"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-avatar.svg";
              }}
            />
            <SidebarUserInfo>
              <SidebarUserName>{displayName || "User"}</SidebarUserName>
              <SidebarUserEmail>{user?.email}</SidebarUserEmail>
            </SidebarUserInfo>
          </SidebarUser>
          <SidebarLink onClick={handleLogout} as="button" style={{ border: "none", width: "100%", textAlign: "left" }}>
            <SidebarIcon><FaSignOutAlt size={15} /></SidebarIcon>
            Log out
          </SidebarLink>
        </SidebarFooter>
      </Sidebar>

      {/* Main content */}
      <MainContent>
        <TopBar>
          <TopBarLeft>
            <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </MobileMenuButton>
            <TopBarTitle>{title}</TopBarTitle>
          </TopBarLeft>
          <TopBarRight>
            <ThemeButton
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle theme"
            >
              {themeName === "dark" ? <FaSun size={14} /> : <FaMoon size={14} />}
            </ThemeButton>
          </TopBarRight>
        </TopBar>

        <PageContent>{children}</PageContent>
      </MainContent>
    </DashboardWrapper>
  );
};

export default DashboardLayout;
