import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  FaCamera,
  FaCrown,
  FaExternalLinkAlt,
  FaExchangeAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import styled from "styled-components";
import { userApi } from "@/api/user";
import { exchangeApi } from "@/api/exchange";
import { ordersApi } from "@/api/orders";
import Layout from "@/components/Layout";
import EmailConfirmationBanner from "@/components/EmailConfirmationBanner";
import ConnectExchangeModal from "@/components/Setup/ConnectExchangeModal";
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
import { fetchSubscription } from "@/store/subscriptionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { OrderDto, ExchangeConnectionDto, OnboardingStatusDto } from "@/api/types";

// ─────────────────────────────────────────────
// Styled components
// ─────────────────────────────────────────────

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

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
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

const FullWidthCard = styled(Card)`
  grid-column: 1 / -1;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;
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

// ── Subscription card ──

const SubInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SubRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const SubLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SubValue = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const PlanBadge = styled.span<{ $tier: string }>`
  display: inline-block;
  padding: 4px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 13px;
  font-weight: 600;
  background: ${({ $tier }) =>
    $tier === "Enterprise"
      ? "rgba(139, 92, 246, 0.15)"
      : $tier === "Pro"
        ? "rgba(0, 216, 151, 0.15)"
        : "rgba(100, 116, 139, 0.15)"};
  color: ${({ $tier }) =>
    $tier === "Enterprise"
      ? "#8b5cf6"
      : $tier === "Pro"
        ? "#00d897"
        : "#94a3b8"};
`;

const UpgradeLink = styled.a`
  display: inline-block;
  margin-top: 4px;
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

// ── Orders table ──

const OrdersTable = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 12px;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  white-space: nowrap;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 12px;
  font-weight: 500;
  background: ${({ $status }) => {
    switch ($status) {
      case "Finished":
        return "rgba(0, 216, 151, 0.15)";
      case "Waiting":
      case "Confirming":
      case "Confirmed":
      case "Sending":
        return "rgba(234, 179, 8, 0.15)";
      case "Failed":
      case "Expired":
      case "Refunded":
        return "rgba(239, 68, 68, 0.12)";
      default:
        return "rgba(100, 116, 139, 0.15)";
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case "Finished":
        return "#00d897";
      case "Waiting":
      case "Confirming":
      case "Confirmed":
      case "Sending":
        return "#eab308";
      case "Failed":
      case "Expired":
      case "Refunded":
        return "#ef4444";
      default:
        return "#94a3b8";
    }
  }};
`;

const InvoiceLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyState = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  padding: 24px 0;
`;

// ── Setup banner ──

const SetupBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 24px;
  margin-bottom: 24px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => `${theme.colors.primary}18`} 0%,
    ${({ theme }) => `${theme.colors.primary}08`} 100%
  );
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const SetupBannerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SetupBannerTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const SetupBannerHint = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SetupBannerButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

// ── Exchange card ──

const ExchangeStatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ExchangeIcon = styled.div<{ $status: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: ${({ $status }) =>
    $status === "Active"
      ? "rgba(0, 216, 151, 0.12)"
      : $status === "Pending"
        ? "rgba(234, 179, 8, 0.12)"
        : $status === "Invalid"
          ? "rgba(239, 68, 68, 0.10)"
          : "rgba(100, 116, 139, 0.10)"};
  color: ${({ $status }) =>
    $status === "Active"
      ? "#00d897"
      : $status === "Pending"
        ? "#eab308"
        : $status === "Invalid"
          ? "#ef4444"
          : "#94a3b8"};
`;

const ExchangeInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ExchangeName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ExchangeStatusText = styled.span<{ $status: string }>`
  font-size: 13px;
  color: ${({ $status }) =>
    $status === "Active"
      ? "#00d897"
      : $status === "Pending"
        ? "#eab308"
        : $status === "Invalid"
          ? "#ef4444"
          : "#94a3b8"};
`;

const ExchangeDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => `${theme.colors.background}80`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 13px;
`;

const ExchangeDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExchangeDetailLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ExchangeDetailValue = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const ExchangeError = styled.div`
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.15);
  font-size: 13px;
  color: #ef4444;
  line-height: 1.5;
`;

const ExchangeActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ExchangeActionBtn = styled.button<{ $variant?: "danger" }>`
  padding: 8px 18px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid
    ${({ $variant, theme }) =>
      $variant === "danger" ? "rgba(239, 68, 68, 0.3)" : theme.colors.primary};
  background: ${({ $variant, theme }) =>
    $variant === "danger" ? "transparent" : theme.colors.primary};
  color: ${({ $variant, theme }) =>
    $variant === "danger" ? "#ef4444" : theme.colors.background};

  &:hover {
    background: ${({ $variant, theme }) =>
      $variant === "danger" ? "rgba(239, 68, 68, 0.1)" : theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────

function trimOrEmpty(value: string) {
  return value.trim();
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function daysUntil(dateStr: string): string {
  const end = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "Expired";
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day";
  return `${diff} days`;
}

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const { subscription } = useAppSelector((s) => s.subscription);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Orders
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Exchange connection
  const [exchange, setExchange] = useState<ExchangeConnectionDto | null>(null);
  const [exchangeLoading, setExchangeLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  // Onboarding status
  const [onboarding, setOnboarding] = useState<OnboardingStatusDto | null>(null);

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

  // Fetch subscription, orders, exchange status, and onboarding
  const fetchExchangeStatus = async () => {
    try {
      const { data } = await exchangeApi.getStatus();
      if (data.isSuccess) {
        setExchange(data.data ?? null);
      }
    } catch {
      // no connection
    } finally {
      setExchangeLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(fetchSubscription());

    ordersApi
      .getMyOrders()
      .then(({ data }) => {
        if (data.isSuccess && data.data) {
          setOrders(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setOrdersLoading(false));

    fetchExchangeStatus();

    userApi
      .getOnboardingStatus()
      .then(({ data }) => {
        if (data.isSuccess && data.data) {
          setOnboarding(data.data);
        }
      })
      .catch(() => {});
  }, [isAuthenticated, dispatch]);

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect your exchange? This will stop all trading.")) return;
    setDisconnecting(true);
    try {
      await exchangeApi.disconnect();
      setExchange(null);
      // Refresh onboarding status
      const { data } = await userApi.getOnboardingStatus();
      if (data.isSuccess && data.data) setOnboarding(data.data);
    } catch {
      setErrorMsg("Failed to disconnect exchange.");
    } finally {
      setDisconnecting(false);
    }
  };

  const handleExchangeModalClose = () => {
    setShowExchangeModal(false);
    // Refresh exchange status after modal closes
    setExchangeLoading(true);
    fetchExchangeStatus();
    // Refresh onboarding
    userApi.getOnboardingStatus().then(({ data }) => {
      if (data.isSuccess && data.data) setOnboarding(data.data);
    }).catch(() => {});
  };

  const exchangeStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return <FaCheckCircle />;
      case "Pending": return <FaClock />;
      case "Invalid": return <FaTimesCircle />;
      default: return <FaExchangeAlt />;
    }
  };

  const exchangeStatusLabel = (status: string) => {
    switch (status) {
      case "Active": return "Connected";
      case "Pending": return "Validating...";
      case "Invalid": return "Connection Failed";
      default: return "Not Connected";
    }
  };

  const setupIncomplete = onboarding && !onboarding.setupComplete;

  const getSetupContinueUrl = () => {
    if (!onboarding) return "/setup";
    if (!onboarding.hasActiveExchange) return "/setup";
    if (!onboarding.hasActiveSubscription) return "/setup/choose-plan";
    return "/setup/start-trading";
  };

  const getSetupHint = () => {
    if (!onboarding) return "Complete your setup to start trading.";
    const missing: string[] = [];
    if (!onboarding.hasActiveExchange) missing.push("connect your exchange");
    if (!onboarding.hasActiveSubscription) missing.push("choose a plan");
    if (missing.length === 0) return "Finalize your setup to start trading.";
    return `You still need to ${missing.join(" and ")} to start trading.`;
  };

  if (!isAuthenticated || !user) return null;

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

  const isFreeForever =
    subscription?.isActive &&
    subscription.planTier === "Free" &&
    new Date(subscription.endDate).getFullYear() > 9000;

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
                Manage your account, subscription, and order history.
              </ProfileSubtitle>
            </ProfileHeader>

            {/* ── Email confirmation banner ── */}
            <EmailConfirmationBanner />

            {/* ── Setup incomplete banner ── */}
            {setupIncomplete && (
              <SetupBanner>
                <SetupBannerText>
                  <SetupBannerTitle>Complete your setup</SetupBannerTitle>
                  <SetupBannerHint>{getSetupHint()}</SetupBannerHint>
                </SetupBannerText>
                <Link href={getSetupContinueUrl()} passHref legacyBehavior>
                  <SetupBannerButton>
                    Continue Setup <FaArrowRight size={12} />
                  </SetupBannerButton>
                </Link>
              </SetupBanner>
            )}

            <CardsGrid>
              {/* ── Profile card ── */}
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

              {/* ── Subscription card ── */}
              <Card>
                <CardTitle>
                  <FaCrown size={16} />
                  Subscription
                </CardTitle>

                {subscription?.isActive ? (
                  <SubInfo>
                    <SubRow>
                      <SubLabel>Plan</SubLabel>
                      <PlanBadge $tier={subscription.planTier}>
                        {subscription.planName}
                        {subscription.isTrial && " (Trial)"}
                      </PlanBadge>
                    </SubRow>
                    <SubRow>
                      <SubLabel>Tier</SubLabel>
                      <SubValue>{subscription.planTier}</SubValue>
                    </SubRow>
                    <SubRow>
                      <SubLabel>Billing</SubLabel>
                      <SubValue>{subscription.billingPeriod}</SubValue>
                    </SubRow>
                    <SubRow>
                      <SubLabel>Started</SubLabel>
                      <SubValue>{formatDate(subscription.startDate)}</SubValue>
                    </SubRow>
                    {!isFreeForever && (
                      <>
                        <SubRow>
                          <SubLabel>
                            {subscription.isTrial ? "Trial ends" : "Renews / Expires"}
                          </SubLabel>
                          <SubValue>{formatDate(subscription.endDate)}</SubValue>
                        </SubRow>
                        <SubRow>
                          <SubLabel>Time remaining</SubLabel>
                          <SubValue>{daysUntil(subscription.endDate)}</SubValue>
                        </SubRow>
                      </>
                    )}
                    {isFreeForever && (
                      <SubRow>
                        <SubLabel>Expires</SubLabel>
                        <SubValue>Never</SubValue>
                      </SubRow>
                    )}

                    {subscription.planTier !== "Enterprise" && (
                      <Link href="/plans" passHref legacyBehavior>
                        <UpgradeLink>
                          {subscription.planTier === "Free"
                            ? "Upgrade Plan"
                            : "Change Plan"}
                        </UpgradeLink>
                      </Link>
                    )}
                  </SubInfo>
                ) : (
                  <SubInfo>
                    <EmptyState>
                      You don&apos;t have an active subscription.
                    </EmptyState>
                    <Link href="/plans" passHref legacyBehavior>
                      <UpgradeLink>View Plans</UpgradeLink>
                    </Link>
                  </SubInfo>
                )}
              </Card>

              {/* ── Exchange connection card ── */}
              <FullWidthCard>
                <CardTitle>
                  <FaExchangeAlt size={16} />
                  Exchange Connection
                </CardTitle>

                {exchangeLoading ? (
                  <EmptyState>Loading exchange status...</EmptyState>
                ) : exchange ? (
                  <>
                    <ExchangeStatusRow>
                      <ExchangeIcon $status={exchange.status}>
                        {exchangeStatusIcon(exchange.status)}
                      </ExchangeIcon>
                      <ExchangeInfo>
                        <ExchangeName>{exchange.exchangeType || "Binance"}</ExchangeName>
                        <ExchangeStatusText $status={exchange.status}>
                          {exchangeStatusLabel(exchange.status)}
                        </ExchangeStatusText>
                      </ExchangeInfo>
                    </ExchangeStatusRow>

                    <ExchangeDetail>
                      {exchange.binanceUid && (
                        <ExchangeDetailRow>
                          <ExchangeDetailLabel>Binance UID</ExchangeDetailLabel>
                          <ExchangeDetailValue>{exchange.binanceUid}</ExchangeDetailValue>
                        </ExchangeDetailRow>
                      )}
                      <ExchangeDetailRow>
                        <ExchangeDetailLabel>Connected</ExchangeDetailLabel>
                        <ExchangeDetailValue>
                          {exchange.createdAt ? formatDate(exchange.createdAt) : "—"}
                        </ExchangeDetailValue>
                      </ExchangeDetailRow>
                      {exchange.lastValidatedAt && (
                        <ExchangeDetailRow>
                          <ExchangeDetailLabel>Last Validated</ExchangeDetailLabel>
                          <ExchangeDetailValue>{formatDate(exchange.lastValidatedAt)}</ExchangeDetailValue>
                        </ExchangeDetailRow>
                      )}
                    </ExchangeDetail>

                    {exchange.status === "Invalid" && exchange.lastValidationError && (
                      <ExchangeError>
                        <FaExclamationTriangle style={{ marginRight: 6 }} />
                        {exchange.lastValidationError}
                      </ExchangeError>
                    )}

                    <ExchangeActions>
                      {exchange.status === "Invalid" && (
                        <ExchangeActionBtn onClick={() => setShowExchangeModal(true)}>
                          Reconnect
                        </ExchangeActionBtn>
                      )}
                      {exchange.status === "Pending" && (
                        <ExchangeActionBtn onClick={() => setShowExchangeModal(true)}>
                          Check Status
                        </ExchangeActionBtn>
                      )}
                      <ExchangeActionBtn
                        $variant="danger"
                        onClick={handleDisconnect}
                        disabled={disconnecting}
                      >
                        {disconnecting ? "Disconnecting..." : "Disconnect"}
                      </ExchangeActionBtn>
                    </ExchangeActions>
                  </>
                ) : (
                  <>
                    <EmptyState>
                      No exchange connected. Connect your Binance account to start trading.
                    </EmptyState>
                    <ExchangeActions>
                      <ExchangeActionBtn onClick={() => setShowExchangeModal(true)}>
                        Connect Exchange
                      </ExchangeActionBtn>
                    </ExchangeActions>
                  </>
                )}
              </FullWidthCard>

              {/* ── Order history card ── */}
              <FullWidthCard>
                <CardTitle>Order History</CardTitle>

                {ordersLoading ? (
                  <EmptyState>Loading orders...</EmptyState>
                ) : orders.length === 0 ? (
                  <EmptyState>No orders yet.</EmptyState>
                ) : (
                  <OrdersTable>
                    <Table>
                      <thead>
                        <tr>
                          <Th>Order #</Th>
                          <Th>Plan</Th>
                          <Th>Price</Th>
                          <Th>Paid</Th>
                          <Th>Status</Th>
                          <Th>Date</Th>
                          <Th>Invoice</Th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <Td>#{order.id}</Td>
                            <Td>
                              {order.planName}
                              {order.isTrial && " (Trial)"}
                            </Td>
                            <Td>${order.priceUsd.toFixed(2)}</Td>
                            <Td>
                              {order.currencyAmount != null && order.currencyPaid
                                ? `${order.currencyAmount} ${order.currencyPaid.toUpperCase()}`
                                : "—"}
                            </Td>
                            <Td>
                              <StatusBadge $status={order.status}>
                                {order.status}
                              </StatusBadge>
                            </Td>
                            <Td>{formatDate(order.createdAt)}</Td>
                            <Td>
                              {order.invoiceUrl ? (
                                <InvoiceLink
                                  href={order.invoiceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View <FaExternalLinkAlt size={10} />
                                </InvoiceLink>
                              ) : (
                                "—"
                              )}
                            </Td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </OrdersTable>
                )}
              </FullWidthCard>
            </CardsGrid>
          </ProfileContainer>
        </ProfileSection>

        {showExchangeModal && (
          <ConnectExchangeModal
            onClose={handleExchangeModalClose}
            strategy=""
            onSuccess={handleExchangeModalClose}
          />
        )}
      </Layout>
    </>
  );
}
