import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useAppSelector } from "@/store/hooks";
import {
  getGoogleClientId,
  isGoogleAuthConfigured,
  loadGoogleIdentityScript,
} from "@/utils/google-identity";
import GoogleIcon from "./GoogleIcon";
import { GoogleButton } from "./styles";

type GoogleButtonText = "signin_with" | "signup_with" | "continue_with";
type GoogleButtonContext = "signin" | "signup";

interface GoogleAuthButtonProps {
  text: GoogleButtonText;
  context: GoogleButtonContext;
  onCredential: (credential: string) => Promise<void> | void;
  onError: (message: string) => void;
  disabled?: boolean;
}

const MAX_BUTTON_WIDTH = 400;

const ButtonShell = styled.div<{ $disabled?: boolean }>`
  width: 100%;
  min-height: 46px;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.65;
      pointer-events: none;
    `}
`;

const GoogleButtonHost = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

function getFallbackLabel(text: GoogleButtonText) {
  if (text === "signin_with") return "Sign in with Google";
  if (text === "signup_with") return "Sign up with Google";
  return "Continue with Google";
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  text,
  context,
  onCredential,
  onError,
  disabled = false,
}) => {
  const themeName = useAppSelector((s) => s.ui.themeName);
  const shellRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const handlersRef = useRef({ onCredential, onError });
  const initializedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [buttonWidth, setButtonWidth] = useState(0);
  const clientId = getGoogleClientId();
  const isConfigured = isGoogleAuthConfigured();
  const fallbackLabel = getFallbackLabel(text);

  useEffect(() => {
    handlersRef.current = { onCredential, onError };
  }, [onCredential, onError]);

  useEffect(() => {
    if (!shellRef.current) return;

    const updateWidth = () => {
      if (!shellRef.current) return;

      const nextWidth = Math.min(
        MAX_BUTTON_WIDTH,
        Math.floor(shellRef.current.clientWidth)
      );

      setButtonWidth((prev) => (prev === nextWidth ? prev : nextWidth));
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(shellRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isConfigured) {
      setIsReady(false);
      setLoadError("");
      return;
    }

    let cancelled = false;

    loadGoogleIdentityScript()
      .then(() => {
        if (cancelled) return;
        setLoadError("");
        setIsReady(true);
      })
      .catch((error) => {
        if (cancelled) return;
        setIsReady(false);
        setLoadError(
          error instanceof Error
            ? error.message
            : "Failed to load Google Sign-In."
        );
      });

    return () => {
      cancelled = true;
    };
  }, [isConfigured]);

  useEffect(() => {
    if (
      !isConfigured ||
      !isReady ||
      initializedRef.current ||
      !window.google?.accounts?.id
    ) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      context,
      use_fedcm_for_button: true,
      callback: async (response) => {
        const credential = response.credential?.trim();

        if (!credential) {
          handlersRef.current.onError(
            "Google did not return a valid credential."
          );
          return;
        }

        try {
          await handlersRef.current.onCredential(credential);
        } catch (error) {
          handlersRef.current.onError(
            error instanceof Error
              ? error.message
              : "Google Sign-In failed. Please try again."
          );
        }
      },
    });

    initializedRef.current = true;
  }, [clientId, context, isConfigured, isReady]);

  useEffect(() => {
    if (
      !isConfigured ||
      !isReady ||
      !buttonWidth ||
      !hostRef.current ||
      !window.google?.accounts?.id
    ) {
      return;
    }

    hostRef.current.innerHTML = "";
    window.google.accounts.id.renderButton(hostRef.current, {
      type: "standard",
      theme: themeName === "dark" ? "filled_black" : "outline",
      size: "large",
      text,
      shape: "rectangular",
      logo_alignment: "left",
      width: String(buttonWidth),
    });
  }, [buttonWidth, isConfigured, isReady, text, themeName]);

  if (!isConfigured) {
    return (
      <GoogleButton
        type="button"
        onClick={() =>
          onError(
            "Google Sign-In is not configured. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your environment."
          )
        }
        disabled={disabled}
      >
        <GoogleIcon />
        {fallbackLabel}
      </GoogleButton>
    );
  }

  if (loadError) {
    return (
      <GoogleButton
        type="button"
        onClick={() => onError(loadError)}
        disabled={disabled}
      >
        <GoogleIcon />
        {fallbackLabel}
      </GoogleButton>
    );
  }

  return (
    <ButtonShell ref={shellRef} $disabled={disabled}>
      {isReady ? (
        <GoogleButtonHost ref={hostRef} />
      ) : (
        <GoogleButton type="button" disabled>
          <GoogleIcon />
          Connecting to Google...
        </GoogleButton>
      )}
    </ButtonShell>
  );
};

export default GoogleAuthButton;
