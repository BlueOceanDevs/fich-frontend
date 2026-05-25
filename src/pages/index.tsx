import Head from "next/head";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Head>
        <title>Crypto Trading Platform - Secure Automated Cryptocurrency Trading | Fich</title>
        <meta
          name="description"
          content="Fich Crypto Trading Platform - discover the best crypto trading platform with instant transactions, optimized fees, and a premium interface built by professionals. Trade cryptocurrency securely while funds remain in your exchange account"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon is set in _document.tsx for the whole app. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Hero />
        <WhyChoose />
        <HowItWorks />
        {/* WAITLIST MODE — Pricing section hidden. Purchases are
            disabled during the email-collection phase; uncomment to
            re-enable when plans launch. */}
        {/* <Pricing /> */}
        <FAQ />
      </Layout>
    </>
  );
}
