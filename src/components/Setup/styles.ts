import styled, { css } from "styled-components";

export { IconSquare as IconWrapper } from "@/components/ui/IconWrapper";

// ─────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────

export const SetupSection = styled.section`
  min-height: 100vh;
  padding: 128px 24px 88px;
  background:
    radial-gradient(
      circle at top,
      ${({ theme }) => `${theme.colors.primary}14`} 0%,
      transparent 34%
    ),
    ${({ theme }) => theme.colors.background};
`;

export const SetupContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

export const PageSubtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 40px;
`;

// ─────────────────────────────────────────────
// Steps indicator
// ─────────────────────────────────────────────

export const StepsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0;
    margin-bottom: 32px;
  }
`;

export const StepItem = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active, $completed, theme }) =>
    $active
      ? theme.colors.text
      : $completed
        ? theme.colors.primary
        : theme.colors.textMuted};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 12px;
    gap: 4px;
  }
`;

export const StepNumber = styled.span<{ $active: boolean; $completed: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
  transition: all 0.2s;

  ${({ $active, $completed, theme }) =>
    $active
      ? css`
          background: ${theme.colors.primary};
          color: ${theme.colors.background};
        `
      : $completed
        ? css`
            background: ${theme.colors.primary}30;
            color: ${theme.colors.primary};
          `
        : css`
            background: ${theme.colors.cardBorder};
            color: ${theme.colors.textMuted};
          `}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }
`;

export const StepLabel = styled.span`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const StepConnector = styled.div<{ $completed: boolean }>`
  width: 48px;
  height: 2px;
  margin: 0 8px;
  background: ${({ $completed, theme }) =>
    $completed ? theme.colors.primary : theme.colors.cardBorder};
  transition: background 0.3s;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 24px;
    margin: 0 4px;
  }
`;

// ─────────────────────────────────────────────
// Strategy cards
// ─────────────────────────────────────────────

export const StrategyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const StrategyCard = styled.div<{ $selected: boolean; $accentColor: string }>`
  position: relative;
  padding: 28px 32px;
  background: ${({ theme }) => theme.colors.card};
  border: 2px solid
    ${({ $selected, $accentColor, theme }) =>
      $selected ? $accentColor : theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: start;

  &:hover {
    border-color: ${({ $accentColor }) => `${$accentColor}80`};
    box-shadow: 0 4px 24px ${({ $accentColor }) => `${$accentColor}10`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: 24px 20px;
  }
`;

export const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StrategyName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 11px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StrategyDesc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

export const StrategyMeta = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MetaDot = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FeatureItem = styled.li`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "•";
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

// ─────────────────────────────────────────────
// Checkmark
// ─────────────────────────────────────────────

export const Checkmark = styled.div<{ $visible: boolean; $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  position: absolute;
  top: 16px;
  right: 16px;

  ${({ $visible, $color, theme }) =>
    $visible
      ? css`
          background: ${$color};
          color: #fff;
        `
      : css`
          background: transparent;
          border: 2px solid ${theme.colors.cardBorder};
          color: transparent;
        `}
`;

// ─────────────────────────────────────────────
// Chart placeholder
// ─────────────────────────────────────────────

export const ChartArea = styled.div<{ $color: string }>`
  width: 200px;
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  align-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const ChartLabel = styled.span<{ $color: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $color }) => $color};
  position: absolute;
  top: 0;
  left: 0;
`;

export const ChartSvg = styled.svg`
  width: 100%;
  height: 80px;
`;

// ─────────────────────────────────────────────
// Bottom actions
// ─────────────────────────────────────────────

export const BottomActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

export const NextHint = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const ContinueButton = styled.button<{ $disabled: boolean }>`
  padding: 14px 40px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 15px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.cardBorder : theme.colors.primary};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.textMuted : theme.colors.background};

  &:hover {
    background: ${({ $disabled, theme }) =>
      $disabled ? theme.colors.cardBorder : theme.colors.primaryHover};
  }
`;

export const BackButton = styled.button`
  padding: 14px 28px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.textMuted};
    color: ${({ theme }) => theme.colors.text};
  }
`;

// ─────────────────────────────────────────────
// Connect Exchange
// ─────────────────────────────────────────────

export const ExchangeContent = styled.div`
  max-width: 520px;
  margin: 0 auto;
`;

export const ExchangeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

export const ExchangeOption = styled.div<{
  $selected: boolean;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.card};
  border: 2px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.primary : theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};

  &:hover {
    border-color: ${({ $selected, $disabled, theme }) =>
      $disabled
        ? theme.colors.cardBorder
        : $selected
          ? theme.colors.primary
          : theme.colors.textMuted};
  }
`;

export const ExchangeIcon = styled.div<{ $bg: string }>`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;

export const ExchangeName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ComingSoonTag = styled.span`
  margin-left: auto;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TrustNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 28px;
`;

export const KeyFormCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px 18px;
  }
`;

export const KeyFormTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const KeyFormSubtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
`;

export const FormLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FormInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError
          ? `${theme.colors.danger}20`
          : `${theme.colors.primary}20`};
  }
`;

export const FormError = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

