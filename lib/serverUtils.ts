import { headers } from "next/headers";

/**
 * Get the current pathname in a Server Component
 * This function extracts the pathname from the request headers
 */
export async function getCurrentPathname(): Promise<string> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  return pathname;
}

/**
 * Alternative: Get pathname from URL header
 */
export async function getPathnameFromUrl(): Promise<string> {
  const headersList = await headers();
  const url = headersList.get("x-url") || headersList.get("referer") || "";

  if (!url) return "/";

  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch {
    return "/";
  }
}
