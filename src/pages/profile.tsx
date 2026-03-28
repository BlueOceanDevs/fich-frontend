import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaCamera } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUser, updateUser } from "@/store/authSlice";
import { userApi } from "@/api/user";
import AuthLayout from "@/components/Auth/AuthLayout";
import {
  AuthForm,
  FieldGroup,
  FieldRow,
  Label,
  Input,
  FieldError,
  PrimaryButton,
  Spinner,
  Alert,
} from "@/components/Auth/styles";
import styled from "styled-components";

// ─────────────────────────────────────────────
// Profile-specific styles
// ─────────────────────────────────────────────

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover > div {
    opacity: 1;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: #fff;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SectionLabel = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: -8px;
  margin-top: 8px;
`;

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Sync form when user data loads
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setDisplayName(user.displayName ?? "");
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await userApi.setAvatarImage(file);
      // Refetch user to get updated imageUrl
      dispatch(fetchUser());
      setSuccessMsg("Avatar updated successfully.");
    } catch (err: any) {
      setErrorMsg(
        err.message || err.response?.data?.errors?.[0] || "Failed to upload avatar."
      );
    } finally {
      setUploadingAvatar(false);
      // Reset file input so the same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      // Update name
      await userApi.setName({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      // Update display name if changed
      if (displayName.trim() !== (user.displayName ?? "")) {
        await userApi.setDisplayName(displayName.trim());
      }

      // Optimistically update Redux
      dispatch(
        updateUser({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          displayName: displayName.trim() || null,
        })
      );

      setSuccessMsg("Profile updated successfully.");
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.errors?.[0] || "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Head>
        <title>Profile - Fich</title>
      </Head>
      <AuthLayout title="Your Profile" subtitle="Manage your account information">
        {successMsg && <Alert $variant="success">{successMsg}</Alert>}
        {errorMsg && <Alert $variant="error">{errorMsg}</Alert>}

        <AvatarSection>
          <AvatarWrapper onClick={handleAvatarClick}>
            <AvatarImg
              src={user.imageUrl || "/default-avatar.svg"}
              alt="Avatar"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-avatar.svg";
              }}
            />
            <AvatarOverlay>
              <FaCamera size={20} />
            </AvatarOverlay>
          </AvatarWrapper>
          {uploadingAvatar && (
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              Uploading...
            </span>
          )}
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleAvatarChange}
          />
        </AvatarSection>

        <AuthForm onSubmit={handleSubmit}>
          <FieldGroup>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user.email} disabled />
          </FieldGroup>

          <SectionLabel>Name</SectionLabel>

          <FieldRow>
            <FieldGroup>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                $hasError={!!errors.firstName}
              />
              {errors.firstName && <FieldError>{errors.firstName}</FieldError>}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                $hasError={!!errors.lastName}
              />
              {errors.lastName && <FieldError>{errors.lastName}</FieldError>}
            </FieldGroup>
          </FieldRow>

          <FieldGroup>
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="Display name (optional)"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </FieldGroup>

          <PrimaryButton type="submit" disabled={saving} $loading={saving}>
            {saving && <Spinner />}
            {saving ? "Saving..." : "Save changes"}
          </PrimaryButton>
        </AuthForm>
      </AuthLayout>
    </>
  );
}
