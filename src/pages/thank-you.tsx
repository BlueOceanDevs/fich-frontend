import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthLayout from "@/components/Auth/AuthLayout";
import {
  PrimaryButton,
  Alert,
  AuthFooter,
  AuthLink,
} from "@/components/Auth/styles";

// ─────────────────────────────────────────────
// Post-signup landing page (waitlist mode).
//
// During the waitlist phase we collect emails only — we don't yet ask
// users to pick a strategy or connect Binance. After registration
// (`pages/signup.tsx`) we push the user here instead of `/setup`.
// When the product launches we'll re-route signups back to
// `getPostLoginRoute()` and this page can be removed (or left as a
// generic "thanks" landing).
//
// Patterned after `pages/confirm-email.tsx` — same AuthLayout +
// Alert + PrimaryButton(onClick) shape so a future cleanup that
// shares helpers across the two pages stays trivial.
// ─────────────────────────────────────────────

export default function ThankYouPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Thank you for subscribing - Fich</title>
      </Head>
      <AuthLayout
        title="Thank you for subscribing"
        subtitle="You're on the list — we'll be in touch."
      >
        <Alert $variant="success">
          Thank you for subscribing to our newsletter. Binance connect is
          coming soon!
        </Alert>
        <PrimaryButton
          onClick={() => router.push("/")}
          style={{ marginTop: 20 }}
        >
          Back to home
        </PrimaryButton>
        <AuthFooter>
          <Link href="/login" passHref legacyBehavior>
            <AuthLink>Already have an account? Sign in</AuthLink>
          </Link>
        </AuthFooter>
      </AuthLayout>
    </>
  );
}
