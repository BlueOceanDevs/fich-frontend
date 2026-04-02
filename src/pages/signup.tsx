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
  FieldRow,
  Label,
  Input,
  FieldError,
  PasswordWrapper,
  PasswordToggle,
  PrimaryButton,
  Spinner,
  Divider,
  AuthFooter,
  AuthLink,
  Alert,
} from "@/components/Auth/styles";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const form = useAuthForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = (): boolean => {
    let valid = true;
    const { firstName, lastName, email, password, confirmPassword } =
      form.values;

    if (!email.trim()) {
      form.setFieldError("email", "Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.setFieldError("email", "Enter a valid email");
      valid = false;
    }

    if (!password) {
      form.setFieldError("password", "Password is required");
      valid = false;
    } else if (password.length < 8) {
      form.setFieldError("password", "Must be at least 8 characters");
      valid = false;
    }

    if (password !== confirmPassword) {
      form.setFieldError("confirmPassword", "Passwords don't match");
      valid = false;
    }

    if (firstName.trim() && firstName.trim().length < 2) {
      form.setFieldError("firstName", "Must be at least 2 characters");
      valid = false;
    }

    if (lastName.trim() && lastName.trim().length < 2) {
      form.setFieldError("lastName", "Must be at least 2 characters");
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
      await authApi.register({
        firstName: form.values.firstName.trim() || undefined,
        lastName: form.values.lastName.trim() || undefined,
        email: form.values.email.trim(),
        password: form.values.password,
      });
      dispatch(setAuthenticated());
      dispatch(fetchUser());
      router.push("/setup");
    } catch (err: any) {
      form.setGlobalError(
        err.response?.data?.errors?.[0] ||
          "Registration failed. Please try again."
      );
    } finally {
      form.setLoading(false);
    }
  };

  const handleGoogleSignup = async (credential: string) => {
    form.resetMessages();
    form.setLoading(true);

    try {
      await authApi.googleLogin({ idToken: credential });
      dispatch(setAuthenticated());
      dispatch(fetchUser());
      router.push("/setup");
    } catch (err: any) {
      form.setGlobalError(
        err.response?.data?.errors?.[0] ||
          "Google signup failed. Please try again."
      );
    } finally {
      form.setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - Fich</title>
      </Head>
      <AuthLayout
        title="Create your account"
        subtitle="Start trading crypto in minutes"
      >
        {form.globalError && <Alert $variant="error">{form.globalError}</Alert>}

        <AuthForm onSubmit={handleSubmit}>
          <FieldRow>
            <FieldGroup>
              <Label htmlFor="firstName">First name (optional)</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={form.values.firstName}
                onChange={(e) => form.setValue("firstName", e.target.value)}
                $hasError={!!form.errors.firstName}
                autoComplete="given-name"
              />
              {form.errors.firstName && (
                <FieldError>{form.errors.firstName}</FieldError>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="lastName">Last name (optional)</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={form.values.lastName}
                onChange={(e) => form.setValue("lastName", e.target.value)}
                $hasError={!!form.errors.lastName}
                autoComplete="family-name"
              />
              {form.errors.lastName && (
                <FieldError>{form.errors.lastName}</FieldError>
              )}
            </FieldGroup>
          </FieldRow>

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
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat your password"
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
            {form.loading ? "Creating account..." : "Create account"}
          </PrimaryButton>

          <Divider>
            <span>or</span>
          </Divider>

          <GoogleAuthButton
            text="signup_with"
            context="signup"
            onCredential={handleGoogleSignup}
            onError={form.setGlobalError}
            disabled={form.loading}
          />
        </AuthForm>

        <AuthFooter>
          Already have an account?{" "}
          <Link href="/login" passHref legacyBehavior>
            <AuthLink>Sign in</AuthLink>
          </Link>
        </AuthFooter>
      </AuthLayout>
    </>
  );
}