export const FormAlert = styled.div<{ $variant: "error" | "success" | "warning" }>`
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 18px;

  ${({ theme, $variant }) =>
    $variant === "error"
      ? css`
          background: ${theme.colors.danger}15;
          border: 1px solid ${theme.colors.danger}30;
          color: ${theme.colors.danger};
        `
      : $variant === "success"
        ? css`
            background: ${theme.colors.success}15;
            border: 1px solid ${theme.colors.success}30;
            color: ${theme.colors.success};
          `
        : css`
            background: ${theme.colors.warning}15;
            border: 1px solid ${theme.colors.warning}30;
            color: ${theme.colors.warning};
          `}
`;

export const ConnectButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  height: 46px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: 0 4px 20px ${({ theme }) => theme.colors.primary}40;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      pointer-events: none;
    `}
`;

export const PermissionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PermissionItem = styled.li<{ $ok: boolean }>`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ $ok, theme }) =>
    $ok ? theme.colors.textSecondary : theme.colors.danger};
`;

export const StatusDot = styled.span<{ $status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case "Active":
        return theme.colors.success;
      case "Pending":
        return theme.colors.warning;
      case "Invalid":
        return theme.colors.danger;
      default:
        return theme.colors.textMuted;
    }
  }};
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 18px;
`;

// ─────────────────────────────────────────────
// Modal
// ─────────────────────────────────────────────

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const ModalCard = styled.div`
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 32px;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px 18px;
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
`;

// ─────────────────────────────────────────────
// Numbered step sections (inside modal)
// ─────────────────────────────────────────────

export const StepSection = styled.div`
  margin-bottom: 24px;
`;

export const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

export const ModalStepBadge = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const StepTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  margin-bottom: 14px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

export const PermissionsBox = styled.div`
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 14px 16px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PermissionRow = styled.div<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ $danger, theme }) =>
    $danger ? theme.colors.danger : theme.colors.textSecondary};
`;

export const PermissionCheck = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.success}20;
  color: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const PermissionCross = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.danger}20;
  color: ${({ theme }) => theme.colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const IpNote = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  margin: 0;
`;

export const IpList = styled.code`
  display: block;
  margin-top: 6px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 13px;
  font-family: "SF Mono", "Fira Code", monospace;
  color: ${({ theme }) => theme.colors.text};
  user-select: all;
`;

// ─────────────────────────────────────────────
// Success screen
// ─────────────────────────────────────────────

export const SuccessIllustration = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0 24px;
`;

export const SuccessTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 12px;
`;

export const SuccessMessage = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: 1.6;
  margin-bottom: 28px;
`;

// ─────────────────────────────────────────────
// Choose Plan page
// ─────────────────────────────────────────────

export const TrustBadges = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

export const TrustBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    opacity: 0.6;
  }
`;

export const PlanToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  margin-bottom: 36px;
`;

export const PlanToggleButton = styled.button<{ $active: boolean }>`
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 14px;
  font-weight: 500;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.text : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.background : theme.colors.textSecondary};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.text : theme.colors.cardBorder};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

export const SaveBadge = styled.span`
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(0, 216, 151, 0.12);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`;

export const PlansRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 0 auto 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

export const PlanOption = styled.div<{ $selected: boolean; $popular: boolean }>`
  background: ${({ theme }) => theme.colors.card};
  border: 2px solid
    ${({ $selected, $popular, theme }) =>
      $selected
        ? theme.colors.primary
        : $popular
          ? `${theme.colors.primary}40`
          : theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 28px 24px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${({ $popular }) =>
    $popular &&
    `box-shadow: 0 0 30px rgba(0, 216, 151, 0.06);`}

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export const PlanPopularTag = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
`;

export const PlanSelectedCheck = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlanOptionName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

export const PlanFeatureRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 6px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  }
`;

export const PlanOptionPrice = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 16px;
  margin-bottom: 4px;
`;

export const PlanPriceUnit = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PlanBilledNote = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const HelpLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 0 auto 24px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PaymentButton = styled.button<{ $disabled?: boolean }>`
  display: block;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 16px;
  padding: 16px 32px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.cardBorder : theme.colors.primary};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.textMuted : theme.colors.background};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: 0 4px 20px ${({ theme }) => theme.colors.primary}40;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PaymentNote = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  line-height: 1.6;
  margin-bottom: 4px;
`;

export const PayLaterLink = styled.button`
  display: block;
  margin: 12px auto 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    font-style: italic;
    opacity: 0.7;
  }
`;

export const CurrentPlanBadge = styled.span`
  display: inline-block;
  margin-top: 12px;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;

// ─────────────────────────────────────────────
// Start Trading / Summary page
// ─────────────────────────────────────────────

export const SummaryCard = styled.div`
  max-width: 640px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px 18px;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const SummaryIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $color }) => `${$color}15`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
`;

export const SummaryInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SummaryLabel = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`;

export const SummaryValue = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SummaryStatus = styled.span<{
  $variant: "success" | "warning" | "error";
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;

  ${({ $variant, theme }) =>
    $variant === "success"
      ? css`
          background: ${theme.colors.success}15;
          color: ${theme.colors.success};
        `
      : $variant === "warning"
        ? css`
            background: ${theme.colors.warning}15;
            color: ${theme.colors.warning};
          `
        : css`
            background: ${theme.colors.danger}15;
            color: ${theme.colors.danger};
          `}
`;

export const SummaryFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 32px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SummaryFooterItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const SummaryFooterDot = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;
