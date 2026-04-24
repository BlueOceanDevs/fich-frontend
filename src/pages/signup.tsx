import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from "@/store/hooks";
import { setAuthenticated, fetchUser } from "@/store/authSlice";
import { authApi } from "@/api/auth";
import { useAuthForm } from "@/hooks/useAuthForm";
import { getPostLoginRoute } from "@/utils/post-login-redirect";
import AuthLayout from "@/components/Auth/AuthLayout";
import GoogleAuthButton from "@/components/Auth/GoogleAuthButton";
import CountrySelect from "@/components/ui/CountrySelect";
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
  Divider,
  AuthFooter,
  AuthLink,
  Alert,
} from "@/components/Auth/styles";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  // FirstName/LastName were removed from the profile model. Signup now
  // collects email + password + (optionally) an ISO 3166-1 alpha-2
  // country code. Country is skippable and can be set later from the
  // profile page.
  const form = useAuthForm({
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const validate = (): boolean => {
    let valid = true;
    const { email, password, confirmPassword } = form.values;

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

    // Country is optional — empty string means "prefer not to say"
    // and maps to null on the API.
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.resetMessages();
    if (!validate()) return;

    form.setLoading(true);
    try {
      await authApi.register({
        email: form.values.email.trim(),
        password: form.values.password,
        country: form.values.country || undefined,
      });
      dispatch(setAuthenticated());
      dispatch(fetchUser());
      const dest = await getPostLoginRoute();
      router.push(dest);
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
      const dest = await getPostLoginRoute();
      router.push(dest);
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
            <Label htmlFor="country">Country (optional)</Label>
            {/* Searchable combobox — type to filter the ~250-entry ISO
                list. Empty value means "Prefer not to say" and maps to
                null on the API request. */}
            <CountrySelect
              id="country"
              value={form.values.country}
              onChange={(code) => form.setValue("country", code)}
              autoComplete="country"
            />
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
