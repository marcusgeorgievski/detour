"use server";

import { neon } from "@neondatabase/serverless";
import { UTMs } from "@/lib/utm";
import { parseRequestInfo } from "@/lib/headers";
import { normalizeEmail } from "@/lib/utils";

type WaitlistPayload = {
  email: string;
  utms?: UTMs;
};

type WaitlistResponse = { ok: boolean };

export async function addToWaitlist(
  payload: WaitlistPayload
): Promise<WaitlistResponse> {
  try {
    const { utms } = payload;
    const email = normalizeEmail(payload.email);
    const req = await parseRequestInfo();

    console.log({
      email,
      Referrer: req.referrer,
      IP: req.ip,
      UserAgent: req.ua,
      UTMs: utms,
    });

    const sql = neon(process.env.DATABASE_URL!);
    await sql.query(
      `
    INSERT INTO waitlist (
      email, browser, browser_ver, os, os_ver,
      device_model, device_type, engine, engine_ver,
      ip, referrer, utm_source, utm_medium, utm_campaign
    ) VALUES (
      $1,$2,$3,$4,$5,
      $6,$7,$8,$9,
      $10,$11,$12,$13,$14
    )
    ON CONFLICT (email) DO NOTHING;
    `,
      [
        email,
        req.browser,
        req.browserVer,
        req.os,
        req.osVer,
        req.deviceModel,
        req.deviceType,
        req.engine,
        req.engineVer,
        req.ip,
        req.referrer,
        utms?.source,
        utms?.medium,
        utms?.campaign,
      ]
    );
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return { ok: false };
  }

  return { ok: true };
}
