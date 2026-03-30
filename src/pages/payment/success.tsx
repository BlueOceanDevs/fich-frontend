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

const Icon = styled.div`
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
  const isPending = !order || ["Waiting", "Confirming", "Confirmed", "Sending"].includes(order.status);

  return (
    <>
      <Head>
        <title>Payment {isFinished ? "Successful" : "Processing"} - Fich</title>
      </Head>
      <Layout>
        <PageSection>
          <Card>
            <Icon>{isFinished ? "✓" : "⏳"}</Icon>
            <Title>
              {isFinished ? "Payment Successful!" : "Processing Payment..."}
            </Title>
            <Desc>
              {isFinished
                ? `Your ${order?.planName} subscription is now active.`
                : "Your payment is being processed. This may take a few minutes for blockchain confirmations."}
            </Desc>
            <StatusText $pending={isPending}>
              Status: {statusLabel}
              {polling && isPending && " (checking...)"}
            </StatusText>
            {isFinished && (
              <Link href="/profile" passHref legacyBehavior>
                <ActionLink>Go to Profile</ActionLink>
              </Link>
            )}
            {!polling && !isFinished && (
              <Desc style={{ fontSize: 13 }}>
                Don&apos;t worry — your subscription will activate automatically once the payment confirms.
                You can check your order status on your profile.
              </Desc>
            )}
          </Card>
        </PageSection>
      </Layout>
    </>
  );
}
