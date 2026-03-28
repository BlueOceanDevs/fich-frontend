import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/authSlice";
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

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName =
    user?.displayName || user?.firstName
      ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
      : null;

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

            <DropdownDivider />

            <DropdownItem
              onClick={() => {
                setOpen(false);
                dispatch(logout());
              }}
              $danger
            >
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
