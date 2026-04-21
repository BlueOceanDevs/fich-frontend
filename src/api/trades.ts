import api from "./client";
import type {
  ApiResponseOf,
  PagedResult,
  PortfolioDto,
  TradeOrderDto,
  LastRebalanceDto,
  PerformanceDto,
  PerformancePeriod,
} from "./types";

export const tradesApi = {
  getMyOrders(page = 1, pageSize = 25) {
    return api.get<ApiResponseOf<PagedResult<TradeOrderDto>>>("/Trade/MyOrders", {
      params: { page, pageSize },
    });
  },

  getPortfolio() {
    return api.get<ApiResponseOf<PortfolioDto>>("/Trade/Portfolio");
  },

  getLastRebalance() {
    return api.get<ApiResponseOf<LastRebalanceDto | null>>("/Trade/LastRebalance");
  },

  /**
   * Aggregated P&L + execution-quality report. Server-side aggregation so the
   * client doesn't need to fetch every trade to compute stats. Response is
   * cached 60s server-side per (userId, period) — quick reloads hit cache.
   */
  getPerformance(period: PerformancePeriod = "All") {
    return api.get<ApiResponseOf<PerformanceDto>>("/Trade/Performance", {
      params: { period },
    });
  },
};
