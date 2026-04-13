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

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Fich</title>
        <meta
          name="description"
          content="Fich privacy policy — how we collect, use, and protect your personal data."
        />
      </Head>
      <Layout>
        <LegalSection>
          <LegalContainer>
            <LegalTitle>Privacy Policy</LegalTitle>
            <LegalUpdated>Last updated: April 13, 2026</LegalUpdated>

            <LegalBody>
              <section>
                <Paragraph>
                  Fich (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                  operates the Fich platform. This Privacy Policy explains how
                  we collect, use, disclose, and safeguard your information when
                  you use our website and services.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>1. Information We Collect</SectionHeading>
                <Paragraph>
                  We collect information you provide directly when creating an
                  account and using our services:
                </Paragraph>
                <List>
                  <ListItem>
                    <strong>Account information</strong> — name, email address,
                    and password when you register.
                  </ListItem>
                  <ListItem>
                    <strong>Profile information</strong> — display name, avatar
                    image, and other optional details you choose to provide.
                  </ListItem>
                  <ListItem>
                    <strong>Exchange credentials</strong> — Binance API keys you
                    provide to connect your exchange account. These are encrypted
                    at rest using AES-256-GCM and are never exposed in plaintext.
                  </ListItem>
                  <ListItem>
                    <strong>Payment information</strong> — transaction details
                    related to your subscription. Payment processing is handled
                    by third-party providers; we do not store card numbers.
                  </ListItem>
                  <ListItem>
                    <strong>Usage data</strong> — IP address, browser type,
                    pages visited, and timestamps collected automatically.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>2. How We Use Your Information</SectionHeading>
                <List>
                  <ListItem>
                    To provide, operate, and maintain our trading services.
                  </ListItem>
                  <ListItem>
                    To process transactions and manage your subscription.
                  </ListItem>
                  <ListItem>
                    To execute trades on your connected exchange account based on
                    the strategy you selected.
                  </ListItem>
                  <ListItem>
                    To communicate with you about your account, service updates,
                    and security alerts.
                  </ListItem>
                  <ListItem>
                    To improve and personalise your experience on the platform.
                  </ListItem>
                  <ListItem>
                    To detect, prevent, and address technical issues and
                    fraudulent activity.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>3. Data Security</SectionHeading>
                <Paragraph>
                  We implement industry-standard security measures to protect
                  your personal information. Exchange API keys are encrypted
                  using AES-256-GCM encryption and are only decrypted in memory
                  during trade execution. Secrets are never logged or exposed
                  through API responses. All data in transit is protected with
                  TLS encryption.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>4. Data Sharing</SectionHeading>
                <Paragraph>
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share data with:
                </Paragraph>
                <List>
                  <ListItem>
                    <strong>Payment processors</strong> — to handle subscription
                    billing and invoicing.
                  </ListItem>
                  <ListItem>
                    <strong>Exchange APIs</strong> — to execute trades on your
                    behalf using your encrypted credentials.
                  </ListItem>
                  <ListItem>
                    <strong>Law enforcement</strong> — if required by law or to
                    protect our rights and safety.
                  </ListItem>
                </List>
              </section>

              <section>
                <SectionHeading>5. Data Retention</SectionHeading>
                <Paragraph>
                  We retain your account information for as long as your account
                  is active. Trade history and audit logs are retained for
                  compliance and dispute resolution. If you delete your account,
                  we will remove your personal data within 30 days, except where
                  retention is required by law.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>6. Your Rights</SectionHeading>
                <Paragraph>
                  Depending on your jurisdiction, you may have the right to
                  access, correct, or delete your personal data. You may also
                  request data portability or object to certain processing. To
                  exercise these rights, contact us at the email address below.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>7. Cookies</SectionHeading>
                <Paragraph>
                  We use essential cookies to maintain your session and
                  preferences (such as theme selection). We do not use
                  third-party tracking cookies for advertising purposes.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>8. Changes to This Policy</SectionHeading>
                <Paragraph>
                  We may update this Privacy Policy from time to time. We will
                  notify you of material changes by posting the updated policy on
                  this page with a revised &quot;last updated&quot; date.
                </Paragraph>
              </section>

              <section>
                <SectionHeading>9. Contact Us</SectionHeading>
                <Paragraph>
                  If you have questions about this Privacy Policy, please contact
                  us at{" "}
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
