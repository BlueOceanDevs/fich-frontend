import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Layout from "@/components/Layout";

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
  margin-bottom: 28px;
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

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export default function PaymentCancelPage() {
  return (
    <>
      <Head>
        <title>Payment Cancelled - Fich</title>
      </Head>
      <Layout>
        <PageSection>
          <Card>
            <Icon>✕</Icon>
            <Title>Payment Cancelled</Title>
            <Desc>
              Your payment was cancelled. No charges have been made.
              You can try again anytime from our pricing page.
            </Desc>
            <Link href="/#pricing" passHref legacyBehavior>
              <ActionLink>Back to Plans</ActionLink>
            </Link>
          </Card>
        </PageSection>
      </Layout>
    </>
  );
}
