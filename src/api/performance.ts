import api from "./client";
import type { ApiResponseOf, HomepagePerformanceDto } from "./types";

/**
 * Public homepage performance API. Anonymous-readable — does NOT
 * require an authenticated session. Backend caches the response in
 * Redis with a 1-hour TTL, so this is cheap to call. The Hero
 * component fetches once on mount.
 */
export const performanceApi = {
  /**
   * Single payload that powers the hero: headline, stats card,
   * equity-curve chart, and monthly-returns table. Backend
   * recomputes from the seeded monthly rows + the singleton settings
   * row; admin writes invalidate the cache so updates show up
   * within seconds.
   */
  getHomepage() {
    return api.get<ApiResponseOf<HomepagePerformanceDto>>(
      "/Performance/Homepage",
    );
  },
};
