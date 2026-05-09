import api from "./client";
import type {
  ApiResponseOf,
  HomepagePerformanceDto,
  PerformancePageDto,
  PerformancePagePeriod,
  WeekDetailDto,
} from "./types";

/**
 * Public performance API. Anonymous-readable — none of these
 * endpoints require an authenticated session. Backend caches each
 * response in Redis with a 1-hour TTL, so all 3 are cheap to call.
 */
export const performanceApi = {
  /**
   * Homepage hero payload (headline, 3-stat card, equity curve,
   * monthly returns). Fetched once when the Hero component mounts.
   */
  getHomepage() {
    return api.get<ApiResponseOf<HomepagePerformanceDto>>(
      "/Performance/Homepage",
    );
  },

  /**
   * Full /performance page payload. The `period` parameter filters
   * the headline stats and the equity-curve chart; everything else
   * (monthly returns, top winners/losers, cash% chart, available
   * weeks) is all-time. Re-fetched when the user changes the period
   * pill at the top of the page.
   */
  getPage(period: PerformancePagePeriod = "Inception") {
    return api.get<ApiResponseOf<PerformancePageDto>>(
      `/Performance/Page?period=${period}`,
    );
  },

  /**
   * Per-week payload — donut chart slices + the BUYs/SELLs that
   * happened in that rebalance week. Re-fetched when the user picks
   * a different week from the dropdown. Returns 404 (handled by the
   * caller) when no snapshot exists for the date.
   */
  getWeek(weekEndDate: string) {
    return api.get<ApiResponseOf<WeekDetailDto>>(
      `/Performance/Week/${weekEndDate}`,
    );
  },
};
