import React, { useRef, useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { userApi } from "@/api/user";
import { fetchUser, updateUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CountrySelect from "@/components/ui/CountrySelect";
import {
  Alert,
  AuthForm,
  FieldGroup,
  Input,
  Label,
  PrimaryButton,
  Spinner,
} from "@/components/Auth/styles";
import {
  Card,
  CardTitle,
  AvatarSection,
  AvatarWrapper,
  AvatarImg,
  AvatarOverlay,
  AvatarHint,
  HiddenInput,
  SectionLabel,
} from "./styles";

const AccountCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FirstName/LastName were removed in the profile-model simplification.
  // The editable fields on this card are now DisplayName (free-form) and
  // Country (optional ISO 3166-1 alpha-2 code). Email stays read-only.
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [country, setCountry] = useState(user?.country ?? "");
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName ?? "");
      setCountry(user.country ?? "");
    }
  }, [user]);

  if (!user) return null;

  const handleAvatarClick = () => fileInputRef.current?.click();

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
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const trimmedDisplayName = displayName.trim();
    // Normalize "" → null so the diff below correctly flags a clear.
    const normalizedCountry = country || null;

    const displayNameChanged = trimmedDisplayName !== (user.displayName ?? "");
    const countryChanged = normalizedCountry !== (user.country ?? null);

    if (!displayNameChanged && !countryChanged) {
      setSuccessMsg("No changes to save.");
      return;
    }

    setSaving(true);

    try {
      if (displayNameChanged) {
        await userApi.setDisplayName(trimmedDisplayName);
      }
      if (countryChanged) {
        await userApi.setCountry({ country: normalizedCountry });
      }

      dispatch(
        updateUser({
          displayName: trimmedDisplayName || null,
          country: normalizedCountry,
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
    <Card>
      <CardTitle>Account</CardTitle>

      {successMsg && <Alert $variant="success">{successMsg}</Alert>}
      {errorMsg && <Alert $variant="error">{errorMsg}</Alert>}

      <AvatarSection>
        <AvatarWrapper type="button" onClick={handleAvatarClick}>
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
        <AvatarHint>
          {uploadingAvatar
            ? "Uploading avatar..."
            : "Click to upload a new avatar"}
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

        <SectionLabel>Profile</SectionLabel>

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

        <FieldGroup>
          <Label htmlFor="country">Country (optional)</Label>
          {/* Searchable combobox — see signup.tsx for the rationale.
              Empty string is "Prefer not to say" and normalizes to null
              on the API request inside handleSubmit. */}
          <CountrySelect
            id="country"
            value={country}
            onChange={setCountry}
            autoComplete="country"
          />
        </FieldGroup>

        <PrimaryButton type="submit" disabled={saving} $loading={saving}>
          {saving && <Spinner />}
          {saving ? "Saving..." : "Save changes"}
        </PrimaryButton>
      </AuthForm>
    </Card>
  );
};

export default AccountCard;
