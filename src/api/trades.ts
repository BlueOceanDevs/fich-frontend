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

  /**
   * Portfolio snapshot + value-history chart. The <code>historyPeriod</code>
   * drives the chart window and its bucket granularity only — everything
   * else in the response is live regardless. Defaults to OneMonth on the
   * server so omitting it still returns a reasonable chart.
   */
  getPortfolio(historyPeriod: PerformancePeriod = "OneMonth") {
    return api.get<ApiResponseOf<PortfolioDto>>("/Trade/Portfolio", {
      params: { historyPeriod },
    });
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
