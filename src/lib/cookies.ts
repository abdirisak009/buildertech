/**
 * Writing to document.cookie from inside a component body trips React's
 * immutability lint, so the side effect lives here instead.
 */
export function setCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

export const ONE_YEAR = 60 * 60 * 24 * 365;
