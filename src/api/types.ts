// ─────────────────────────────────────────────
// Base API response
// ─────────────────────────────────────────────

export interface ApiResponse {
  isSuccess: boolean;
  successMessage?: string | null;
  errors?: string[];
}

export interface ApiResponseOf<T> extends ApiResponse {
  data?: T | null;
}

// ─────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface ConfirmEmailRequest {
  userId: string;
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  userId: string;
  token: string;
  newPassword: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

// ─────────────────────────────────────────────
// User
// ─────────────────────────────────────────────

export interface UserInfo {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  imageUrl: string | null;
  roles: string[];
  isEmailConfirmed: boolean;
}

export interface SetNameRequest {
  firstName: string;
  lastName: string;
}
