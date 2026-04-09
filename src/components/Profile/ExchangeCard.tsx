import React, { useEffect, useState } from "react";
import {
  FaExchangeAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import { exchangeApi } from "@/api/exchange";
import { userApi } from "@/api/user";
import ConnectExchangeModal from "@/components/Setup/ConnectExchangeModal";
import type { ExchangeConnectionDto, OnboardingStatusDto } from "@/api/types";
import { formatDate } from "./helpers";
import {
  FullWidthCard,
  CardTitle,
  EmptyState,
  ExchangeStatusRow,
  ExchangeIcon,
  ExchangeInfo,
  ExchangeName,
  ExchangeStatusText,
  ExchangeDetail,
  ExchangeDetailRow,
  ExchangeDetailLabel,
  ExchangeDetailValue,
  ExchangeError,
  ExchangeActions,
  ExchangeActionBtn,
} from "./styles";

interface ExchangeCardProps {
  onStatusChange?: () => void;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({ onStatusChange }) => {
  const [exchange, setExchange] = useState<ExchangeConnectionDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchStatus = async () => {
    try {
      const { data } = await exchangeApi.getStatus();
      if (data.isSuccess) {
        setExchange(data.data ?? null);
      }
    } catch {
      // no connection
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect your exchange? This will stop all trading.")) return;
    setDisconnecting(true);
    setErrorMsg("");
    try {
      await exchangeApi.disconnect();
      setExchange(null);
      onStatusChange?.();
    } catch {
      setErrorMsg("Failed to disconnect exchange.");
    } finally {
      setDisconnecting(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setLoading(true);
    fetchStatus();
    onStatusChange?.();
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "Active": return <FaCheckCircle />;
      case "Pending": return <FaClock />;
      case "Invalid": return <FaTimesCircle />;
      default: return <FaExchangeAlt />;
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "Active": return "Connected";
      case "Pending": return "Validating...";
      case "Invalid": return "Connection Failed";
      default: return "Not Connected";
    }
  };

  return (
    <>
      <FullWidthCard>
        <CardTitle>
          <FaExchangeAlt size={16} />
          Exchange Connection
        </CardTitle>

        {loading ? (
          <EmptyState>Loading exchange status...</EmptyState>
        ) : exchange ? (
          <>
            <ExchangeStatusRow>
              <ExchangeIcon $status={exchange.status}>
                {statusIcon(exchange.status)}
              </ExchangeIcon>
              <ExchangeInfo>
                <ExchangeName>{exchange.exchangeType || "Binance"}</ExchangeName>
                <ExchangeStatusText $status={exchange.status}>
                  {statusLabel(exchange.status)}
                </ExchangeStatusText>
              </ExchangeInfo>
            </ExchangeStatusRow>

            <ExchangeDetail>
              {exchange.binanceUid && (
                <ExchangeDetailRow>
                  <ExchangeDetailLabel>Binance UID</ExchangeDetailLabel>
                  <ExchangeDetailValue>{exchange.binanceUid}</ExchangeDetailValue>
                </ExchangeDetailRow>
              )}
              <ExchangeDetailRow>
                <ExchangeDetailLabel>Connected</ExchangeDetailLabel>
                <ExchangeDetailValue>
                  {exchange.createdAt ? formatDate(exchange.createdAt) : "\u2014"}
                </ExchangeDetailValue>
              </ExchangeDetailRow>
              {exchange.lastValidatedAt && (
                <ExchangeDetailRow>
                  <ExchangeDetailLabel>Last Validated</ExchangeDetailLabel>
                  <ExchangeDetailValue>{formatDate(exchange.lastValidatedAt)}</ExchangeDetailValue>
                </ExchangeDetailRow>
              )}
            </ExchangeDetail>

            {exchange.status === "Invalid" && exchange.lastValidationError && (
              <ExchangeError>
                <FaExclamationTriangle style={{ marginRight: 6 }} />
                {exchange.lastValidationError}
              </ExchangeError>
            )}

            {errorMsg && (
              <ExchangeError>{errorMsg}</ExchangeError>
            )}

            <ExchangeActions>
              {exchange.status === "Invalid" && (
                <ExchangeActionBtn onClick={() => setShowModal(true)}>
                  Reconnect
                </ExchangeActionBtn>
              )}
              {exchange.status === "Pending" && (
                <ExchangeActionBtn onClick={() => setShowModal(true)}>
                  Check Status
                </ExchangeActionBtn>
              )}
              <ExchangeActionBtn
                $variant="danger"
                onClick={handleDisconnect}
                disabled={disconnecting}
              >
                {disconnecting ? "Disconnecting..." : "Disconnect"}
              </ExchangeActionBtn>
            </ExchangeActions>
          </>
        ) : (
          <>
            <EmptyState>
              No exchange connected. Connect your Binance account to start trading.
            </EmptyState>
            <ExchangeActions>
              <ExchangeActionBtn onClick={() => setShowModal(true)}>
                Connect Exchange
              </ExchangeActionBtn>
            </ExchangeActions>
          </>
        )}
      </FullWidthCard>

      {showModal && (
        <ConnectExchangeModal
          onClose={handleModalClose}
          strategy={exchange?.strategySlug ?? ""}
          strategyId={exchange?.strategyId ?? 0}
          onSuccess={handleModalClose}
        />
      )}
    </>
  );
};

export default ExchangeCard;
