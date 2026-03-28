import React from "react";
import Head from "next/head";
import Link from "next/link";
import { authApi } from "@/api/auth";
import { useAuthForm } from "@/hooks/useAuthForm";
import AuthLayout from "@/components/Auth/AuthLayout";
import {
  AuthForm,
  FieldGroup,
  Label,
  Input,
  FieldError,
  PrimaryButton,
  Spinner,
  AuthFooter,
  AuthLink,
  Alert,
} from "@/components/Auth/styles";

export default function ForgotPasswordPage() {
  const form = useAuthForm({ email: "" });

  const validate = (): boolean => {
    if (!form.values.email.trim()) {
      form.setFieldError("email", "Email is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.resetMessages();
    if (!validate()) return;

    form.setLoading(true);
    try {
      await authApi.forgotPassword({ email: form.values.email.trim() });
    } catch {
      // Always show success to prevent email enumeration
    } finally {
      form.setGlobalSuccess(
        "If an account with that email exists, we've sent a password reset link. Check your inbox."
      );
      form.setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password - Fich</title>
      </Head>
      <AuthLayout
        title="Reset your password"
        subtitle="Enter your email and we'll send you a link to reset your password."
      >
        {form.globalError && <Alert $variant="error">{form.globalError}</Alert>}
        {form.globalSuccess && (
          <Alert $variant="success">{form.globalSuccess}</Alert>
        )}

        {!form.globalSuccess && (
          <AuthForm onSubmit={handleSubmit}>
            <FieldGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.values.email}
                onChange={(e) => form.setValue("email", e.target.value)}
                $hasError={!!form.errors.email}
                autoComplete="email"
              />
              {form.errors.email && (
                <FieldError>{form.errors.email}</FieldError>
              )}
            </FieldGroup>

            <PrimaryButton
              type="submit"
              disabled={form.loading}
              $loading={form.loading}
            >
              {form.loading && <Spinner />}
              {form.loading ? "Sending..." : "Send reset link"}
            </PrimaryButton>
          </AuthForm>
        )}

        <AuthFooter>
          Remember your password?{" "}
          <Link href="/login" passHref legacyBehavior>
            <AuthLink>Back to sign in</AuthLink>
          </Link>
        </AuthFooter>
      </AuthLayout>
    </>
  );
}
