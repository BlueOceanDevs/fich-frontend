import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import {
  LegalSection,
  LegalContainer,
  LegalTitle,
  LegalBody,
  Paragraph,
  List,
  ListItem,
} from "@/components/Legal/styles";

/**
 * Public `/risk-disclosure` route — the platform's Absolute Disclaimer
 * of Liability. The URL stays `/risk-disclosure` (referenced from
 * Terms, Footer, and the OnboardingGuard whitelist) but the document
 * displayed is the stronger "we accept zero liability" version.
 */
export default function RiskDisclosurePage() {
  return (
    <>
      <Head>
        <title>Disclaimer of Liability - Fich</title>
        <meta
          name="description"
          content="Fich absolute disclaimer of liability and waiver of losses — the legal terms you accept by using the platform."
        />
      </Head>
      <Layout>
        <LegalSection>
          <LegalContainer>
            <LegalTitle>
              Absolute Disclaimer of Liability and Waiver of Losses
            </LegalTitle>

            <LegalBody>
              <section>
                <Paragraph>
                  <strong>READ CAREFULLY:</strong> By using the fich.ai
                  software, you explicitly acknowledge and agree that
                  fich.ai, its founders, developers, employees, and
                  affiliates bear <strong>ZERO RESPONSIBILITY AND ZERO
                  LIABILITY</strong> for any financial losses you may incur,
                  regardless of the cause.
                </Paragraph>
              </section>

              <section>
                <Paragraph>
                  Trading cryptocurrency involves a high risk of total
                  capital loss. fich.ai provides algorithmic execution
                  software &quot;as is&quot; and &quot;as available.&quot;
                  You are solely responsible for all trading decisions and
                  the outcomes of using our automated tools.
                </Paragraph>
              </section>

              <section>
                <Paragraph>
                  You explicitly agree that fich.ai is{" "}
                  <strong>NOT liable</strong> for financial losses resulting
                  from, but not limited to, the following reasons:
                </Paragraph>
                <List>
                  <ListItem>
                    <strong>Software and Algorithmic Errors:</strong> Any
                    bugs, glitches, calculation errors, logic failures,
                    delayed executions, or unintended trades executed by the
                    fich.ai algorithm or dashboard.
                  </ListItem>
                  <ListItem>
                    <strong>Market Volatility and Black Swan Events:</strong>{" "}
                    Sudden market crashes, flash crashes, lack of liquidity,
                    extreme volatility, or failure of the &quot;Cash
                    Filter&quot; to rotate funds quickly enough to prevent
                    portfolio drawdowns.
                  </ListItem>
                  <ListItem>
                    <strong>Third-Party Exchange Failures:</strong> Downtime,
                    API rate limits, server crashes, trading halts,
                    maintenance, or insolvency of Binance or any other
                    connected third-party exchange.
                  </ListItem>
                  <ListItem>
                    <strong>Execution Discrepancies:</strong> Slippage, high
                    exchange trading fees, or differences between theoretical
                    backtested results and live execution prices.
                  </ListItem>
                  <ListItem>
                    <strong>User Error:</strong> Incorrectly configuring API
                    keys, granting unauthorized withdrawal permissions,
                    manually interfering with bot trades, or failing to
                    secure your account credentials.
                  </ListItem>
                  <ListItem>
                    <strong>Network and Infrastructure Outages:</strong>{" "}
                    Server outages, internet service disruptions, or cloud
                    provider failures that prevent the algorithm from
                    reading market data or executing trades.
                  </ListItem>
                  <ListItem>
                    <strong>Regulatory Actions:</strong> Freezing of assets,
                    delisting of specific altcoins by the exchange, or
                    government bans on cryptocurrency trading in your
                    jurisdiction.
                  </ListItem>
                </List>
              </section>

              <section>
                <Paragraph>
                  <strong>THE BOTTOM LINE:</strong> fich.ai is an execution
                  tool, not a guarantee of profit. If the software
                  malfunctions, if the market crashes, or if the exchange
                  goes offline, you may lose some or all of your money. By
                  connecting your API, you agree that you are using this
                  software entirely at your own risk and you permanently
                  waive any right to sue, seek damages, or demand
                  compensation from fich.ai for any negative financial
                  outcomes.
                </Paragraph>
              </section>
            </LegalBody>
          </LegalContainer>
        </LegalSection>
      </Layout>
    </>
  );
}
