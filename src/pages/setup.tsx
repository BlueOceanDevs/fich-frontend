import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaCheck, FaChartLine, FaShieldAlt, FaBolt } from "react-icons/fa";
import Layout from "@/components/Layout";
import { useAppSelector } from "@/store/hooks";
import { userApi } from "@/api/user";
import ConnectExchangeModal from "@/components/Setup/ConnectExchangeModal";
import {
  SetupSection,
  SetupContainer,
  PageTitle,
  PageSubtitle,
  StepsBar,
  StepItem,
  StepNumber,
  StepLabel,
  StepConnector,
  StrategyList,
  StrategyCard,
  Checkmark,
  CardLeft,
  CardHeader,
  IconWrapper,
  StrategyName,
  Badge,
  StrategyDesc,
  StrategyMeta,
  MetaDot,
  FeatureList,
  FeatureItem,
  ChartArea,
  ChartLabel,
  ChartSvg,
  BottomActions,
  NextHint,
  ContinueButton,
} from "@/components/Setup/styles";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface Strategy {
  id: string;
  name: string;
  description: string;
  minPortfolio: string;
  exchange: string;
  badge?: string;
  features: string[];
  icon: React.ReactNode;
  chartColor: string;
}

// ─────────────────────────────────────────────
// Strategy data
// ─────────────────────────────────────────────

const STRATEGIES: Strategy[] = [
  {
    id: "crypto-index",
    name: "Crypto Index",
    description: "Diversified crypto exposure in one simple step",
    minPortfolio: "$500",
    exchange: "Binance Futures",
    badge: "Most Popular",
    features: [
      "Built for long-term growth",
      "Follows overall crypto market performance",
      "Auto-rebalances weekly",
    ],
    icon: <FaChartLine size={20} />,
    chartColor: "#00D897",
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "Balanced growth & protection across market cycles",
    minPortfolio: "$1,000",
    exchange: "Binance Futures",
    features: [
      "Trades both rising and falling markets",
      "Focuses on lower risk and steady returns",
      "Optimized for risk-adjusted performance",
    ],
    icon: <FaShieldAlt size={20} />,
    chartColor: "#627EEA",
  },
  {
    id: "aggressive",
    name: "Aggressive",
    description: "Maximum returns for high-risk tolerance",
    minPortfolio: "$2,000",
    exchange: "Binance Futures",
    features: [
      "Higher allocation to volatile altcoins",
      "Leveraged positions for amplified gains",
      "Best suited for experienced traders",
    ],
    icon: <FaBolt size={20} />,
    chartColor: "#F7931A",
  },
];

// ─────────────────────────────────────────────
// Steps config
// ─────────────────────────────────────────────

const STEPS = [
  { label: "Choose Strategy", number: 1 },
  { label: "Connect Exchange", number: 2 },
  { label: "Choose Plan", number: 3 },
  { label: "Start Trading", number: 4 },
];

// ── Mini chart paths (simple uptrend curves) ──

const CHART_PATHS: Record<string, string> = {
  "crypto-index":
    "M0,70 C20,65 30,60 50,50 C70,40 80,55 100,35 C120,15 140,25 160,10 C175,5 190,8 200,5",
  balanced:
    "M0,70 C25,68 40,55 60,50 C80,45 90,48 110,40 C130,32 150,28 170,18 C185,12 195,8 200,5",
  aggressive:
    "M0,70 C15,72 25,65 40,55 C55,40 65,55 80,35 C95,15 110,30 130,10 C150,5 170,15 185,3 L200,2",
};

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────

