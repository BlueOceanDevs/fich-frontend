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

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Fich</title>
        <meta
          name="description"
          content="Fich terms and conditions — the legally binding agreement that governs your use of the fich.ai trading software."
        />
      </Head>
      <Layout>
        <LegalSection>
          <LegalContainer>
            <LegalTitle>Terms and Conditions</LegalTitle>
            <LegalUpdated>Last Updated: April 2026</LegalUpdated>

            <LegalBody>
              <section>
                <Paragraph>
                  By checking the &quot;I Agree&quot; box, connecting your
                  Binance API to fich.ai, or using our software in any
                  capacity, you (the &quot;User&quot;) are entering into a
                  legally binding agreement with fich.ai (the
                  &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
                  &quot;our&quot;).
                </Paragraph>
                <Paragraph>
                  Please read these Terms and Conditions carefully. If you do
                  not agree with any part of these terms, do not connect your
                  API or use our software.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>
                  1. Nature of the Service (Software, Not Custody)
                </SectionHeading>
                <Paragraph>
                  fich.ai provides cloud-based, algorithmic trade execution
                  software designed to automate quantitative momentum
                  strategies.
                </Paragraph>
                <List>
                  <ListItem>
                    <strong>100% Non-Custodial:</strong> We do not provide
                    wallet services, nor do we hold, custody, or manage your
                    digital assets. All funds remain entirely in your
                    personal Binance account.
                  </ListItem>
                  <ListItem>
                    <strong>API Permissions:</strong> You agree to provide a
                    Binance API key with &quot;Read&quot; and &quot;Futures
                    Trading&quot; permissions only. You agree that you will
                    NEVER enable &quot;Withdrawal&quot; permissions on the
                    API key provided to fich.ai. If you enable withdrawal
                    permissions, you do so at your own absolute risk, and
                    fich.ai accepts zero liability for any resulting loss
                    of funds.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>2. No Financial Advice</SectionHeading>
                <Paragraph>
                  The algorithms, momentum strategies, historical backtests,
                  and trade logs provided by fich.ai are for informational
                  and execution purposes only.
                </Paragraph>
                <List>
                  <ListItem>
                    We are a software provider, not a registered investment
                    advisor, broker, or financial planner.
                  </ListItem>
                  <ListItem>
                    Nothing on the fich.ai website or dashboard constitutes
                    personalized financial, investment, or legal advice. You
                    are solely responsible for evaluating whether our
                    algorithmic strategy aligns with your personal risk
                    tolerance.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>3. Absolute Assumption of Risk</SectionHeading>
                <Paragraph>
                  Cryptocurrency trading is highly speculative and involves a
                  significant risk of loss. By using fich.ai, you explicitly
                  acknowledge and accept the following risks:
                </Paragraph>
                <List>
                  <ListItem>
                    <strong>Total Loss of Capital:</strong> You can lose some
                    or all of the funds connected to the API.
                  </ListItem>
                  <ListItem>
                    <strong>Historical Drawdowns:</strong> Our strategy takes
                    calculated, systematic losses. You agree that sudden and
                    severe drops in portfolio value (drawdowns) are a normal
                    part of this strategy&apos;s mathematical execution.
                  </ListItem>
                  <ListItem>
                    <strong>Slippage and Fees:</strong> Real-world trading
                    involves exchange fees and slippage (the difference
                    between expected price and actual execution price). Your
                    live results will always vary from anyone else&apos;s.
                  </ListItem>
                  <ListItem>
                    <strong>No Guarantees:</strong> Past performance—including
                    our advertised historical CAGR of 107% or any total
                    return percentages—is not a guarantee, prediction, or
                    projection of future results.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>
                  4. Absolute Disclaimer of Liability and Waiver of Losses
                </SectionHeading>
                <Paragraph>
                  <strong>READ CAREFULLY:</strong> By using the fich.ai
                  software, you explicitly acknowledge and agree that
                  fich.ai, its founders, developers, employees, and
                  affiliates bear <strong>ZERO RESPONSIBILITY AND ZERO
                  LIABILITY</strong> for any financial losses you may incur,
                  regardless of the cause.
                </Paragraph>
                <Paragraph>
                  You explicitly agree that fich.ai is{" "}
                  <strong>NOT liable</strong> for financial losses resulting
                  from, but not limited to:
                </Paragraph>
                <List>
                  <ListItem>
                    <strong>Software and Algorithmic Errors:</strong> Bugs,
                    glitches, calculation errors, logic failures, delayed
                    executions, or unintended trades executed by the FICH
                    algorithm.
                  </ListItem>
                  <ListItem>
                    <strong>Market Volatility:</strong> Sudden market
                    crashes, flash crashes, lack of liquidity, extreme
                    volatility, or the failure of the algorithm&apos;s
                    defensive filters to rotate funds quickly enough.
                  </ListItem>
                  <ListItem>
                    <strong>Third-Party Exchange Failures:</strong> Downtime,
                    API rate limits, server crashes, trading halts,
                    maintenance, or insolvency of Binance.
                  </ListItem>
                  <ListItem>
                    <strong>User Error:</strong> Incorrectly configuring API
                    keys, manually interfering with bot trades, failing to
                    use a dedicated Sub-Account, or failing to secure your
                    account credentials.
                  </ListItem>
                  <ListItem>
                    <strong>Network Outages:</strong> Server outages,
                    internet service disruptions, or cloud provider failures
                    that prevent the algorithm from executing trades.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>
                  5. Subscription, Payments, and Refunds
                </SectionHeading>
                <List>
                  <ListItem>
                    <strong>Crypto-Native Billing:</strong> Subscriptions are
                    paid month-to-month via cryptocurrency (e.g., USDC, USDT)
                    using our designated decentralized payment gateways.
                  </ListItem>
                  <ListItem>
                    <strong>Strict No-Refund Policy:</strong> Because we
                    provide immediate access to proprietary software,
                    algorithmic execution, and digital trade logs, all
                    subscription payments are final and non-refundable.
                  </ListItem>
                  <ListItem>
                    <strong>Cancellation:</strong> You may cancel your
                    recurring subscription at any time. Your bot will simply
                    cease executing trades at the end of your current active
                    billing cycle. No prorated refunds will be issued.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>
                  6. User Account &amp; API Responsibilities
                </SectionHeading>
                <Paragraph>
                  You are solely responsible for maintaining the
                  confidentiality of your API keys, your fich.ai account
                  credentials, and the security of your underlying Binance
                  account. fich.ai is not responsible for losses resulting
                  from your failure to secure your own devices, emails, or
                  exchange passwords. Furthermore, you are responsible for
                  handling your own tax liabilities and reporting generated
                  by the bot&apos;s trading activity.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>7. Intellectual Property</SectionHeading>
                <Paragraph>
                  The fich.ai algorithms, momentum engines, code, UI/UX, and
                  historical data logs are the exclusive intellectual
                  property of fich.ai. You are granted a limited,
                  non-exclusive license to use the software. You may not
                  copy, reverse-engineer, decompile, or distribute any part
                  of our proprietary trading system.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>8. Right to Terminate</SectionHeading>
                <Paragraph>
                  We reserve the right to suspend or terminate your access to
                  the fich.ai platform at any time, without notice or refund,
                  if we suspect you are violating these Terms, engaging in
                  malicious activity against our servers, or attempting to
                  reverse-engineer our proprietary algorithms.
                </Paragraph>
              </section>

              <section>
                <Paragraph>
                  By proceeding and connecting your API key, you
                  electronically sign and agree that you have read,
                  understood, and accepted all the risks and terms outlined
                  above.
                </Paragraph>
              </section>
            </LegalBody>
          </LegalContainer>
        </LegalSection>
      </Layout>
    </>
  );
}
