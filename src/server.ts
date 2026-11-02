import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
// Same compiled CSS as the client's /assets/styles-*.css (server bundle only, not shipped as JS).

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

/**
 * Security headers for every server-rendered response (HTML pages, 404s, error pages).
 * Static files get the same set from public/_headers.
 * CSP note: TanStack Start streams its hydration data in inline <script> tags and the UI uses
 * inline style attributes, so 'unsafe-inline' is required for script-src/style-src.
 * Everything else (images, fonts, JS, CSS) is same-origin; WhatsApp/Maps are plain links.
 */
const SECURITY_HEADERS: Record<string, string> = {
  "content-security-policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "x-content-type-options": "nosniff",
};

/**
 * Pages are the same for every visitor (no cookies, no per-user data), so let Netlify's CDN keep
 * the rendered HTML/XML: repeat requests are answered from the edge (~20 ms) instead of running
 * the SSR function (~300 ms). Netlify purges this cache on every deploy; s-maxage 1 day plus
 * stale-while-revalidate keeps things like the footer year fresh. Browsers always revalidate.
 */
function withEdgeCache(request: Request, headers: Headers, status: number) {
  if (request.method !== "GET" && request.method !== "HEAD") return;
  if (status !== 200 && status !== 404) return;
  const type = headers.get("content-type") ?? "";
  if (!/text\/html|xml|text\/plain/.test(type)) return;
  if (headers.has("set-cookie")) return;
  headers.set("cache-control", "public, max-age=0, must-revalidate");
  headers.set(
    "netlify-cdn-cache-control",
    "public, durable, s-maxage=86400, stale-while-revalidate=604800",
  );
}

function withSecurityHeaders(response: Response, request?: Request): Response {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);
  if (request) withEdgeCache(request, headers, response.status);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Canonical URLs end with "/". The router would redirect "/fiyatlar" with a temporary 307;
 * answer with a permanent 301 here instead (paths without a file extension, GET/HEAD only,
 * internal "/_…" endpoints excluded).
 */
function trailingSlashRedirect(request: Request): Response | null {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  const path = url.pathname;
  if (path.endsWith("/") || path.startsWith("/_")) return null;
  const last = path.slice(path.lastIndexOf("/") + 1);
  if (last.includes(".")) return null;
  return new Response(null, {
    status: 301,
    headers: { location: `${path}/${url.search}`, "cache-control": "public, max-age=3600" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const redirect = trailingSlashRedirect(request);
    if (redirect) return withSecurityHeaders(redirect);
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(await normalizeCatastrophicSsrResponse(response), request);
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
