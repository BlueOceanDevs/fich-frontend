import api from "./client";
import type { ApiResponse, ApiResponseOf, UserInfo, SetCountryRequest, OnboardingStatusDto } from "./types";
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

  /**
   * Set or clear the user's country (ISO 3166-1 alpha-2 code). Pass
   * `{ country: null }` or an empty string to clear. Replaces the old
   * `setName` endpoint — name fields were removed from the profile.
   */
  setCountry(data: SetCountryRequest) {
    return api.put<ApiResponse>("/user/SetCountry", data);
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
