import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export async function parseRequestInfo() {
  const headersList = await headers();

  const userAgent = headersList.get("user-agent") || "";
  const referrer = headersList.get("referer") || null;
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    null;

  const parser = new UAParser(userAgent);
  const ua = parser.getResult();

  return {
    ip,
    referrer,
    userAgent,
    ua, // full parsed UA object
    browser: ua.browser.name,
    browserVer: ua.browser.version,
    os: ua.os.name,
    osVer: ua.os.version,
    deviceModel: ua.device.model,
    deviceType: ua.device.type || "desktop",
    engine: ua.engine.name,
    engineVer: ua.engine.version,
  };
}
