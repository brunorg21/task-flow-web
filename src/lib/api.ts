export function api(path: string, config?: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return fetch(baseUrl + path, config);
}
