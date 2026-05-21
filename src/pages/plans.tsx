import { useEffect } from "react";
import { useRouter } from "next/router";

// ─────────────────────────────────────────────
// WAITLIST MODE — the dedicated plans page is hidden during the
// email-collection phase. Hitting this URL directly now redirects
// to the homepage. The original page (Layout + <Pricing />) is
// preserved below the export so reverting is a one-paste change.
// ─────────────────────────────────────────────

export default function PlansPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}

/*
// Original page — restore when plans launch:
import Head from "next/head";
import Layout from "@/components/Layout";
import Pricing from "@/components/Pricing";

export default function PlansPage() {
  return (
    <>
      <Head>
        <title>Plans & Pricing - Fich</title>
        <meta
          name="description"
          content="Choose the right Fich plan for your crypto trading needs. Free, Pro, and Enterprise tiers with transparent pricing."
        />
      </Head>
      <Layout>
        <div style={{ paddingTop: 72 }}>
          <Pricing />
        </div>
      </Layout>
    </>
  );
}
*/
