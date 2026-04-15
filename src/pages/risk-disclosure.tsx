import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import {
  LegalSection,
  LegalContainer,
  LegalTitle,
  LegalUpdated,
  LegalBody,
  SectionHeading,
  Paragraph,
  List,
  ListItem,
} from "@/components/Legal/styles";

export default function RiskDisclosurePage() {
  return (
    <>
      <Head>
        <title>Risk Disclosure - Fich</title>
        <meta
          name="description"
          content="Fich risk disclosure — understand the risks involved in automated cryptocurrency trading."
        />
      </Head>
      <Layout>
        <LegalSection>
          <LegalContainer>
            <LegalTitle>Risk Disclosure</LegalTitle>
            <LegalUpdated>Last updated: April 13, 2026</LegalUpdated>

            <LegalBody>
              <section>
                <Paragraph>
                  This Risk Disclosure statement is provided in accordance with
                  best practices for cryptocurrency services. Please read it
                  carefully before using the Fich platform.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>
                  1. Cryptocurrency Trading Risks
                </SectionHeading>
                <Paragraph>
                  Cryptocurrency trading involves a high degree of risk and is
                  not suitable for all investors. The value of digital assets can
                  fluctuate significantly, and you may lose some or all of your
                  invested capital. You should not trade with money you cannot
                  afford to lose.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>2. Market Volatility</SectionHeading>
                <Paragraph>
                  Cryptocurrency markets are highly volatile. Prices can change
                  rapidly in very short periods of time. This volatility may
                  result in significant gains but also significant losses. Market
                  conditions can change drastically due to regulatory news,
                  technological developments, macroeconomic events, or changes in
                  market sentiment.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>3. Automated Trading Risks</SectionHeading>
                <List>
                  <ListItem>
                    <strong>Strategy risk</strong> — The trading strategies used
                    by Fich are based on predefined signals. No strategy is
                    guaranteed to be profitable. Past performance is not
                    indicative of future results.
                  </ListItem>
                  <ListItem>
                    <strong>Execution risk</strong> — Trades may not execute at
                    the expected price due to slippage, low liquidity, or rapid
                    market movements between signal generation and order
                    placement.
                  </ListItem>
                  <ListItem>
                    <strong>Technical risk</strong> — Automated systems depend on
                    software, network connectivity, and exchange API
                    availability. System downtime, bugs, or exchange outages may
                    prevent trades from executing or cause unexpected behaviour.
                  </ListItem>
                  <ListItem>
                    <strong>Timing risk</strong> — Rebalancing occurs on a
                    scheduled basis. Market conditions between rebalancing
                    periods may change adversely.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>4. Exchange Risks</SectionHeading>
                <Paragraph>
                  Fich connects to third-party exchanges (currently Binance) to
                  execute trades. You are subject to the terms, risks, and
                  policies of the exchange you use. Risks include but are not
                  limited to:
                </Paragraph>
                <List>
                  <ListItem>
                    Exchange downtime or maintenance during trading periods.
                  </ListItem>
                  <ListItem>
                    API rate limits that may delay or prevent trade execution.
                  </ListItem>
                  <ListItem>
                    Changes to exchange policies, fees, or supported trading
                    pairs.
                  </ListItem>
                  <ListItem>
                    Exchange security breaches or insolvency events.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>5. Binance USD-M Futures</SectionHeading>
                <Paragraph>
                  Fich executes trades on Binance USD-M Futures, but uses the
                  platform purely for its larger symbol universe. All positions
                  are opened at 1x leverage and are long-only — Fich never
                  shorts and never takes leveraged exposure. Your risk profile
                  is equivalent to holding the underlying assets on Spot. You
                  must fund your USD-M Futures wallet (not your Spot wallet)
                  with USDT for Fich to trade on your behalf.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>6. Regulatory Risks</SectionHeading>
                <Paragraph>
                  Cryptocurrency regulations vary by jurisdiction and are subject
                  to change. Regulatory actions may affect the legality, value,
                  or transferability of digital assets. It is your responsibility
                  to ensure that using Fich and trading cryptocurrencies complies
                  with the laws of your jurisdiction.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>7. No Financial Advice</SectionHeading>
                <Paragraph>
                  Fich does not provide investment, financial, legal, or tax
                  advice. The information provided on this platform is for
                  informational purposes only and should not be construed as a
                  recommendation to buy, sell, or hold any digital asset. You
                  should consult a qualified financial advisor before making any
                  investment decisions.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>8. No Guarantee of Returns</SectionHeading>
                <Paragraph>
                  Fich makes no guarantee of profits or returns. Performance
                  statistics and historical data shown on the platform are
                  provided for informational purposes and do not represent a
                  promise of future performance. All trading is conducted at your
                  own risk.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>9. Your Responsibility</SectionHeading>
                <Paragraph>
                  By using Fich, you acknowledge that you have read and
                  understood this Risk Disclosure. You accept full responsibility
                  for your decision to use the platform and for any financial
                  outcomes resulting from trades executed on your behalf. You
                  should regularly monitor your exchange account and portfolio.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>10. Contact</SectionHeading>
                <Paragraph>
                  If you have questions about the risks described here, please
                  contact us at{" "}
                  <a
                    href="mailto:support@fich.ai"
                    style={{ color: "inherit", textDecoration: "underline" }}
                  >
                    support@fich.ai
                  </a>
                  .
                </Paragraph>
              </section>
            </LegalBody>
          </LegalContainer>
        </LegalSection>
      </Layout>
    </>
  );
}
