import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authApi } from "@/api/auth";
import { useAuthForm } from "@/hooks/useAuthForm";
import AuthLayout from "@/components/Auth/AuthLayout";
import {
  AuthForm,
  FieldGroup,
  Label,
  Input,
  FieldError,
  PasswordWrapper,
  PasswordToggle,
  PrimaryButton,
  Spinner,
  AuthFooter,
  AuthLink,
  Alert,
} from "@/components/Auth/styles";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { userId, token } = router.query as {
    userId?: string;
    token?: string;
  };

  const form = useAuthForm({ password: "", confirmPassword: "" });

  const validate = (): boolean => {
    let valid = true;
    if (!form.values.password) {
      form.setFieldError("password", "Password is required");
      valid = false;
    } else if (form.values.password.length < 8) {
      form.setFieldError("password", "Must be at least 8 characters");
      valid = false;
    }
    if (form.values.password !== form.values.confirmPassword) {
      form.setFieldError("confirmPassword", "Passwords don't match");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.resetMessages();

    if (!userId || !token) {
      form.setGlobalError("Invalid reset link. Please request a new one.");
      return;
    }
    if (!validate()) return;

    form.setLoading(true);
    try {
      await authApi.resetPassword({
        userId,
        token,
        newPassword: form.values.password,
      });
      form.setGlobalSuccess(
        "Password reset successfully! Redirecting to login..."
      );
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      form.setGlobalError(
        err.response?.data?.errors?.[0] ||
          "Reset failed. The link may have expired."
      );
    } finally {
      form.setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password - Fich</title>
      </Head>
      <AuthLayout
        title="Set new password"
        subtitle="Choose a strong password for your account."
      >
        {form.globalError && <Alert $variant="error">{form.globalError}</Alert>}
        {form.globalSuccess && (
          <Alert $variant="success">{form.globalSuccess}</Alert>
        )}

        {!form.globalSuccess && (
          <AuthForm onSubmit={handleSubmit}>
            <FieldGroup>
              <Label htmlFor="password">New password</Label>
              <PasswordWrapper>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={form.values.password}
                  onChange={(e) => form.setValue("password", e.target.value)}
                  $hasError={!!form.errors.password}
                  autoComplete="new-password"
                  style={{ paddingRight: 44 }}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </PasswordToggle>
              </PasswordWrapper>
              {form.errors.password && (
                <FieldError>{form.errors.password}</FieldError>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your new password"
                value={form.values.confirmPassword}
                onChange={(e) =>
                  form.setValue("confirmPassword", e.target.value)
                }
                $hasError={!!form.errors.confirmPassword}
                autoComplete="new-password"
              />
              {form.errors.confirmPassword && (
                <FieldError>{form.errors.confirmPassword}</FieldError>
              )}
            </FieldGroup>

            <PrimaryButton
              type="submit"
              disabled={form.loading}
              $loading={form.loading}
            >
              {form.loading && <Spinner />}
              {form.loading ? "Resetting..." : "Reset password"}
            </PrimaryButton>
          </AuthForm>
        )}

        <AuthFooter>
          <Link href="/login" passHref legacyBehavior>
            <AuthLink>Back to sign in</AuthLink>
          </Link>
        </AuthFooter>
      </AuthLayout>
    </>
  );
}
