import React, { createContext, useContext } from "react";

export interface ApiConfig {
  apiUrl: string;
  apiScope: string;
  senderName?: string;
}

const ApiConfigContext = createContext<ApiConfig | undefined>(undefined);

export const ApiConfigProvider = ({ children, value }: { children: React.ReactNode; value: ApiConfig }) => (
  <ApiConfigContext.Provider value={value}>{children}</ApiConfigContext.Provider>
);

export function useApiConfig() {
  const ctx = useContext(ApiConfigContext);
  if (!ctx) throw new Error("useApiConfig must be used within an ApiConfigProvider");
  return ctx;
}
