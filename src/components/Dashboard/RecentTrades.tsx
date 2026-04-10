import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { tradesApi } from "@/api/trades";
import type { TradeOrderDto } from "@/api/types";
import {
  RecentTradesCard,
  CardTitle,
  CardTitleRow,
  ViewAllLink,
  TableScroll,
  Table,
  Th,
  ThRight,
  Td,
  TdRight,
  StatusBadge,
  SideBadge,
  EmptyState,
} from "./styles";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "\u2014";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

const RecentTrades: React.FC = () => {
  const [trades, setTrades] = useState<TradeOrderDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tradesApi
      .getMyOrders(1, 8)
      .then(({ data }) => {
        if (data.isSuccess && data.data) setTrades(data.data.items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <RecentTradesCard>
      <CardTitleRow>
        <CardTitle style={{ marginBottom: 0 }}>Recent Trades</CardTitle>
        <Link href="/dashboard/trades" passHref legacyBehavior>
          <ViewAllLink>
            View all <FaArrowRight size={10} />
          </ViewAllLink>
        </Link>
      </CardTitleRow>

      {loading ? (
        <EmptyState>Loading trades...</EmptyState>
      ) : trades.length === 0 ? (
        <EmptyState>No trades yet. Your trade history will appear here.</EmptyState>
      ) : (
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Symbol</Th>
                <Th>Side</Th>
                <Th>Status</Th>
                <ThRight>Quantity</ThRight>
                <ThRight>Price</ThRight>
                <Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t) => (
                <tr key={t.id}>
                  <Td style={{ fontWeight: 600 }}>{t.symbol}</Td>
                  <Td>
                    <SideBadge $side={t.side}>{t.side}</SideBadge>
                  </Td>
                  <Td>
                    <StatusBadge $status={t.status}>{t.status}</StatusBadge>
                  </Td>
                  <TdRight>{t.filledQuantity > 0 ? t.filledQuantity.toFixed(6) : t.requestedQuantity.toFixed(6)}</TdRight>
                  <TdRight>
                    {t.avgFillPrice != null ? `$${t.avgFillPrice.toFixed(2)}` : `$${t.requestedPrice.toFixed(2)}`}
                  </TdRight>
                  <Td>{formatDate(t.createdAt)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScroll>
      )}
    </RecentTradesCard>
  );
};

export default RecentTrades;
