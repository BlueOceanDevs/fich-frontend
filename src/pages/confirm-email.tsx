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
      .then(() => {
        setStatus("success");
        setMessage("Your email has been confirmed!");
        dispatch(fetchUser());
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
            <PrimaryButton
              onClick={() => router.push("/")}
              style={{ marginTop: 20 }}
            >
              Continue to Fich
            </PrimaryButton>
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
