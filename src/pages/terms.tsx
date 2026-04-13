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
        <title>Terms of Service - Fich</title>
        <meta
          name="description"
          content="Fich terms of service — the rules and conditions for using the Fich trading platform."
        />
      </Head>
      <Layout>
        <LegalSection>
          <LegalContainer>
            <LegalTitle>Terms of Service</LegalTitle>
            <LegalUpdated>Last updated: April 13, 2026</LegalUpdated>

            <LegalBody>
              <section>
                <Paragraph>
                  These Terms of Service (&quot;Terms&quot;) govern your access
                  to and use of the Fich platform (&quot;Service&quot;). By
                  creating an account or using the Service, you agree to be bound
                  by these Terms. If you do not agree, do not use the Service.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>1. Eligibility</SectionHeading>
                <Paragraph>
                  You must be at least 18 years old and legally permitted to use
                  cryptocurrency trading services in your jurisdiction. By using
                  Fich, you represent that you meet these requirements.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>2. Account Responsibilities</SectionHeading>
                <List>
                  <ListItem>
                    You are responsible for maintaining the confidentiality of
                    your account credentials.
                  </ListItem>
                  <ListItem>
                    You are responsible for all activity that occurs under your
                    account.
                  </ListItem>
                  <ListItem>
                    You must provide accurate and complete information during
                    registration.
                  </ListItem>
                  <ListItem>
                    You must notify us immediately if you suspect any
                    unauthorised access to your account.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>3. Service Description</SectionHeading>
                <Paragraph>
                  Fich provides an automated portfolio rebalancing service for
                  cryptocurrency assets. When you subscribe and connect a
                  supported exchange account, the platform executes trades on
                  your behalf based on predefined strategy signals. You
                  acknowledge that:
                </Paragraph>
                <List>
                  <ListItem>
                    Trades are executed automatically based on signals and your
                    selected strategy.
                  </ListItem>
                  <ListItem>
                    Trade execution depends on exchange availability, liquidity,
                    and API access.
                  </ListItem>
                  <ListItem>
                    Past performance does not guarantee future results.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>4. Exchange API Keys</SectionHeading>
                <Paragraph>
                  You grant Fich permission to use your exchange API keys solely
                  to execute trades on your behalf. You must provide
                  trade-only API keys (not withdrawal-enabled). Fich encrypts
                  your API keys at rest and never exposes them in plaintext. You
                  may disconnect your exchange at any time, which will
                  immediately stop all trading activity.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>5. Subscriptions & Payments</SectionHeading>
                <List>
                  <ListItem>
                    Access to trading features requires an active paid
                    subscription.
                  </ListItem>
                  <ListItem>
                    Subscription fees are billed according to your selected plan
                    and billing cycle.
                  </ListItem>
                  <ListItem>
                    All payments are processed through third-party payment
                    providers.
                  </ListItem>
                  <ListItem>
                    You may cancel your subscription at any time. Cancellation
                    takes effect at the end of the current billing period.
                  </ListItem>
                  <ListItem>
                    We reserve the right to change pricing with reasonable
                    notice.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>6. Risk Disclosure</SectionHeading>
                <Paragraph>
                  Cryptocurrency trading involves substantial risk of loss. By
                  using Fich, you acknowledge that you understand these risks.
                  Please review our{" "}
                  <a
                    href="/risk-disclosure"
                    style={{ color: "inherit", textDecoration: "underline" }}
                  >
                    Risk Disclosure
                  </a>{" "}
                  page for full details.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>7. Limitation of Liability</SectionHeading>
                <Paragraph>
                  To the maximum extent permitted by law, Fich and its operators
                  shall not be liable for any indirect, incidental, special, or
                  consequential damages, including but not limited to loss of
                  profits, data, or trading losses arising from your use of the
                  Service. Our total liability shall not exceed the amount you
                  paid for the Service during the twelve months preceding the
                  claim.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>8. Prohibited Conduct</SectionHeading>
                <List>
                  <ListItem>
                    You may not use the Service for any unlawful purpose.
                  </ListItem>
                  <ListItem>
                    You may not attempt to interfere with, compromise, or disrupt
                    the Service.
                  </ListItem>
                  <ListItem>
                    You may not reverse-engineer, decompile, or attempt to
                    extract the source code of the platform.
                  </ListItem>
                  <ListItem>
                    You may not create multiple accounts to circumvent
                    restrictions or abuse free trials.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>9. Termination</SectionHeading>
                <Paragraph>
                  We may suspend or terminate your access to the Service at our
                  discretion if you violate these Terms. You may terminate your
                  account at any time by contacting support. Upon termination,
                  your exchange connection will be removed and all trading
                  activity will cease.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>10. Changes to These Terms</SectionHeading>
                <Paragraph>
                  We may update these Terms from time to time. Continued use of
                  the Service after changes constitutes acceptance of the revised
                  Terms. Material changes will be communicated via email or
                  on-platform notification.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>11. Contact</SectionHeading>
                <Paragraph>
                  For questions about these Terms, contact us at{" "}
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
