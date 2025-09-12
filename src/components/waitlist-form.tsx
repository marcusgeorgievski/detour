"use client";

import { addToWaitlist } from "@/lib/waitlist";
import { useEffect, useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [utmParams, setUtmParams] = useState<{
    source?: string;
    medium?: string;
    campaign?: string;
  }>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const url = new URL(window.location.href);
    setUtmParams({
      source: url.searchParams.get("utm_source") || undefined,
      medium: url.searchParams.get("utm_medium") || undefined,
      campaign: url.searchParams.get("utm_campaign") || undefined,
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      await addToWaitlist({
        email,
        userAgent: navigator.userAgent,
        referrer: document.referrer || null,
        utms: utmParams,
      });

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div>
      {status !== "success" && (
        <form
          className="flex flex-col gap-2 w-full max-w-sm sm:flex-row sm:max-w-none sm:justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border w-full sm:w-[260px] border-neutral-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main/60 transition"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto bg-main hover:bg-main/90 text-white font-medium px-4 py-2 rounded transition hover:cursor-pointer"
          >
            {status === "loading" ? "Submitting..." : "Join Waitlist"}
          </button>
        </form>
      )}

      {(status === "success" || status === "error") && (
        <div className="flex justify-center mt-4 text-sm">
          <div className="text-center border rounded-full px-4 py-1 border-red bg-red/5">
            {status === "success" && (
              <p>Thank you! You&apos;re on the list {"✅"}</p>
            )}
            {status === "error" && <p>Something went wrong. Try again.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
