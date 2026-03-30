import api from "./client";
import type { ApiResponseOf, CreateOrderRequest, OrderDto } from "./types";

export const ordersApi = {
  createOrder(data: CreateOrderRequest) {
    return api.post<ApiResponseOf<OrderDto>>("/Orders/CreateOrder", data);
  },

  getOrder(orderId: number) {
    return api.get<ApiResponseOf<OrderDto>>("/Orders/GetOrder", {
      params: { orderId },
    });
  },

  getMyOrders() {
    return api.get<ApiResponseOf<OrderDto[]>>("/Orders/GetMyOrders");
  },
};
