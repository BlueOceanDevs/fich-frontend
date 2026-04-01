import api from "./client";
import type { ApiResponse, ApiResponseOf, UserInfo, SetNameRequest, OnboardingStatusDto } from "./types";
import { validateImageFile } from "../utils/validate-image";

// ─────────────────────────────────────────────
// User API
// ─────────────────────────────────────────────

export const userApi = {
  getUserInfo() {
    return api.get<ApiResponseOf<UserInfo>>("/user/GetUserInfo");
  },

  setDisplayName(displayName: string) {
    return api.put<ApiResponse>("/user/SetDisplayName", null, {
      params: { diplayName: displayName }, // matches backend query param spelling
    });
  },

  setName(data: SetNameRequest) {
    return api.put<ApiResponse>("/user/SetName", data);
  },

  getOnboardingStatus() {
    return api.get<ApiResponseOf<OnboardingStatusDto>>("/user/OnboardingStatus");
  },

  /**
   * Validates the image client-side before uploading.
   * Throws an Error if the file is invalid so the caller can show it in the UI.
   */
  setAvatarImage(file: File) {
    const result = validateImageFile(file);
    if (!result.valid) {
      throw new Error(result.error);
    }

    const form = new FormData();
    form.append("Image", file);
    return api.post<ApiResponse>("/user/SetAvatarImage", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
