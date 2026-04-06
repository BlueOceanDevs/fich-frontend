import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FaEnvelope } from "react-icons/fa";
import { authApi } from "@/api/auth";
import { useAppSelector } from "@/store/hooks";

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  margin-bottom: 24px;
  background: rgba(234, 179, 8, 0.08);
  border: 1px solid rgba(234, 179, 8, 0.25);
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const BannerIcon = styled.div`
  color: #eab308;
  font-size: 18px;
  flex-shrink: 0;
`;

const BannerTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const BannerTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const BannerHint = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ResendButton = styled.button<{ $disabled?: boolean }>`
  padding: 8px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 13px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  border: 1px solid #eab308;
  background: transparent;
  color: #eab308;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(234, 179, 8, 0.1);
  }
`;

const SuccessText = styled.span`
  font-size: 13px;
  color: #00d897;
  font-weight: 500;
  white-space: nowrap;
`;

const EmailConfirmationBanner: React.FC = () => {
  const { user } = useAppSelector((s) => s.auth);
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Fetch initial cooldown from server
  useEffect(() => {
    if (!user || user.isEmailConfirmed) return;
    authApi
      .getConfirmationCooldown()
      .then(({ data }) => {
        if (data.isSuccess && data.data && data.data > 0) {
          setCooldown(data.data);
        }
      })
      .catch(() => {});
  }, [user]);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || sending) return;
    setSending(true);
    setSent(false);
    try {
      const { data } = await authApi.resendConfirmationEmail();
      setSent(true);
      if (data.isSuccess && data.data && data.data > 0) {
        setCooldown(data.data);
      }
    } catch (err: any) {
      // If server returns cooldown remaining in the error, parse and start countdown
      const errorMsg: string = err.response?.data?.errors?.[0] ?? "";
      const pipeIdx = errorMsg.lastIndexOf("|");
      if (pipeIdx !== -1) {
        const seconds = parseInt(errorMsg.substring(pipeIdx + 1), 10);
        if (!isNaN(seconds) && seconds > 0) {
          setCooldown(seconds);
        }
      }
    } finally {
      setSending(false);
    }
  }, [cooldown, sending]);

  if (!user || user.isEmailConfirmed) return null;

  const buttonLabel =
    cooldown > 0
      ? `Resend (${cooldown}s)`
      : sending
        ? "Sending..."
        : "Resend email";

  return (
    <Banner>
      <BannerContent>
        <BannerIcon>
          <FaEnvelope />
        </BannerIcon>
        <BannerTextWrap>
          <BannerTitle>Confirm your email address</BannerTitle>
          <BannerHint>
            We sent a confirmation link to {user.email}. Check your inbox to
            verify your account.
          </BannerHint>
        </BannerTextWrap>
      </BannerContent>
      {sent && cooldown > 0 ? (
        <SuccessText>Sent! Check your inbox ({cooldown}s)</SuccessText>
      ) : (
        <ResendButton
          onClick={handleResend}
          disabled={cooldown > 0 || sending}
          $disabled={cooldown > 0 || sending}
        >
          {buttonLabel}
        </ResendButton>
      )}
    </Banner>
  );
};

export default EmailConfirmationBanner;
