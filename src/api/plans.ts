import api from "./client";
import type { ApiResponseOf, PlanDto } from "./types";

export const plansApi = {
  getPlans() {
    return api.get<ApiResponseOf<PlanDto[]>>("/Plan/GetPlans");
  },

  getPlanById(id: number) {
    return api.get<ApiResponseOf<PlanDto>>("/Plan/GetPlanById", {
      params: { id },
    });
  },
};
