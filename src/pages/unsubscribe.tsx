import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { authApi } from "@/api/auth";
import AuthLayout from "@/components/Auth/AuthLayout";
import {
  PrimaryButton,
  AuthFooter,
  AuthLink,
  Alert,
  SpinnerLarge,
} from "@/components/Auth/styles";

// ─────────────────────────────────────────────
// Public unsubscribe page — landing target for the
// `unsubscribe` link in the footer of every bulk
// broadcast email. Two-step flow:
//   1. GET /auth/UnsubscribeStatus?token=...   → render "We've unsubscribed me@example.com"
//   2. POST /auth/Unsubscribe (button click)   → flip MarketingOptOut
//
// We deliberately do NOT flip the flag on GET so link prefetchers, email
// security scanners, and accidental browser pre-renders can't unsubscribe
// users behind their backs.
//
// No auth required — the HMAC-signed token is the only credential.
// ─────────────────────────────────────────────

type ScreenState =
  | { kind: "loading" }
  | { kind: "ready"; email: string; alreadyOut: boolean }
  | { kind: "submitting"; email: string }
  | { kind: "done"; email: string }
  | { kind: "error"; message: string };

export default function UnsubscribePage() {
  const router = useRouter();
  const [state, setState] = useState<ScreenState>({ kind: "loading" });

  const { token } = router.query as { token?: string };

  useEffect(() => {
    if (!router.isReady) return;

    if (!token) {
      setState({
        kind: "error",
        message: "Missing or invalid unsubscribe link.",
      });
      return;
    }

    authApi
      .getUnsubscribeStatus(token)
      .then((res) => {
        const data = res.data?.data;
        if (!res.data?.isSuccess || !data) {
          setState({
            kind: "error",
            message:
              res.data?.errors?.[0] ??
              "We couldn't verify this unsubscribe link.",
          });
          return;
        }
        setState({
          kind: "ready",
          email: data.email,
          alreadyOut: data.isOptedOut,
        });
      })
      .catch((err: any) => {
        setState({
          kind: "error",
          message:
            err?.response?.data?.errors?.[0] ??
            "This unsubscribe link is invalid or has expired.",
        });
      });
  }, [router.isReady, token]);

  async function handleConfirm() {
    if (state.kind !== "ready" || !token) return;
    const email = state.email;
    setState({ kind: "submitting", email });

    try {
      await authApi.unsubscribe({ token });
      setState({ kind: "done", email });
    } catch (err: any) {
      setState({
        kind: "error",
        message:
          err?.response?.data?.errors?.[0] ??
          "We couldn't process the unsubscribe. Please try again.",
      });
    }
  }

  // ── Title/subtitle per screen state ──
  const titles: Record<ScreenState["kind"], string> = {
    loading: "Verifying...",
    ready: "Unsubscribe",
    submitting: "Unsubscribing...",
    done: "You're unsubscribed",
    error: "Link issue",
  };

  const subtitles: Record<ScreenState["kind"], string> = {
    loading: "Please wait while we verify your link.",
    ready: "Confirm to stop receiving marketing emails from Fich.",
    submitting: "Updating your preferences...",
    done: "We won't send you marketing emails anymore.",
    error: "Something went wrong with the unsubscribe link.",
  };

  return (
    <>
      <Head>
        <title>Unsubscribe - Fich</title>
      </Head>
      <AuthLayout title={titles[state.kind]} subtitle={subtitles[state.kind]}>
        {state.kind === "loading" && <SpinnerLarge />}

        {state.kind === "ready" && (
          <>
            {state.alreadyOut ? (
              <Alert $variant="success">
                <strong>{state.email}</strong> is already unsubscribed from
                marketing emails. You can re-subscribe anytime from your
                account settings.
              </Alert>
            ) : (
              <Alert $variant="success">
                We&apos;ll stop sending marketing emails to{" "}
                <strong>{state.email}</strong>. Account-related and
                transactional emails (security alerts, billing, password
                resets) will still be delivered.
              </Alert>
            )}

            {!state.alreadyOut && (
              <PrimaryButton
                onClick={handleConfirm}
                style={{ marginTop: 20 }}
              >
                Unsubscribe me
              </PrimaryButton>
            )}

            <AuthFooter>
              <Link href="/" passHref legacyBehavior>
                <AuthLink>Back to Fich</AuthLink>
              </Link>
            </AuthFooter>
          </>
        )}

        {state.kind === "submitting" && <SpinnerLarge />}

        {state.kind === "done" && (
          <>
            <Alert $variant="success">
              <strong>{state.email}</strong> has been unsubscribed from
              marketing emails. You can re-enable them anytime from your
              account settings.
            </Alert>
            <AuthFooter>
              <Link href="/" passHref legacyBehavior>
                <AuthLink>Back to Fich</AuthLink>
              </Link>
            </AuthFooter>
          </>
        )}

        {state.kind === "error" && (
          <>
            <Alert $variant="error">{state.message}</Alert>
            <AuthFooter>
              <Link href="/" passHref legacyBehavior>
                <AuthLink>Back to Fich</AuthLink>
              </Link>
            </AuthFooter>
          </>
        )}
      </AuthLayout>
    </>
  );
}
