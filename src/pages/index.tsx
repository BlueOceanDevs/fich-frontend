import Head from "next/head";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Tagline from "@/components/Tagline";
import WhyChoose from "@/components/WhyChoose";
import AllCryptos from "@/components/AllCryptos";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

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
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Hero />
        <Tagline />
        <WhyChoose />
        <AllCryptos />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </Layout>
    </>
  );
}
