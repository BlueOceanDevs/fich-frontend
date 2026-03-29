import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaCamera } from "react-icons/fa";
import styled from "styled-components";
import { userApi } from "@/api/user";
import Layout from "@/components/Layout";
import {
  Alert,
  AuthForm,
  FieldError,
  FieldGroup,
  FieldRow,
  Input,
  Label,
  PrimaryButton,
  Spinner,
} from "@/components/Auth/styles";
import { fetchUser, updateUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const ProfileSection = styled.section`
  padding: 128px 24px 88px;
  background:
    radial-gradient(
      circle at top,
      ${({ theme }) => `${theme.colors.primary}14`} 0%,
      transparent 34%
    ),
    ${({ theme }) => theme.colors.background};
`;

const ProfileContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  max-width: 640px;
  margin-bottom: 28px;
`;

const ProfileTitle = styled.h1`
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

const ProfileSubtitle = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 760px;
  padding: 32px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 24px 80px ${({ theme }) => `${theme.colors.background}40`};
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px 18px;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-bottom: 6px;
`;

const AvatarWrapper = styled.button`
  position: relative;
  width: 88px;
  height: 88px;
  padding: 0;
  border: none;
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

const AvatarHint = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HiddenInput = styled.input`
  display: none;
`;

const SectionLabel = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 6px 0 -8px;
`;

function trimOrEmpty(value: string) {
  return value.trim();
}

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setDisplayName(user.displayName ?? "");
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const clearFieldError = (field: "firstName" | "lastName") => {
    setErrors((prev) => {
      if (!prev[field]) return prev;

      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

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
      dispatch(fetchUser());
      setSuccessMsg("Avatar updated successfully.");
    } catch (err: any) {
      setErrorMsg(
        err.message ||
          err.response?.data?.errors?.[0] ||
          "Failed to upload avatar."
      );
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setErrors({});

    const trimmedFirstName = trimOrEmpty(firstName);
    const trimmedLastName = trimOrEmpty(lastName);
    const trimmedDisplayName = trimOrEmpty(displayName);

    const newErrors: Record<string, string> = {};
    if (trimmedFirstName && trimmedFirstName.length < 2) {
      newErrors.firstName = "Must be at least 2 characters";
    }
    if (trimmedLastName && trimmedLastName.length < 2) {
      newErrors.lastName = "Must be at least 2 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const nameChanged =
      trimmedFirstName !== (user.firstName ?? "") ||
      trimmedLastName !== (user.lastName ?? "");
    const displayNameChanged = trimmedDisplayName !== (user.displayName ?? "");

    if (!nameChanged && !displayNameChanged) {
      setSuccessMsg("No changes to save.");
      return;
    }

    setSaving(true);

    try {
      if (nameChanged) {
        await userApi.setName({
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
        });
      }

      if (displayNameChanged) {
        await userApi.setDisplayName(trimmedDisplayName);
      }

      dispatch(
        updateUser({
          firstName: trimmedFirstName || null,
          lastName: trimmedLastName || null,
          displayName: trimmedDisplayName || null,
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

      <Layout>
        <ProfileSection>
          <ProfileContainer>
            <ProfileHeader>
              <ProfileTitle>Your profile</ProfileTitle>
              <ProfileSubtitle>
                Manage your account information, update your avatar, and keep
                your public profile details current.
              </ProfileSubtitle>
            </ProfileHeader>

            <ProfileCard>
              {successMsg && <Alert $variant="success">{successMsg}</Alert>}
              {errorMsg && <Alert $variant="error">{errorMsg}</Alert>}

              <AvatarSection>
                <AvatarWrapper type="button" onClick={handleAvatarClick}>
                  <AvatarImg
                    src={user.imageUrl || "/default-avatar.svg"}
                    alt="Avatar"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/default-avatar.svg";
                    }}
                  />
                  <AvatarOverlay>
                    <FaCamera size={20} />
                  </AvatarOverlay>
                </AvatarWrapper>

                <AvatarHint>
                  {uploadingAvatar
                    ? "Uploading avatar..."
                    : "Click the image to upload a new avatar"}
                </AvatarHint>

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
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    autoComplete="email"
                  />
                </FieldGroup>

                <SectionLabel>Name</SectionLabel>

                <FieldRow>
                  <FieldGroup>
                    <Label htmlFor="firstName">First name (optional)</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        clearFieldError("firstName");
                      }}
                      $hasError={!!errors.firstName}
                      autoComplete="given-name"
                    />
                    {errors.firstName && (
                      <FieldError>{errors.firstName}</FieldError>
                    )}
                  </FieldGroup>

                  <FieldGroup>
                    <Label htmlFor="lastName">Last name (optional)</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        clearFieldError("lastName");
                      }}
                      $hasError={!!errors.lastName}
                      autoComplete="family-name"
                    />
                    {errors.lastName && (
                      <FieldError>{errors.lastName}</FieldError>
                    )}
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
                    autoComplete="nickname"
                  />
                </FieldGroup>

                <PrimaryButton type="submit" disabled={saving} $loading={saving}>
                  {saving && <Spinner />}
                  {saving ? "Saving..." : "Save changes"}
                </PrimaryButton>
              </AuthForm>
            </ProfileCard>
          </ProfileContainer>
        </ProfileSection>
      </Layout>
    </>
  );
}
