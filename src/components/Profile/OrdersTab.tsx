import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ordersApi } from "@/api/orders";
import type { OrderDto } from "@/api/types";
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
  InvoiceLink,
} from "./styles";

const OrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi
      .getMyOrders()
      .then(({ data }) => {
        if (data.isSuccess && data.data) {
          setOrders(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card>
      <CardTitle>Order History</CardTitle>

      {loading ? (
        <EmptyState>Loading orders...</EmptyState>
      ) : orders.length === 0 ? (
        <EmptyState>No orders yet.</EmptyState>
      ) : (
        <OrdersTable>
          <Table>
            <thead>
              <tr>
                <Th>Order #</Th>
                <Th>Plan</Th>
                <Th>Price</Th>
                <Th>Paid</Th>
                <Th>Status</Th>
                <Th>Date</Th>
                <Th>Invoice</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <Td>#{order.id}</Td>
                  <Td>
                    {order.planName}
                    {order.isTrial && " (Trial)"}
                  </Td>
                  <Td>${order.priceUsd.toFixed(2)}</Td>
                  <Td>
                    {order.currencyAmount != null && order.currencyPaid
                      ? `${order.currencyAmount} ${order.currencyPaid.toUpperCase()}`
                      : "\u2014"}
                  </Td>
                  <Td>
                    <StatusBadge $status={order.status}>
                      {order.status}
                    </StatusBadge>
                  </Td>
                  <Td>{formatDate(order.createdAt)}</Td>
                  <Td>
                    {order.invoiceUrl ? (
                      <InvoiceLink
                        href={order.invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View <FaExternalLinkAlt size={10} />
                      </InvoiceLink>
                    ) : (
                      "\u2014"
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </OrdersTable>
      )}
    </Card>
  );
};

export default OrdersTab;
