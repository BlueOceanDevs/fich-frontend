import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FaUser, FaSignOutAlt, FaCrown } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { fetchSubscription, clearSubscription } from "@/store/subscriptionSlice";
import {
  UserAvatarButton,
  AvatarImage,
  DropdownOverlay,
  DropdownMenu,
  DropdownHeader,
  DropdownEmail,
  DropdownDivider,
  DropdownItem,
  DropdownItemIcon,
} from "./styles";

const PlanBadge = styled.span`
  display: inline-block;
  margin-top: 6px;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(0, 216, 151, 0.12);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 11px;
  font-weight: 600;
`;

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { subscription } = useAppSelector((s) => s.subscription);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hasFetchedSub = useRef(false);

  const displayName =
    user?.displayName || user?.firstName
      ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
      : null;

  // Fetch subscription once when menu component mounts (user is logged in)
  useEffect(() => {
    if (user && !hasFetchedSub.current) {
      hasFetchedSub.current = true;
      dispatch(fetchSubscription());
    }
  }, [user, dispatch]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    dispatch(clearSubscription());
    dispatch(logout());
  };

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <UserAvatarButton
        onClick={() => setOpen((prev) => !prev)}
        aria-label="User menu"
      >
        <AvatarImage
          src={user?.imageUrl || "/default-avatar.svg"}
          alt="Profile"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-avatar.svg";
          }}
        />
      </UserAvatarButton>

      {open && (
        <>
          <DropdownOverlay onClick={() => setOpen(false)} />
          <DropdownMenu>
            <DropdownHeader>
              {displayName && <strong>{displayName}</strong>}
              <DropdownEmail>{user?.email}</DropdownEmail>
              {subscription?.isActive && (
                <PlanBadge>
                  {subscription.planTier} Plan
                  {subscription.isTrial && " (Trial)"}
                </PlanBadge>
              )}
            </DropdownHeader>

            <DropdownDivider />

            <Link href="/profile" passHref legacyBehavior>
              <DropdownItem
                as="a"
                onClick={() => setOpen(false)}
              >
                <DropdownItemIcon>
                  <FaUser size={14} />
                </DropdownItemIcon>
                Profile
              </DropdownItem>
            </Link>

            <Link href="/plans" passHref legacyBehavior>
              <DropdownItem
                as="a"
                onClick={() => setOpen(false)}
              >
                <DropdownItemIcon>
                  <FaCrown size={14} />
                </DropdownItemIcon>
                {subscription?.isActive ? "Manage Plan" : "Upgrade Plan"}
              </DropdownItem>
            </Link>

            <DropdownDivider />

            <DropdownItem onClick={handleLogout} $danger>
              <DropdownItemIcon>
                <FaSignOutAlt size={14} />
              </DropdownItemIcon>
              Log out
            </DropdownItem>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

export default UserMenu;
