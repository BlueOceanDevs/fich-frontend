import React, { useEffect, useState } from "react";
import { tradesApi } from "@/api/trades";
import type { TradeOrderDto } from "@/api/types";
import {
  TableScroll,
  Table,
  Th,
  ThRight,
  Td,
  TdRight,
  StatusBadge,
  SideBadge,
  EmptyState,
  PaginationRow,
  PagBtn,
  PagText,
} from "./styles";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "\u2014";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const TradeHistory: React.FC = () => {
  const [orders, setOrders] = useState<TradeOrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = (p: number) => {
    setLoading(true);
    tradesApi
      .getMyOrders(p, 25)
      .then(({ data }) => {
        if (data.isSuccess && data.data) {
          setOrders(data.data.items);
          setTotalPages(data.data.totalPages);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  if (loading) return <EmptyState>Loading trades...</EmptyState>;

  if (orders.length === 0)
    return <EmptyState>No trade orders yet. Once signals are processed, your trades will appear here.</EmptyState>;

  return (
    <>
      <TableScroll>
        <Table>
          <thead>
            <tr>
              <Th>Symbol</Th>
              <Th>Side</Th>
              <Th>Status</Th>
              <ThRight>Req Qty</ThRight>
              <ThRight>Filled</ThRight>
              <ThRight>Price</ThRight>
              <ThRight>Avg Fill</ThRight>
              <ThRight>Retries</ThRight>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <Td style={{ fontWeight: 600 }}>{o.symbol}</Td>
                <Td>
                  <SideBadge $side={o.side}>{o.side}</SideBadge>
                </Td>
                <Td>
                  <StatusBadge $status={o.status}>{o.status}</StatusBadge>
                </Td>
                <TdRight>{o.requestedQuantity.toFixed(6)}</TdRight>
                <TdRight>{o.filledQuantity.toFixed(6)}</TdRight>
                <TdRight>${o.requestedPrice.toFixed(4)}</TdRight>
                <TdRight>{o.avgFillPrice != null ? `$${o.avgFillPrice.toFixed(4)}` : "\u2014"}</TdRight>
                <TdRight>{o.retryCount}</TdRight>
                <Td>{formatDate(o.createdAt)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableScroll>

      {totalPages > 1 && (
        <PaginationRow>
          <PagBtn disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</PagBtn>
          <PagText>Page {page} of {totalPages}</PagText>
          <PagBtn disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</PagBtn>
        </PaginationRow>
      )}
    </>
  );
};

export default TradeHistory;
