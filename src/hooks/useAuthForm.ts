import { useState, useCallback } from "react";

/**
 * Lightweight form hook for auth pages.
 * Manages field values, field-level errors, and a global error/success message.
 */
export function useAuthForm<T extends Record<string, string>>(initial: T) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [globalError, setGlobalError] = useState("");
  const [globalSuccess, setGlobalSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const setValue = useCallback(
    (field: keyof T, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      // Clear field error on change
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    []
  );

  const setFieldError = useCallback(
    (field: keyof T, message: string) =>
      setErrors((prev) => ({ ...prev, [field]: message })),
    []
  );

  const resetMessages = useCallback(() => {
    setGlobalError("");
    setGlobalSuccess("");
  }, []);

  return {
    values,
    errors,
    globalError,
    globalSuccess,
    loading,
    setValue,
    setFieldError,
    setErrors,
    setGlobalError,
    setGlobalSuccess,
    setLoading,
    resetMessages,
  };
}