export default function SetupPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [checkingSetup, setCheckingSetup] = useState(true);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login?redirect=/setup");
    }
  }, [isAuthenticated, router]);

  // Single API call to check if the user already completed onboarding
  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    async function checkOnboardingStatus() {
      try {
        const { data } = await userApi.getOnboardingStatus();
        if (cancelled) return;

        if (data.isSuccess && data.data?.setupComplete) {
          router.replace("/profile");
          return;
        }
      } catch {
        // If check fails, just show the setup page
      }

      if (!cancelled) {
        setCheckingSetup(false);
      }
    }

    checkOnboardingStatus();

    return () => { cancelled = true; };
  }, [isAuthenticated, router]);

  if (!isAuthenticated || checkingSetup) return null;

  const currentStep = 1;

  const handleContinue = () => {
    if (!selectedStrategy) return;
    setShowExchangeModal(true);
  };

  return (
    <>
      <Head>
        <title>Get Started - Fich</title>
      </Head>

      <Layout>
        <SetupSection>
          <SetupContainer>
            <PageTitle>Choose Your Strategy</PageTitle>
            <PageSubtitle>
              Set up in 2 minutes. You can switch strategies anytime.
            </PageSubtitle>

            {/* ── Steps indicator ── */}
            <StepsBar>
              {STEPS.map((step, i) => (
                <React.Fragment key={step.number}>
                  <StepItem
                    $active={step.number === currentStep}
                    $completed={step.number < currentStep}
                  >
                    <StepNumber
                      $active={step.number === currentStep}
                      $completed={step.number < currentStep}
                    >
                      {step.number < currentStep ? (
                        <FaCheck size={10} />
                      ) : (
                        step.number
                      )}
                    </StepNumber>
                    <StepLabel>{step.label}</StepLabel>
                  </StepItem>
                  {i < STEPS.length - 1 && (
                    <StepConnector $completed={step.number < currentStep} />
                  )}
                </React.Fragment>
              ))}
            </StepsBar>

            {/* ── Strategy cards ── */}
            <StrategyList>
              {STRATEGIES.map((strategy) => {
                const isSelected = selectedStrategy === strategy.id;
                return (
                  <StrategyCard
                    key={strategy.id}
                    $selected={isSelected}
                    $accentColor={strategy.chartColor}
                    onClick={() => setSelectedStrategy(strategy.id)}
                  >
                    <Checkmark
                      $visible={isSelected}
                      $color={strategy.chartColor}
                    >
                      <FaCheck size={12} />
                    </Checkmark>

                    <CardLeft>
                      <CardHeader>
                        <IconWrapper $color={strategy.chartColor}>
                          {strategy.icon}
                        </IconWrapper>
                        <StrategyName>{strategy.name}</StrategyName>
                        {strategy.badge && <Badge>{strategy.badge}</Badge>}
                      </CardHeader>

                      <StrategyDesc>{strategy.description}</StrategyDesc>

                      <StrategyMeta>
                        <span>{strategy.minPortfolio} min portfolio</span>
                        <MetaDot>•</MetaDot>
                        <span>{strategy.exchange}</span>
                      </StrategyMeta>

                      <FeatureList>
                        {strategy.features.map((f) => (
                          <FeatureItem key={f}>{f}</FeatureItem>
                        ))}
                      </FeatureList>
                    </CardLeft>

                    <ChartArea $color={strategy.chartColor}>
                      <ChartLabel $color={strategy.chartColor}>
                        {strategy.id === "crypto-index"
                          ? "outperforms major indexes"
                          : strategy.id === "balanced"
                            ? "steady risk-adjusted returns"
                            : "high volatility, high reward"}
                      </ChartLabel>
                      <ChartSvg
                        viewBox="0 0 200 80"
                        preserveAspectRatio="none"
                      >
                        <path
                          d={CHART_PATHS[strategy.id]}
                          fill="none"
                          stroke={strategy.chartColor}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d={`${CHART_PATHS[strategy.id]} L200,80 L0,80 Z`}
                          fill={`${strategy.chartColor}10`}
                        />
                      </ChartSvg>
                    </ChartArea>
                  </StrategyCard>
                );
              })}
            </StrategyList>

            {/* ── Continue button ── */}
            <BottomActions>
              <NextHint>
                {selectedStrategy
                  ? "Next: connect your exchange API keys"
                  : "Select a strategy to continue"}
              </NextHint>
              <ContinueButton
                $disabled={!selectedStrategy}
                onClick={handleContinue}
              >
                Continue
              </ContinueButton>
            </BottomActions>
          </SetupContainer>
        </SetupSection>
      </Layout>

      {/* ── Connect Exchange Modal ── */}
      {showExchangeModal && selectedStrategy && (
        <ConnectExchangeModal
          strategy={selectedStrategy}
          onClose={() => setShowExchangeModal(false)}
        />
      )}
    </>
  );
}
