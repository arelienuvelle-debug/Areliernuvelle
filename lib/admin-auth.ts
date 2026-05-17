import { createHmac } from "crypto";

const HMAC_SECRET =
  process.env.ADMIN_SECRET ?? "an-admin-hmac-secret-2026-nuvelle";
export const ADMIN_COOKIE = "an_admin";

export function makeToken(password: string): string {
  return createHmac("sha256", HMAC_SECRET).update(password).digest("hex");
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "Atelier@Admin2026";
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  return token === makeToken(getAdminPassword());
}
