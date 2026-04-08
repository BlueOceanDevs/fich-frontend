import React, { useEffect, useState } from "react";
import { tradesApi } from "@/api/trades";
import type { TradeOrderDto } from "@/api/types";
import { formatDate } from "./helpers";
import {
  Card,
  CardTitle,
  EmptyState,
  OrdersTable,
  Table,
  Th,
  Td,
  StatusBadge,
  PaginationRow,
  PagBtn,
  PagText,
} from "./styles";

const TradesTab: React.FC = () => {
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

  return (
    <Card>
      <CardTitle>Trade History</CardTitle>

      {loading ? (
        <EmptyState>Loading trades...</EmptyState>
      ) : orders.length === 0 ? (
        <EmptyState>No trade orders yet. Once signals are processed, your trades will appear here.</EmptyState>
      ) : (
        <>
          <OrdersTable>
            <Table>
              <thead>
                <tr>
                  <Th>Symbol</Th>
                  <Th>Side</Th>
                  <Th>Status</Th>
                  <Th>Req Qty</Th>
                  <Th>Filled</Th>
                  <Th>Price</Th>
                  <Th>Avg Fill</Th>
                  <Th>Retries</Th>
                  <Th>Date</Th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <Td style={{ fontWeight: 600 }}>{o.symbol}</Td>
                    <Td>
                      <StatusBadge $status={o.side === "Buy" ? "Finished" : "Failed"}>
                        {o.side}
                      </StatusBadge>
                    </Td>
                    <Td>
                      <StatusBadge $status={mapTradeStatus(o.status)}>
                        {o.status}
                      </StatusBadge>
                    </Td>
                    <Td>{o.requestedQuantity.toFixed(6)}</Td>
                    <Td>{o.filledQuantity.toFixed(6)}</Td>
                    <Td>${o.requestedPrice.toFixed(4)}</Td>
                    <Td>{o.avgFillPrice != null ? `$${o.avgFillPrice.toFixed(4)}` : "\u2014"}</Td>
                    <Td>{o.retryCount}</Td>
                    <Td>{formatDate(o.createdAt)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </OrdersTable>

          {totalPages > 1 && (
            <PaginationRow>
              <PagBtn disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</PagBtn>
              <PagText>Page {page} of {totalPages}</PagText>
              <PagBtn disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</PagBtn>
            </PaginationRow>
          )}
        </>
      )}
    </Card>
  );
};

function mapTradeStatus(status: string): string {
  switch (status) {
    case "Filled": return "Finished";
    case "Pending": case "PartiallyFilled": return "Waiting";
    case "Failed": return "Failed";
    case "Cancelled": return "Expired";
    default: return status;
  }
}

export default TradesTab;
