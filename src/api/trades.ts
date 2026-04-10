import api from "./client";
import type { ApiResponseOf, PagedResult, PortfolioDto, TradeOrderDto } from "./types";

export const tradesApi = {
  getMyOrders(page = 1, pageSize = 25) {
    return api.get<ApiResponseOf<PagedResult<TradeOrderDto>>>("/Trade/MyOrders", {
      params: { page, pageSize },
    });
  },

  getPortfolio() {
    return api.get<ApiResponseOf<PortfolioDto>>("/Trade/Portfolio");
  },
};
