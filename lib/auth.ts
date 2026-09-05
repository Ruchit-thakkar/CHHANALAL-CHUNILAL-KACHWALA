import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "cck_session_secret_key_glass_aluminium_2026_super_secure";
export const COOKIE_NAME = "cck_admin_session";
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface SessionPayload {
  adminId: string;
  iat: number;
  exp: number;
}

/**
 * Creates an HMAC-SHA256 signed session token
 */
export function createSessionToken(adminId: string): string {
  const now = Date.now();
  const payload: SessionPayload = {
    adminId,
    iat: now,
    exp: now + SESSION_EXPIRY_MS,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadBase64)
    .digest("base64url");

  return `${payloadBase64}.${signature}`;
}

/**
 * Verifies and decodes an HMAC-SHA256 signed session token
 */
export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadBase64, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadBase64)
    .digest("base64url");

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf8")
    ) as SessionPayload;

    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Verifies admin authentication from Request headers / cookies
 */
export async function isAuthenticatedAdmin(req?: NextRequest): Promise<boolean> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(COOKIE_NAME)?.value;
  } else {
    const cookieStore = await cookies();
    token = cookieStore.get(COOKIE_NAME)?.value;
  }

  const payload = verifySessionToken(token);
  return !!payload;
}
