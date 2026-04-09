import api from "./client";
import type { ApiResponseOf, StrategyDto } from "./types";

export const strategiesApi = {
  getActiveStrategies() {
    return api.get<ApiResponseOf<StrategyDto[]>>("/Strategy/Active");
  },
};
