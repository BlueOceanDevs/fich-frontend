import styled from "styled-components";

// ── Layout ──

export const ProfileSection = styled.section`
  padding: 128px 24px 88px;
  background:
    radial-gradient(
      circle at top,
      ${({ theme }) => `${theme.colors.primary}14`} 0%,
      transparent 34%
    ),
    ${({ theme }) => theme.colors.background};
`;

export const ProfileContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

export const ProfileHeader = styled.div`
  max-width: 640px;
  margin-bottom: 28px;
`;

export const ProfileTitle = styled.h1`
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

export const ProfileSubtitle = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// ── Tabs ──

export const TabRow = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : "transparent")};
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -1px;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

// ── Cards ──

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
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

export const FullWidthCard = styled(Card)`
  grid-column: 1 / -1;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EmptyState = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  padding: 24px 0;
`;

// ── Avatar ──

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-bottom: 6px;
`;

export const AvatarWrapper = styled.button`
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

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarOverlay = styled.div`
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

export const AvatarHint = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const SectionLabel = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 6px 0 -8px;
`;

// ── Subscription ──

export const SubInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SubRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const SubLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SubValue = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const PlanBadge = styled.span<{ $tier: string }>`
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

export const UpgradeLink = styled.a`
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

// ── Orders ──

export const OrdersTable = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

export const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 12px;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  white-space: nowrap;
`;

export const StatusBadge = styled.span<{ $status: string }>`
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

export const InvoiceLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

// ── Setup banner ──

export const SetupBanner = styled.div`
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

export const SetupBannerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SetupBannerTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const SetupBannerHint = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SetupBannerButton = styled.a`
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

// ── Exchange ──

export const ExchangeStatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ExchangeIcon = styled.div<{ $status: string }>`
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

export const ExchangeInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ExchangeName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ExchangeStatusText = styled.span<{ $status: string }>`
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

export const ExchangeDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => `${theme.colors.background}80`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 13px;
`;

export const ExchangeDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ExchangeDetailLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ExchangeDetailValue = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const ExchangeError = styled.div`
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.15);
  font-size: 13px;
  color: #ef4444;
  line-height: 1.5;
`;

export const ExchangeActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

// ── Pagination ──

export const PaginationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 8px;
`;

export const PagBtn = styled.button`
  padding: 6px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PagText = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ExchangeActionBtn = styled.button<{ $variant?: "danger" }>`
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
