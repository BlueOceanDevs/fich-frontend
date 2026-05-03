import React, { useEffect, useState } from "react";
import { performanceApi } from "@/api/performance";
import type { HomepagePerformanceDto } from "@/api/types";
import StatsCard from "@/components/Performance/StatsCard";
import PerformanceChart from "@/components/Performance/PerformanceChart";
import MonthlyReturnsTable from "@/components/Performance/MonthlyReturnsTable";
import {
  PerfBlockWrapper,
  HeadlineCallout,
  HeadlineHighlight,
  HistoricalLinkRow,
} from "@/components/Performance/styles";
import {
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroButton,
  HistoricalPerformanceButton,
} from "./styles";

// Format the headline dollar amount with thousands separators and no
// decimals: 107758.94 → "$107,759". Localized — the browser's locale
// drives separator style. The "$" prefix is hardcoded since Fich
// quotes everything in USD regardless of viewer.
function formatDollar(value: number): string {
  return `$${Math.round(value).toLocaleString()}`;
}

const Hero: React.FC = () => {
  // Single fetch on mount. Backend caches the payload in Redis with a
  // 1-hour TTL so this is cheap; admin writes invalidate the cache so
  // the homepage updates within seconds of an edit.
  const [data, setData] = useState<HomepagePerformanceDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    performanceApi
      .getHomepage()
      .then((res) => {
        if (cancelled) return;
        if (res.data.isSuccess && res.data.data) {
          setData(res.data.data);
        }
      })
      .catch(() => {
        // Performance data is non-blocking — the rest of the hero
        // (headline, CTA) renders without it. Failure here just
        // hides the dynamic block.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <HeroSection id="hero">
      <HeroContent>
        <HeroTitle>
          Crypto bagholding is dead.
          <br />
          We unlock the math
          <br />
          that beats the market.
        </HeroTitle>
        <HeroSubtitle>
          Your Binance account. Our Quantitative Strategy. Years of
          backtesting and proven results.
        </HeroSubtitle>
        <HeroButton href="/signup">
          Get started now &rarr;
        </HeroButton>
      </HeroContent>

      {/*
        Performance block — hidden during initial load AND if the API
        call fails. The static hero (headline + CTA) above is always
        visible so the page never shows as "broken" if the backend
        is temporarily unreachable.
      */}
      {!loading && data && (
        <PerfBlockWrapper>
          <HeadlineCallout>
            If you invested{" "}
            <HeadlineHighlight>
              {formatDollar(data.baselineAmountUsd)}
            </HeadlineHighlight>{" "}
            in <HeadlineHighlight>{data.baselineStartLabel}</HeadlineHighlight>{" "}
            you would now have{" "}
            <HeadlineHighlight>
              {formatDollar(data.currentValueUsd)}
            </HeadlineHighlight>
          </HeadlineCallout>

          <StatsCard
            annualReturnPct={data.annualReturnPct}
            maxDrawdownPct={data.maxDrawdownPct}
            sharpeRatio={data.sharpeRatio}
          />

          <PerformanceChart data={data.equityCurve} />

          <MonthlyReturnsTable rows={data.monthlyReturns} />

          <HistoricalLinkRow>
            <HistoricalPerformanceButton href="/performance">
              See historical performance &rarr;
            </HistoricalPerformanceButton>
          </HistoricalLinkRow>
        </PerfBlockWrapper>
      )}
    </HeroSection>
  );
};

export default Hero;
