"use server";

import { parseRequestInfo } from "@/lib/headers";
import { neon } from "@neondatabase/serverless";

type LogVisitPayload = {
  path: string;
  utms?: { source?: string; medium?: string; campaign?: string };
};

export async function logPageVisit(
  payload: LogVisitPayload
): Promise<{ ok: boolean }> {
  try {
    // DISABLE LOGGING WHEN NOT IN PRODUCTION
    if (process.env.NODE_ENV !== "production") {
      return { ok: true };
    }

    const { path, utms } = payload;
    const req = await parseRequestInfo();

    console.log({ path, ...req, UTMs: utms });

    const sql = neon(process.env.DATABASE_URL!);
    await sql.query(
      `
      INSERT INTO page_visits (
        path, referrer, ip, user_agent,
        browser, browser_ver, os, os_ver,
        device_model, device_type,
        utm_source, utm_medium, utm_campaign
      )
      VALUES (
        $1,$2,$3,$4,
        $5,$6,$7,$8,
        $9,$10,
        $11,$12,$13
      );
      `,
      [
        path,
        req.referrer,
        req.ip,
        req.userAgent,
        req.browser,
        req.browserVer,
        req.os,
        req.osVer,
        req.deviceModel,
        req.deviceType,
        utms?.source,
        utms?.medium,
        utms?.campaign,
      ]
    );

    return { ok: true };
  } catch (error) {
    console.error("Error logging page visit:", error);
    return { ok: false };
  }
}
