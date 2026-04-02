import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FaTimes,
  FaShieldAlt,
  FaCheck,
  FaExternalLinkAlt,
  FaArrowRight,
} from "react-icons/fa";
import { exchangeApi } from "@/api/exchange";
import { Spinner } from "@/components/ui/Button";
import {
  ModalOverlay,
  ModalCard,
  ModalClose,
  ModalTitle,
  ExchangeList,
  ExchangeOption,
  ExchangeIcon,
  ExchangeName,
  ComingSoonTag,
  TrustNote,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
  FormAlert,
  ConnectButton,
  StatusRow,
  StatusDot,
  StepSection,
  StepHeader,
  ModalStepBadge,
  StepTitle,
  PermissionsBox,
  PermissionRow,
  PermissionCheck,
  PermissionCross,
  ExternalLink,
  IpNote,
  SuccessIllustration,
  SuccessTitle,
  SuccessMessage,
  IpList,
} from "./styles";

// ─────────────────────────────────────────────
// Exchange list
// ─────────────────────────────────────────────

const EXCHANGES = [
  { id: "binance", name: "Binance", bg: "#F0B90B", letter: "B", enabled: true },
  { id: "coinbase", name: "Coinbase", bg: "#0052FF", letter: "C", enabled: false },
  { id: "crypto-com", name: "Crypto.com", bg: "#002D74", letter: "C", enabled: false },
  { id: "bybit", name: "Bybit", bg: "#1E1E2D", letter: "B", enabled: false },
  { id: "kucoin", name: "Kucoin", bg: "#23AF91", letter: "K", enabled: false },
];

const SERVER_IP = "94.130.110.37";

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

interface Props {
  onClose: () => void;
  strategy: string;
  /** If provided, called on success instead of navigating to choose-plan */
  onSuccess?: () => void;
}

type Step = "select" | "keys" | "success";

