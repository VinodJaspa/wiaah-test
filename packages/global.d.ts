// import { UseTranslationResponse } from "react-i18next";

declare module "react-i18next" {
  interface UseTranslationResponse<N, TKPrefix> {
    t: (key: string, ...args: any[]) => string;
  }
}
declare global {
  interface Window {
    google: typeof google;
  }
}

export {};