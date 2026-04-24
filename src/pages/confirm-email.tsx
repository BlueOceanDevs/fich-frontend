import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { fetchUser } from "@/store/authSlice";
import { authApi } from "@/api/auth";
import AuthLayout from "@/components/Auth/AuthLayout";
import {
  PrimaryButton,
  Spinner,
  AuthFooter,
  AuthLink,
  Alert,
  SpinnerLarge,
} from "@/components/Auth/styles";

export default function ConfirmEmailPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  // True only if this device currently has a valid auth session (i.e. the
  // user clicked the link on the same browser they signed up from). When
  // false — common case, user opened email on a different device — we
  // steer them to /login instead of a dead-end "Continue" button that
  // would just bounce through the auth guard anyway.
  const [authedHere, setAuthedHere] = useState(false);

  const { userId, token } = router.query as {
    userId?: string;
    token?: string;
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (!userId || !token) {
      setStatus("error");
      setMessage("Invalid confirmation link.");
      return;
    }

    authApi
      .confirmEmail({ userId, token })
      .then(async () => {
        setStatus("success");
        setMessage("Your email has been confirmed!");
        // fetchUser() only succeeds if this browser has a session cookie —
        // i.e. the same device the user signed up from. Use .unwrap() so a
        // rejection (unauthenticated on this device) doesn't throw into the
        // outer .catch(), which would incorrectly flip status back to error.
        try {
          await dispatch(fetchUser()).unwrap();
          setAuthedHere(true);
        } catch {
          setAuthedHere(false);
        }
      })
      .catch((err: any) => {
        setStatus("error");
        setMessage(
          err.response?.data?.errors?.[0] ||
            "Confirmation failed. The link may have expired."
        );
      });
  }, [router.isReady, userId, token, dispatch]);

  const titles = {
    loading: "Confirming...",
    success: "Email confirmed",
    error: "Confirmation failed",
  };

  const subtitles = {
    loading: "Please wait while we verify your email.",
    success: "You can now use all features of your account.",
    error: "Something went wrong with the confirmation link.",
  };

  return (
    <>
      <Head>
        <title>Confirm Email - Fich</title>
      </Head>
      <AuthLayout title={titles[status]} subtitle={subtitles[status]}>
        {status === "loading" && <SpinnerLarge />}

        {status === "success" && (
          <>
            <Alert $variant="success">{message}</Alert>
            {authedHere ? (
              <PrimaryButton
                onClick={() => router.push("/")}
                style={{ marginTop: 20 }}
              >
                Continue to Fich
              </PrimaryButton>
            ) : (
              // Cross-device case: we just confirmed the account but this
              // browser has no session. Send them to /login rather than a
              // "Continue" button that would silently bounce through the
              // auth guard to the same place.
              <PrimaryButton
                onClick={() => router.push("/login")}
                style={{ marginTop: 20 }}
              >
                Sign in to continue
              </PrimaryButton>
            )}
          </>
        )}

        {status === "error" && (
          <>
            <Alert $variant="error">{message}</Alert>
            <AuthFooter>
              <Link href="/login" passHref legacyBehavior>
                <AuthLink>Back to sign in</AuthLink>
              </Link>
            </AuthFooter>
          </>
        )}
      </AuthLayout>
    </>
  );
}
