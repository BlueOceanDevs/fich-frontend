import api from "./client";
import type {
  ApiResponse,
  ApiResponseOf,
  ConnectExchangeRequest,
  ExchangeConnectionDto,
  UpdateExchangeKeysRequest,
} from "./types";

export const exchangeApi = {
  connect(data: ConnectExchangeRequest) {
    return api.post<ApiResponseOf<ExchangeConnectionDto>>(
      "/Exchange/Connect",
      data
    );
  },

  getStatus() {
    return api.get<ApiResponseOf<ExchangeConnectionDto | null>>(
      "/Exchange/Status"
    );
  },

  updateKeys(data: UpdateExchangeKeysRequest) {
    return api.put<ApiResponseOf<ExchangeConnectionDto>>(
      "/Exchange/UpdateKeys",
      data
    );
  },

  disconnect() {
    return api.delete<ApiResponse>("/Exchange/Disconnect");
  },

  validate() {
    return api.post<ApiResponseOf<ExchangeConnectionDto>>(
      "/Exchange/Validate"
    );
  },
};
