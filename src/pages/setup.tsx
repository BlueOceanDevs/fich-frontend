import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaCheck, FaChartLine, FaShieldAlt, FaBolt, FaRocket, FaCog, FaStar, FaBalanceScale, FaArrowUp, FaChartArea } from "react-icons/fa";
import Layout from "@/components/Layout";
import { useAppSelector } from "@/store/hooks";
import { userApi } from "@/api/user";
import { strategiesApi } from "@/api/strategies";
import type { StrategyDto } from "@/api/types";
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
// Icon map — maps backend iconName to React icon
// ─────────────────────────────────────────────

const ICON_MAP: Record<string, React.ReactNode> = {
  "chart-line": <FaChartLine size={20} />,
  "shield": <FaShieldAlt size={20} />,
  "bolt": <FaBolt size={20} />,
  "rocket": <FaRocket size={20} />,
  "cog": <FaCog size={20} />,
  "star": <FaStar size={20} />,
  "balance": <FaBalanceScale size={20} />,
  "trending-up": <FaArrowUp size={20} />,
  "auto-graph": <FaChartArea size={20} />,
};

const DEFAULT_ICON = <FaChartLine size={20} />;

// ─────────────────────────────────────────────
// Steps config
// ─────────────────────────────────────────────

const STEPS = [
  { label: "Choose Strategy", number: 1 },
  { label: "Connect Exchange", number: 2 },
  { label: "Choose Plan", number: 3 },
  { label: "Start Trading", number: 4 },
];

// Fallback chart path if none provided by backend
const DEFAULT_CHART_PATH =
  "M0,70 C20,65 30,60 50,50 C70,40 80,55 100,35 C120,15 140,25 160,10 C175,5 190,8 200,5";

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────

export default function SetupPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [selectedStrategyId, setSelectedStrategyId] = useState<number | null>(null);
  const [checkingSetup, setCheckingSetup] = useState(true);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [strategies, setStrategies] = useState<StrategyDto[]>([]);
  const [strategiesLoading, setStrategiesLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login?redirect=/setup");
    }
  }, [isAuthenticated, router]);

  // Check onboarding status + fetch strategies in parallel
  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    async function init() {
      const [, strategiesRes] = await Promise.allSettled([
        (async () => {
          try {
            const { data } = await userApi.getOnboardingStatus();
            if (cancelled) return;
            if (data.isSuccess && data.data?.setupComplete) {
              router.replace("/profile");
            }
          } catch {
            // If check fails, just show the setup page
          }
        })(),
        (async () => {
          try {
            const { data } = await strategiesApi.getActiveStrategies();
            if (!cancelled && data.isSuccess && data.data) {
              setStrategies(data.data);
            }
          } catch {
            // Strategies will be empty — page still renders
          }
        })(),
      ]);

      if (!cancelled) {
        setCheckingSetup(false);
        setStrategiesLoading(false);
      }
    }

    init();

    return () => { cancelled = true; };
  }, [isAuthenticated, router]);

  if (!isAuthenticated || checkingSetup) return null;

  const currentStep = 1;

  const handleContinue = () => {
    if (!selectedStrategyId) return;
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
              {strategiesLoading ? (
                <div style={{ textAlign: "center", padding: "2rem 0", color: "rgba(255,255,255,0.5)" }}>
                  Loading strategies...
                </div>
              ) : strategies.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem 0", color: "rgba(255,255,255,0.5)" }}>
                  No strategies available at the moment.
                </div>
              ) : (
                strategies.map((strategy) => {
                  const isSelected = selectedStrategyId === strategy.id;
                  const icon = ICON_MAP[strategy.iconName] || DEFAULT_ICON;
                  const chartPath = strategy.chartPath || DEFAULT_CHART_PATH;
                  const minPortfolio = strategy.minPortfolioUsd >= 1000
                    ? `$${(strategy.minPortfolioUsd / 1000).toFixed(strategy.minPortfolioUsd % 1000 === 0 ? 0 : 1)}k`
                    : `$${strategy.minPortfolioUsd.toLocaleString()}`;

                  return (
                    <StrategyCard
                      key={strategy.slug}
                      $selected={isSelected}
                      $accentColor={strategy.chartColor}
                      onClick={() => setSelectedStrategyId(strategy.id)}
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
                            {icon}
                          </IconWrapper>
                          <StrategyName>{strategy.name}</StrategyName>
                          {strategy.badge && <Badge>{strategy.badge}</Badge>}
                        </CardHeader>

                        <StrategyDesc>{strategy.description}</StrategyDesc>

                        <StrategyMeta>
                          <span>{minPortfolio} min portfolio</span>
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
                          {strategy.description}
                        </ChartLabel>
                        <ChartSvg
                          viewBox="0 0 200 80"
                          preserveAspectRatio="none"
                        >
                          <path
                            d={chartPath}
                            fill="none"
                            stroke={strategy.chartColor}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <path
                            d={`${chartPath} L200,80 L0,80 Z`}
                            fill={`${strategy.chartColor}10`}
                          />
                        </ChartSvg>
                      </ChartArea>
                    </StrategyCard>
                  );
                })
              )}
            </StrategyList>

            {/* ── Continue button ── */}
            <BottomActions>
              <NextHint>
                {selectedStrategyId
                  ? "Next: connect your exchange API keys"
                  : "Select a strategy to continue"}
              </NextHint>
              <ContinueButton
                $disabled={!selectedStrategyId}
                onClick={handleContinue}
              >
                Continue
              </ContinueButton>
            </BottomActions>
          </SetupContainer>
        </SetupSection>
      </Layout>

      {/* ── Connect Exchange Modal ── */}
      {showExchangeModal && selectedStrategyId && (
        <ConnectExchangeModal
          strategy={strategies.find((s) => s.id === selectedStrategyId)?.slug ?? ""}
          strategyId={selectedStrategyId}
          onClose={() => setShowExchangeModal(false)}
        />
      )}
    </>
  );
}
