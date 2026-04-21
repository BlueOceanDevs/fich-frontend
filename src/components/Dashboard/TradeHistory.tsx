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
  SourceBadge,
  PnlCell,
  EmptyState,
  PaginationRow,
  PagBtn,
  PagText,
} from "./styles";

const fmtSignedUsd = (n: number | null | undefined): string => {
  if (n == null) return "\u2014";
  const sign = n > 0 ? "+" : "";
  return `${sign}$${n.toFixed(2)}`;
};

/**
 * Commission formatter. Commissions are usually tiny (fractions of a cent)
 * so we show 4 decimals — this column exists for audit visibility, not
 * reading-at-a-glance. A negative value = rebate (yes, Binance has VIP
 * rebates that come through the same column); we keep the sign visible.
 */
const fmtCommission = (n: number | null | undefined): string => {
  if (n == null) return "\u2014";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(4)}`;
};

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
              <Th>Source</Th>
              <Th>Status</Th>
              <ThRight>Req Qty</ThRight>
              <ThRight>Filled</ThRight>
              <ThRight>Price</ThRight>
              <ThRight>Avg Fill</ThRight>
              <ThRight>Realized P&amp;L</ThRight>
              <ThRight title="Binance commission paid in USD. Negative values are VIP-tier rebates.">
                Commission
              </ThRight>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <Td style={{ fontWeight: 600 }}>{o.symbol}</Td>
                <Td>
                  <SideBadge
                    $side={o.side}
                    title={
                      o.side === "Buy"
                        ? "Buy — opens/adds to a long, or closes a short"
                        : "Sell — closes/reduces a long, or opens a short"
                    }
                  >
                    {o.side}
                  </SideBadge>
                </Td>
                <Td>
                  <SourceBadge
                    $source={o.source}
                    title={
                      o.source === "External"
                        ? "Placed directly on Binance, outside our system"
                        : o.source === "Manual"
                        ? "Placed by an admin on your behalf"
                        : o.source === "Liquidation"
                        ? "Binance forced-closed a position (margin event)"
                        : "Placed automatically by a strategy signal"
                    }
                  >
                    {o.source}
                  </SourceBadge>
                </Td>
                <Td>
                  <StatusBadge $status={o.status}>{o.status}</StatusBadge>
                </Td>
                <TdRight>{o.requestedQuantity.toFixed(6)}</TdRight>
                <TdRight>{o.filledQuantity.toFixed(6)}</TdRight>
                <TdRight>${o.requestedPrice.toFixed(4)}</TdRight>
                <TdRight>{o.avgFillPrice != null ? `$${o.avgFillPrice.toFixed(4)}` : "\u2014"}</TdRight>
                <TdRight>
                  <PnlCell $value={o.realizedPnlUsd}>{fmtSignedUsd(o.realizedPnlUsd)}</PnlCell>
                </TdRight>
                <TdRight
                  title={
                    o.commissionUsd == null
                      ? "Commission not yet ingested"
                      : o.commissionUsd < 0
                      ? "VIP-tier rebate (negative commission)"
                      : undefined
                  }
                >
                  {fmtCommission(o.commissionUsd)}
                </TdRight>
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
