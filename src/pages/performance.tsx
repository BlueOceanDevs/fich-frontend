import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import {
  LegalSection,
  LegalContainer,
  LegalTitle,
  Paragraph,
} from "@/components/Legal/styles";
import { CTAButton } from "@/components/ui/Button";

/**
 * Public `/performance` route — placeholder.
 *
 * <para>
 * The full historical-performance page (detailed equity curve, full
 * monthly-returns table with all years, per-asset performance, etc.)
 * is intentionally deferred — see the Step 2 spec discussion. The
 * route exists so the Navbar's "Performance" link and the homepage
 * hero's "See historical performance" button have somewhere to land
 * without 404'ing. When the full spec is ready, replace this body
 * with the real content; the URL contract is already stable.
 * </para>
 */
export default function PerformancePage() {
  return (
    <>
      <Head>
        <title>Performance - Fich</title>
        <meta
          name="description"
          content="Historical performance data for the Fich strategy — annual return, drawdown, and monthly returns since 2020."
        />
      </Head>
      <Layout>
        <LegalSection>
          <LegalContainer>
            <LegalTitle>Performance</LegalTitle>
            <Paragraph>
              Detailed historical performance is coming soon. In the
              meantime, you can see the headline numbers, equity curve,
              and monthly returns table on the homepage.
            </Paragraph>
            <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-start" }}>
              <Link href="/#hero" passHref legacyBehavior>
                <CTAButton>Back to overview &rarr;</CTAButton>
              </Link>
            </div>
          </LegalContainer>
        </LegalSection>
      </Layout>
    </>
  );
}
