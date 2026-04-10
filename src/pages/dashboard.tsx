import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import { useAppSelector } from "@/store/hooks";
import { DashboardSection } from "@/components/Dashboard/styles";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <>
      <Head>
        <title>Dashboard - Fich</title>
      </Head>
      <Layout>
        <DashboardSection>
          <Dashboard />
        </DashboardSection>
      </Layout>
    </>
  );
}
