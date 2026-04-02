import React, { useRef, useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { userApi } from "@/api/user";
import { fetchUser, updateUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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

function trimOrEmpty(value: string) {
  return value.trim();
}

const AccountCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
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

  if (!user) return null;

  const clearFieldError = (field: "firstName" | "lastName") => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

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
    setErrors({});

    const trimmedFirstName = trimOrEmpty(firstName);
    const trimmedLastName = trimOrEmpty(lastName);
    const trimmedDisplayName = trimOrEmpty(displayName);

    const newErrors: Record<string, string> = {};
    if (trimmedFirstName && trimmedFirstName.length < 2)
      newErrors.firstName = "Must be at least 2 characters";
    if (trimmedLastName && trimmedLastName.length < 2)
      newErrors.lastName = "Must be at least 2 characters";

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

        <SectionLabel>Name</SectionLabel>

        <FieldRow>
          <FieldGroup>
            <Label htmlFor="firstName">First name</Label>
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
            <Label htmlFor="lastName">Last name</Label>
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
    </Card>
  );
};

export default AccountCard;
