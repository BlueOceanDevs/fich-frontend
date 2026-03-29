import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from "@/store/hooks";
import { setAuthenticated, fetchUser } from "@/store/authSlice";
import { authApi } from "@/api/auth";
import { useAuthForm } from "@/hooks/useAuthForm";
import AuthLayout from "@/components/Auth/AuthLayout";
import GoogleAuthButton from "@/components/Auth/GoogleAuthButton";
import {
  AuthForm,
  FieldGroup,
  Label,
  Input,
  FieldError,
  PasswordWrapper,
  PasswordToggle,
  ForgotRow,
  InlineLink,
  PrimaryButton,
  Spinner,
  Divider,
  AuthFooter,
  AuthLink,
  Alert,
} from "@/components/Auth/styles";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const form = useAuthForm({ email: "", password: "" });

  const validate = (): boolean => {
    let valid = true;
    if (!form.values.email.trim()) {
      form.setFieldError("email", "Email is required");
      valid = false;
    }
    if (!form.values.password) {
      form.setFieldError("password", "Password is required");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.resetMessages();
    if (!validate()) return;

    form.setLoading(true);
    try {
      await authApi.login({
        email: form.values.email.trim(),
        password: form.values.password,
      });
      dispatch(setAuthenticated());
      dispatch(fetchUser());
      router.push("/");
    } catch (err: any) {
      form.setGlobalError(
        err.response?.data?.errors?.[0] || "Login failed. Please try again."
      );
    } finally {
      form.setLoading(false);
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    form.resetMessages();
    form.setLoading(true);

    try {
      await authApi.googleLogin({ idToken: credential });
      dispatch(setAuthenticated());
      dispatch(fetchUser());
      router.push("/");
    } catch (err: any) {
      form.setGlobalError(
        err.response?.data?.errors?.[0] ||
          "Google login failed. Please try again."
      );
    } finally {
      form.setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Log In - Fich</title>
      </Head>
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to your account to continue trading"
      >
        {form.globalError && <Alert $variant="error">{form.globalError}</Alert>}

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

          <FieldGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordWrapper>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.values.password}
                onChange={(e) => form.setValue("password", e.target.value)}
                $hasError={!!form.errors.password}
                autoComplete="current-password"
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

          <ForgotRow>
            <Link href="/forgot-password" passHref legacyBehavior>
              <InlineLink>Forgot password?</InlineLink>
            </Link>
          </ForgotRow>

          <PrimaryButton
            type="submit"
            disabled={form.loading}
            $loading={form.loading}
          >
            {form.loading && <Spinner />}
            {form.loading ? "Signing in..." : "Sign in"}
          </PrimaryButton>

          <Divider>
            <span>or</span>
          </Divider>

          <GoogleAuthButton
            text="signin_with"
            context="signin"
            onCredential={handleGoogleLogin}
            onError={form.setGlobalError}
            disabled={form.loading}
          />
        </AuthForm>

        <AuthFooter>
          Don&apos;t have an account?{" "}
          <Link href="/signup" passHref legacyBehavior>
            <AuthLink>Sign up</AuthLink>
          </Link>
        </AuthFooter>
      </AuthLayout>
    </>
  );
}
