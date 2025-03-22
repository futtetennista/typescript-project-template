export const config: {
  api: {
    baseURL: string;
    somePath: string;
  };
} = {
  api: {
    baseURL: (function () {
      if (!process.env.REACT_APP_API_BASE_URL) {
        throw new Error("REACT_APP_API_BASE_URL is not set");
      }
      return process.env.REACT_APP_API_BASE_URL;
    })(),
    somePath: process.env.REACT_APP_API_SOME_PATH ?? "/v1/api/somePath",
  },
} as const;
