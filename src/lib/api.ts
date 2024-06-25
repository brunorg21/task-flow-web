import { parseCookies } from "nookies";

export function api(path: string, config?: RequestInit) {
  const { "@token": token } = parseCookies();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const defaultConfig = {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const mergedConfig = {
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config?.headers,
    },
  };

  return fetch(baseUrl + path, mergedConfig);
}
