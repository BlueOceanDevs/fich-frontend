import api from "./client";
import type {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  ConfirmEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  GoogleLoginRequest,
} from "./types";

// ─────────────────────────────────────────────
// Auth API  –  all cookie-based, no tokens in JS
// ─────────────────────────────────────────────

export const authApi = {
  login(data: LoginRequest) {
    return api.post<ApiResponse>("/auth/Login", data);
  },

  register(data: RegisterRequest) {
    return api.post<ApiResponse>("/auth/RegisterPerson", data);
  },

  refresh() {
    return api.post<ApiResponse>("/auth/Refresh");
  },

  logout() {
    return api.post<ApiResponse>("/auth/Logout");
  },

  confirmEmail(data: ConfirmEmailRequest) {
    return api.post<ApiResponse>("/auth/ConfirmEmail", data);
  },

  resendConfirmationEmail() {
    return api.post<ApiResponse>("/auth/ResendConfirmationEmail");
  },

  forgotPassword(data: ForgotPasswordRequest) {
    return api.post<ApiResponse>("/auth/ForgotPassword", data);
  },

  resetPassword(data: ResetPasswordRequest) {
    return api.post<ApiResponse>("/auth/ResetPassword", data);
  },

  googleLogin(data: GoogleLoginRequest) {
    return api.post<ApiResponse>("/auth/GoogleLogin", data);
  },
};
