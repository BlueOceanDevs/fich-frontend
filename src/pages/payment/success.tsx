import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import Layout from "@/components/Layout";
import { ordersApi } from "@/api/orders";
import { useAppDispatch } from "@/store/hooks";
import { fetchSubscription } from "@/store/subscriptionSlice";
import type { OrderDto } from "@/api/types";

const PageSection = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  background: radial-gradient(
      circle at top,
      ${({ theme }) => `${theme.colors.primary}14`} 0%,
      transparent 34%
    ),
    ${({ theme }) => theme.colors.background};
`;

const Card = styled.div`
  max-width: 520px;
  width: 100%;
  padding: 48px 36px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(0, 216, 151, 0.15);
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 24px;
`;

const ErrorIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Desc = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 8px;
`;

const StatusText = styled.p<{ $pending?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ $pending, theme }) =>
    $pending ? theme.colors.textSecondary : theme.colors.primary};
  margin-bottom: 24px;
`;

const ActionLink = styled.a`
  display: inline-block;
  padding: 12px 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s;
  margin-top: 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const SecondaryLink = styled.a`
  display: inline-block;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 16px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`;

export default function PaymentSuccessPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orderId } = router.query;
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    if (!orderId || typeof orderId !== "string") return;

    const id = parseInt(orderId, 10);
    if (isNaN(id)) return;

    let attempts = 0;
    const maxAttempts = 20;

    const poll = async () => {
      try {
        const { data } = await ordersApi.getOrder(id);
        if (data.isSuccess && data.data) {
          setOrder(data.data);
          const status = data.data.status;
          if (status === "Finished" || status === "Failed" || status === "Expired" || status === "Refunded") {
            setPolling(false);
            if (status === "Finished") {
              dispatch(fetchSubscription());
            }
            return;
          }
        }
      } catch {
        // ignore polling errors
      }

      attempts++;
      if (attempts >= maxAttempts) {
        setPolling(false);
      }
    };

    poll();
    const interval = setInterval(() => {
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setPolling(false);
        return;
      }
      poll();
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, dispatch]);

  const statusLabel = order?.status ?? "Checking...";
  const isFinished = order?.status === "Finished";
  const isFailed = order?.status === "Failed";
  const isExpired = order?.status === "Expired";
  const isRefunded = order?.status === "Refunded";
  const isError = isFailed || isExpired || isRefunded;
  const isPending = !order || ["Waiting", "Confirming", "Confirmed", "Sending"].includes(order.status);

  const errorTitle = isFailed
    ? "Payment Failed"
    : isExpired
    ? "Payment Expired"
    : "Payment Refunded";

  const errorDesc = isFailed
    ? "Your payment could not be processed. This can happen if the transaction was declined or the network encountered an issue. No funds have been charged."
    : isExpired
    ? "The payment window expired before the transaction could be completed. No funds have been charged."
    : "Your payment has been refunded. The funds will be returned to your wallet.";

  const pageTitle = isFinished
    ? "Payment Successful"
    : isError
    ? errorTitle
    : "Payment Processing";

  return (
    <>
      <Head>
        <title>{pageTitle} - Fich</title>
      </Head>
      <Layout>
        <PageSection>
          <Card>
            {/* ── Error State ── */}
            {isError && (
              <>
                <ErrorIcon>✕</ErrorIcon>
                <Title>{errorTitle}</Title>
                <Desc>{errorDesc}</Desc>
                <StatusText>Status: {statusLabel}</StatusText>
                <ButtonGroup>
                  <Link href="/#pricing" passHref legacyBehavior>
                    <ActionLink>Try Again</ActionLink>
                  </Link>
                  <Link href="/contact" passHref legacyBehavior>
                    <SecondaryLink>Need help? Contact support</SecondaryLink>
                  </Link>
                </ButtonGroup>
              </>
            )}

            {/* ── Success State ── */}
            {isFinished && (
              <>
                <SuccessIcon>✓</SuccessIcon>
                <Title>Payment Successful!</Title>
                <Desc>Your {order?.planName} subscription is now active.</Desc>
                <StatusText>Status: {statusLabel}</StatusText>
                <Link href="/profile" passHref legacyBehavior>
                  <ActionLink>Go to Profile</ActionLink>
                </Link>
              </>
            )}

            {/* ── Pending / Polling State ── */}
            {!isFinished && !isError && (
              <>
                <SuccessIcon>⏳</SuccessIcon>
                <Title>Processing Payment...</Title>
                <Desc>
                  Your payment is being processed. This may take a few minutes for blockchain confirmations.
                </Desc>
                <StatusText $pending={isPending}>
                  Status: {statusLabel}
                  {polling && isPending && " (checking...)"}
                </StatusText>
                {!polling && (
                  <ButtonGroup>
                    <Desc style={{ fontSize: 13, marginBottom: 0 }}>
                      Don&apos;t worry — your subscription will activate automatically once the payment confirms.
                    </Desc>
                    <Link href="/dashboard/account" passHref legacyBehavior>
                      <SecondaryLink>Check order status on your account</SecondaryLink>
                    </Link>
                    <Link href="/contact" passHref legacyBehavior>
                      <SecondaryLink>Need help? Contact support</SecondaryLink>
                    </Link>
                  </ButtonGroup>
                )}
              </>
            )}
          </Card>
        </PageSection>
      </Layout>
    </>
  );
}
