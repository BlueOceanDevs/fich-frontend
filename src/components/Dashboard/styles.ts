import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const DashWrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  max-width: 1000px;
  animation: ${fadeInUp} 1s ease-out 0.3s both;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const DashWindow = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
`;

export const DashTopBar = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

export const DashDot = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
  margin-right: 6px;
`;

export const DashBody = styled.div`
  display: flex;
  min-height: 380px;
`;

export const Sidebar = styled.div`
  width: 160px;
  border-right: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 0;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 120px;
  }
`;

export const SidebarItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 12px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.backgroundLight : "transparent"};
  border-left: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : "transparent"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

export const SidebarIcon = styled.span`
  font-size: 14px;
`;

export const MainPanel = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const BalanceLabel = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const BalanceAmount = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 4px;
  display: flex;
  align-items: baseline;
  gap: 12px;
`;

export const BalanceChange = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const ChartArea = styled.div`
  flex: 1;
  min-height: 120px;
  margin: 16px 0;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const drawLine = keyframes`
  from { stroke-dashoffset: 800; }
  to { stroke-dashoffset: 0; }
`;

export const ChartLine = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      to top,
      rgba(0, 216, 151, 0.08) 0%,
      transparent 100%
    );
  }

  &::after {
    content: "";
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary} 0%,
      ${({ theme }) => theme.colors.primary} 20%,
      ${({ theme }) => theme.colors.primary} 40%,
      rgba(0, 216, 151, 0.5) 60%,
      ${({ theme }) => theme.colors.primary} 80%,
      ${({ theme }) => theme.colors.primary} 100%
    );
    clip-path: polygon(
      0% 60%, 10% 45%, 20% 55%, 30% 30%, 40% 50%, 50% 25%,
      60% 40%, 70% 20%, 80% 35%, 90% 15%, 100% 30%,
      100% 100%, 0% 100%
    );
    opacity: 0.9;
  }
`;

export const AssetsRow = styled.div`
  margin-top: auto;
`;

export const AssetPill = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  flex-shrink: 0;
`;

export const AssetName = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const AssetPrice = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const BottomTabs = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding-top: 12px;
`;

export const TabItem = styled.span<{ $active?: boolean }>`
  font-size: 11px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  cursor: pointer;
  padding-bottom: 4px;
  border-bottom: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : "transparent"};
  transition: all 0.2s;
`;

export const QuickSwapPanel = styled.div`
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-left: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px;
`;

export const QuickSwapTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const SwapRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

export const SwapLabel = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SwapValue = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const RepartitionPanel = styled.div`
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-left: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px;
  flex: 1;
`;

export const RepartitionTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const DonutPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;

  .donut-ring {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 12px solid ${({ theme }) => theme.colors.cardBorder};
    border-top-color: #f7931a;
    border-right-color: #627eea;
    border-bottom-color: #9945ff;
    border-left-color: #00aae4;
  }
`;
