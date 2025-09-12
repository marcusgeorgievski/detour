"use server";

import { neon } from "@neondatabase/serverless";
import { UAParser } from "ua-parser-js";
import { headers } from "next/headers";

type SignupPayload = {
  email: string;
  userAgent: string;
  referrer: string | null;
  utms?: { source?: string; medium?: string; campaign?: string };
};

type WaitlistResponse = { ok: boolean };

export async function addToWaitlist(
  payload: SignupPayload
): Promise<WaitlistResponse> {
  try {
    const { email, userAgent, referrer, utms } = payload;

    // Device info
    const parser = new UAParser(userAgent);
    const ua = parser.getResult();

    // IP
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0] || // first IP in list
      headersList.get("x-real-ip") ||
      null;

    console.log({
      email,
      UserAgent: ua,
      Referrer: referrer,
      UTMs: utms,
      IP: ip,
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
        ua.browser.name,
        ua.browser.version,
        ua.os.name,
        ua.os.version,
        ua.device.model,
        ua.device.type || "desktop",
        ua.engine.name,
        ua.engine.version,
        ip,
        referrer,
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
