import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaChartPie,
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
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const themeName = useAppSelector((s) => s.ui.themeName);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auth guard — redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  if (!isAuthenticated) return null;

  const displayName =
    user?.displayName ||
    (user?.firstName
      ? `${user.firstName} ${user.lastName ?? ""}`.trim()
      : null);

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
