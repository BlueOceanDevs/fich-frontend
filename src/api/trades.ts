import api from "./client";
import type { ApiResponseOf, PagedResult, TradeOrderDto } from "./types";

export const tradesApi = {
  getMyOrders(page = 1, pageSize = 25) {
    return api.get<ApiResponseOf<PagedResult<TradeOrderDto>>>("/Trade/MyOrders", {
      params: { page, pageSize },
    });
  },
};
