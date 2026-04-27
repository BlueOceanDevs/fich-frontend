import api from "./client";
import type {
  ApiResponse,
  ApiResponseOf,
  LoginRequest,
  RegisterRequest,
  ConfirmEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  GoogleLoginRequest,
  UnsubscribeStatusDto,
  UnsubscribeRequest,
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
    return api.post<ApiResponseOf<number>>("/auth/ResendConfirmationEmail");
  },

  getConfirmationCooldown() {
    return api.get<ApiResponseOf<number>>("/auth/ConfirmationCooldown");
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

  // ── Marketing-email unsubscribe (public, anonymous, signed-token) ──
  //
  // Companion to the admin Bulk Email feature. Tokens come from the
  // unsubscribe footer of every broadcast email; they're HMAC-signed and
  // bound to a userId, so the link works forever from any browser, no
  // session required.

  getUnsubscribeStatus(token: string) {
    return api.get<ApiResponseOf<UnsubscribeStatusDto>>(
      "/auth/UnsubscribeStatus",
      { params: { token } },
    );
  },

  unsubscribe(data: UnsubscribeRequest) {
    return api.post<ApiResponse>("/auth/Unsubscribe", data);
  },
};