export default function ConnectExchangeModal({ onClose, strategy, onSuccess }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("select");
  const [selectedExchange, setSelectedExchange] = useState<string>("binance");

  // Key form state
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  // true = status loaded from a previous attempt, false = status from current session
  const [isPreviousAttempt, setIsPreviousAttempt] = useState(false);

  // Check if a connection already exists on mount
  useEffect(() => {
    let cancelled = false;

    async function checkExisting() {
      try {
        const { data } = await exchangeApi.getStatus();
        if (cancelled) return;
        if (data.isSuccess && data.data) {
          setStatus(data.data.status);
          setValidationError(data.data.lastValidationError);

          if (data.data.status === "Active") {
            setStep("success");
          } else {
            // Mark as a leftover from a previous attempt
            setIsPreviousAttempt(true);
          }
        }
      } catch {
        // No existing connection — that's fine
      }
    }

    checkExisting();
    return () => { cancelled = true; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleExchangeSelect = (id: string, enabled: boolean) => {
    if (!enabled) return;
    setSelectedExchange(id);
  };

  const handleContinueToKeys = () => {
    if (!selectedExchange) return;
    setStep("keys");
  };

  const handleConnect = async () => {
    setErrors({});
    setApiError("");

    const trimmedKey = apiKey.trim();
    const trimmedSecret = apiSecret.trim();

    const newErrors: Record<string, string> = {};
    if (!trimmedKey) newErrors.apiKey = "API Key is required";
    if (!trimmedSecret) newErrors.apiSecret = "API Secret is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setIsPreviousAttempt(false);

    try {
      // Connect handles both new connections and retries after failed attempts.
      // If a Pending/Invalid connection exists, the backend updates it in-place.
      const { data } = await exchangeApi.connect({
        apiKey: trimmedKey,
        apiSecret: trimmedSecret,
      });

      if (data.isSuccess && data.data) {
        const conn = data.data;
        setStatus(conn.status);
        setValidationError(conn.lastValidationError);

        if (conn.status === "Active") {
          setStep("success");
        }
        // If Pending or Invalid, stay on keys step — status is shown in the form
      } else {
        setApiError(data.errors?.[0] ?? "Failed to connect exchange.");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.errors?.[0] ??
        "Failed to connect. Please check your keys and try again.";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRetryValidation = async () => {
    setLoading(true);
    setApiError("");

    try {
      const { data } = await exchangeApi.validate();

      if (data.isSuccess && data.data) {
        setStatus(data.data.status);
        setValidationError(data.data.lastValidationError);

        if (data.data.status === "Active") {
          setStep("success");
        }
      } else {
        setApiError(data.errors?.[0] ?? "Validation failed.");
      }
    } catch (err: any) {
      setApiError(
        err.response?.data?.errors?.[0] ?? "Validation request failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContinueAfterSuccess = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      router.push(`/setup/choose-plan?strategy=${strategy}`);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalClose onClick={onClose}>
          <FaTimes size={16} />
        </ModalClose>

        {/* ────── Step: Select Exchange ────── */}
        {step === "select" && (
          <>
            <ModalTitle>Choose Your Exchange</ModalTitle>

            <ExchangeList>
              {EXCHANGES.map((ex) => (
                <ExchangeOption
                  key={ex.id}
                  $selected={selectedExchange === ex.id}
                  $disabled={!ex.enabled}
                  onClick={() => handleExchangeSelect(ex.id, ex.enabled)}
                >
                  <ExchangeIcon $bg={ex.bg}>{ex.letter}</ExchangeIcon>
                  <ExchangeName>{ex.name}</ExchangeName>
                  {!ex.enabled && <ComingSoonTag>Coming soon</ComingSoonTag>}
                </ExchangeOption>
              ))}
            </ExchangeList>

            <TrustNote>
              <FaShieldAlt size={14} />
              Your funds stay on your exchange. Fich only trades — it can&apos;t
              withdraw.
            </TrustNote>

            <ConnectButton
              $loading={false}
              disabled={!selectedExchange}
              onClick={handleContinueToKeys}
            >
              Continue
            </ConnectButton>
          </>
        )}

        {/* ────── Step: API Keys Form ────── */}
        {step === "keys" && (
          <>
            <ModalTitle>Connect Binance</ModalTitle>

            {/* Step 1: Create API keys */}
            <StepSection>
              <StepHeader>
                <ModalStepBadge>1</ModalStepBadge>
                <StepTitle>Create API keys on Binance</StepTitle>
              </StepHeader>

              <ExternalLink
                href="https://www.binance.com/en/my/settings/api-management"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Binance API Management <FaExternalLinkAlt size={10} />
              </ExternalLink>

              <PermissionsBox>
                <span style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: "block" }}>
                  Required permissions:
                </span>
                <PermissionRow>
                  <PermissionCheck><FaCheck size={9} /></PermissionCheck>
                  Enable Spot &amp; Margin Trading
                </PermissionRow>
                <PermissionRow $danger>
                  <PermissionCross><FaTimes size={9} /></PermissionCross>
                  Disable Withdrawals
                </PermissionRow>
              </PermissionsBox>

              <IpNote>
                For <strong>Trusted IPs</strong>, add our server IP:
              </IpNote>
              <IpList>{SERVER_IP}</IpList>
            </StepSection>

            {/* Step 2: Paste keys */}
            <StepSection>
              <StepHeader>
                <ModalStepBadge>2</ModalStepBadge>
                <StepTitle>Paste your keys</StepTitle>
              </StepHeader>

              {apiError && (
                <FormAlert $variant="error">{apiError}</FormAlert>
              )}

              {status === "Pending" && (
                <FormAlert $variant="warning">
                  {isPreviousAttempt
                    ? "Your previous connection attempt couldn\u2019t reach Binance for validation. Please enter your keys below to try again."
                    : "Keys saved but Binance couldn\u2019t be reached for validation. You can retry or continue later."}
                </FormAlert>
              )}

              {status === "Invalid" && validationError && (
                <FormAlert $variant="error">
                  {isPreviousAttempt
                    ? `Your previous API keys failed: ${validationError} — enter new keys below to try again.`
                    : validationError}
                </FormAlert>
              )}

              {status && (
                <StatusRow>
                  <StatusDot $status={status} />
                  Status: {status}
                  {status === "Pending" && (
                    <button
                      onClick={handleRetryValidation}
                      disabled={loading}
                      style={{
                        marginLeft: "auto",
                        background: "none",
                        border: "none",
                        color: "inherit",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      Retry
                    </button>
                  )}
                </StatusRow>
              )}

              <form autoComplete="off">
                <FormGroup>
                  <FormLabel htmlFor="apiKey">API Key</FormLabel>
                  <FormInput
                    id="apiKey"
                    name="apiKey"
                    type="text"
                    placeholder="Paste your Binance API key"
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setErrors((prev) => {
                        const { apiKey: _, ...rest } = prev;
                        return rest;
                      });
                    }}
                    $hasError={!!errors.apiKey}
                    autoComplete="new-password"
                  />
                  {errors.apiKey && <FormError>{errors.apiKey}</FormError>}
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="apiSecret">Secret Key</FormLabel>
                  <FormInput
                    id="apiSecret"
                    name="apiSecret"
                    type="password"
                    placeholder="Paste your Binance secret key"
                    value={apiSecret}
                    onChange={(e) => {
                      setApiSecret(e.target.value);
                      setErrors((prev) => {
                        const { apiSecret: _, ...rest } = prev;
                        return rest;
                      });
                    }}
                    $hasError={!!errors.apiSecret}
                    autoComplete="new-password"
                  />
                  {errors.apiSecret && <FormError>{errors.apiSecret}</FormError>}
                </FormGroup>
              </form>

              <ConnectButton
                $loading={loading}
                disabled={loading}
                onClick={handleConnect}
              >
                {loading && <Spinner />}
                {loading
                  ? "Connecting..."
                  : status === "Pending"
                    ? "Update Keys & Retry"
                    : "Connect Exchange"}
              </ConnectButton>
            </StepSection>

            <TrustNote>
              <FaShieldAlt size={14} />
              Your funds stay on Binance. Fich only trades — it can&apos;t withdraw.
            </TrustNote>
          </>
        )}

        {/* ────── Step: Success ────── */}
        {step === "success" && (
          <>
            <SuccessIllustration>
              <span role="img" aria-label="thumbs up" style={{ fontSize: 64 }}>
                👍
              </span>
            </SuccessIllustration>

            <SuccessTitle>Binance is integrating</SuccessTitle>
            <SuccessMessage>
              Congratulations! Follow the further steps to setup Fich on your
              account.
            </SuccessMessage>

            <ConnectButton $loading={false} onClick={handleContinueAfterSuccess}>
              Continue <FaArrowRight size={14} />
            </ConnectButton>
          </>
        )}
      </ModalCard>
    </ModalOverlay>
  );
}
