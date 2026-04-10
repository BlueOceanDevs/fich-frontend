import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ── Layout ──

export const DashboardSection = styled.section`
  padding: 128px 24px 88px;
  background:
    radial-gradient(
      circle at top,
      ${({ theme }) => `${theme.colors.primary}14`} 0%,
      transparent 34%
    ),
    ${({ theme }) => theme.colors.background};
`;

export const DashboardContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

export const DashboardHeader = styled.div`
  margin-bottom: 28px;
`;

export const DashboardTitle = styled.h1`
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`;

export const DashboardSubtitle = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// ── Cards ──

export const Card = styled.div`
  padding: 28px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  animation: ${fadeIn} 0.4s ease-out both;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px 16px;
  }
`;

export const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// ── Summary ──

export const SummaryCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  animation-delay: 0.05s;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SummaryLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SummaryLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SummaryValue = styled.span`
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const SummaryPnl = styled.span<{ $positive: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.success : theme.colors.danger};
`;

export const SummaryRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: flex-start;
  }
`;

export const StrategyBadge = styled.span`
  display: inline-block;
  padding: 6px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 13px;
  font-weight: 600;
  background: ${({ theme }) => `${theme.colors.primary}18`};
  color: ${({ theme }) => theme.colors.primary};
`;

// ── Quick Stats ──

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled(Card)`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StatValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

// ── Charts grid ──

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled(Card)`
  animation-delay: 0.15s;
  min-height: 320px;
`;

// ── Holdings Table ──

export const TableWrapper = styled.div`
  margin-top: 20px;
`;

export const TableCard = styled(Card)`
  animation-delay: 0.2s;
`;

export const TableScroll = styled.div`
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

export const ThRight = styled(Th)`
  text-align: right;
`;

export const Td = styled.td`
  padding: 12px;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  white-space: nowrap;
`;

export const TdRight = styled(Td)`
  text-align: right;
`;

export const PnlText = styled.span<{ $positive: boolean }>`
  font-weight: 500;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.success : theme.colors.danger};
`;

export const AssetCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AssetIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.backgroundLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const AssetName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const AssetSymbol = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

export const AssetPair = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// ── Allocation bar ──

export const AllocationBar = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  overflow: hidden;
`;

export const AllocationFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => `${Math.min($pct, 100)}%`};
  border-radius: 3px;
  background: ${({ $color }) => $color};
  transition: width 0.6s ease;
`;

// ── Recent Trades ──

export const RecentTradesCard = styled(Card)`
  margin-top: 20px;
  animation-delay: 0.25s;
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 12px;
  font-weight: 500;
  background: ${({ $status }) => {
    switch ($status) {
      case "Filled": return "rgba(0, 216, 151, 0.15)";
      case "Pending": case "PartiallyFilled": return "rgba(234, 179, 8, 0.15)";
      case "Failed": case "Cancelled": return "rgba(239, 68, 68, 0.12)";
      default: return "rgba(100, 116, 139, 0.15)";
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case "Filled": return "#00d897";
      case "Pending": case "PartiallyFilled": return "#eab308";
      case "Failed": case "Cancelled": return "#ef4444";
      default: return "#94a3b8";
    }
  }};
`;

export const SideBadge = styled.span<{ $side: string }>`
  font-weight: 600;
  font-size: 12px;
  color: ${({ $side }) => ($side === "Buy" ? "#00d897" : "#ef4444")};
`;

export const ViewAllLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

// ── Empty / Loading ──

export const EmptyState = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  padding: 32px 0;
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

// ── Pagination ──

export const PaginationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 12px;
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
