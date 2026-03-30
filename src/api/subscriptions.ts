import api from "./client";
import type { ApiResponseOf, StartTrialRequest, SubscriptionDto } from "./types";

export const subscriptionsApi = {
  getMySubscription() {
    return api.get<ApiResponseOf<SubscriptionDto>>("/Subscription/GetMySubscription");
  },

  getUsedTrialTiers() {
    return api.get<ApiResponseOf<string[]>>("/Subscription/GetUsedTrialTiers");
  },

  startTrial(data: StartTrialRequest) {
    return api.post<ApiResponseOf<SubscriptionDto>>("/Subscription/StartTrial", data);
  },

  activateFree() {
    return api.post<ApiResponseOf<SubscriptionDto>>("/Subscription/ActivateFree");
  },
};
