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
