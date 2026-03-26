const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
]);

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an image file before uploading.
 * Mirrors the backend `UserEntity.ValidateAvatarImage` rules exactly.
 */
export function validateImageFile(file: File): ImageValidationResult {
  if (file.size === 0) {
    return { valid: false, error: "Image file is empty." };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return {
      valid: false,
      error: `Image must be smaller than ${MAX_SIZE_BYTES / (1024 * 1024)} MB.`,
    };
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return {
      valid: false,
      error: "Only JPEG, PNG, WebP, and GIF images are allowed.",
    };
  }

  const ext = file.name.includes(".")
    ? `.${file.name.split(".").pop()?.toLowerCase()}`
    : "";

  if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: "Invalid file extension. Allowed: .jpg, .jpeg, .png, .webp, .gif",
    };
  }

  return { valid: true };
}
