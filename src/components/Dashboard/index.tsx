import React from "react";
import {
  DashWrapper,
  DashWindow,
  DashTopBar,
  DashDot,
  DashBody,
  Sidebar,
  SidebarItem,
  SidebarIcon,
  MainPanel,
  BalanceLabel,
  BalanceAmount,
  BalanceChange,
  ChartArea,
  ChartLine,
  QuickSwapPanel,
  QuickSwapTitle,
  SwapRow,
  SwapLabel,
  SwapValue,
  AssetsRow,
  AssetPill,
  AssetName,
  AssetPrice,
  BottomTabs,
  TabItem,
  RepartitionPanel,
  RepartitionTitle,
  DonutPlaceholder,
} from "./styles";

const Dashboard: React.FC = () => {
  const assets = [
    { symbol: "BTC", name: "Bitcoin", price: "$97,524", color: "#F7931A" },
    { symbol: "ETH", name: "Ethereum", price: "$3,421", color: "#627EEA" },
    { symbol: "SOL", name: "Solana", price: "$198", color: "#9945FF" },
    { symbol: "ADA", name: "Cardano", price: "$0.98", color: "#0033AD" },
    { symbol: "XRP", name: "Ripple", price: "$2.31", color: "#00AAE4" },
  ];

  return (
    <DashWrapper>
      <DashWindow>
        <DashTopBar>
          <DashDot color="#FF5F56" />
          <DashDot color="#FFBD2E" />
          <DashDot color="#27C93F" />
          <span style={{ marginLeft: 12, color: "#5A5A6A", fontSize: 12 }}>
            Main Dashboard
          </span>
        </DashTopBar>
        <DashBody>
          <Sidebar>
            <SidebarItem $active>
              <SidebarIcon>📊</SidebarIcon> Dashboard
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>💱</SidebarIcon> Trade
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>👛</SidebarIcon> Wallet
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>📈</SidebarIcon> Markets
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>⚙️</SidebarIcon> Settings
            </SidebarItem>
          </Sidebar>

          <MainPanel>
            <BalanceLabel>Total Balance</BalanceLabel>
            <BalanceAmount>€22,193.05 <BalanceChange>+2.4%</BalanceChange></BalanceAmount>

            <ChartArea>
              <ChartLine />
            </ChartArea>

            <AssetsRow>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#fff" }}>Assets</div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
                {assets.map((a) => (
                  <AssetPill key={a.symbol}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color }} />
                    <AssetName>{a.symbol}</AssetName>
                    <AssetPrice>{a.price}</AssetPrice>
                  </AssetPill>
                ))}
              </div>
            </AssetsRow>

            <BottomTabs>
              <TabItem $active>Recent transactions</TabItem>
              <TabItem>Market</TabItem>
              <TabItem>Articles</TabItem>
            </BottomTabs>
          </MainPanel>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 200 }}>
            <QuickSwapPanel>
              <QuickSwapTitle>Quick swap</QuickSwapTitle>
              <SwapRow>
                <SwapLabel>From</SwapLabel>
                <SwapValue>BTC</SwapValue>
              </SwapRow>
              <SwapRow>
                <SwapLabel>To</SwapLabel>
                <SwapValue>ETH</SwapValue>
              </SwapRow>
            </QuickSwapPanel>

            <RepartitionPanel>
              <RepartitionTitle>Repartition</RepartitionTitle>
              <DonutPlaceholder>
                <div className="donut-ring" />
              </DonutPlaceholder>
            </RepartitionPanel>
          </div>
        </DashBody>
      </DashWindow>
    </DashWrapper>
  );
};

export default Dashboard;
