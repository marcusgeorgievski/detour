"use client";

import { logPageVisit } from "@/actions/page-visit";
import Logo from "@/components/logo";
import WaitlistForm from "@/components/waitlist-form";
import { getLastTouchUTMs } from "@/lib/utm";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const utms = getLastTouchUTMs();
    logPageVisit({ path: window.location.pathname, utms });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-25 px-6 sm:px-2 mt-25">
      <Hero />
      <div className="flex flex-col gap-8 w-full">
        <WaitlistForm />
        <Footer />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex justify-center">
        <Logo size="lg" />
      </div>

      <div className="flex flex-col text-center gap-4 ">
        <p className="leading-6">Turn hometown commutes into profit 💸</p>
        <p className="leading-6">
          Find cheap, simple deliveries to and from{" "}
          <span className="whitespace-nowrap">home 📦</span>
        </p>
      </div>
    </div>
  );
}

function Footer() {
  // const links = [
  //   {
  //     label: "GitHub",
  //     href: "https://github.com/",
  //     external: true,
  //   },
  //   {
  //     label: "Privacy Policy",
  //     href: "https://detour.app/privacy",
  //     external: true,
  //   },
  // ];

  return (
    <footer className="py-6 flex flex-col items-center gap-2 text-sm text-neutral-500">
      <p>coming soon</p>
      {/* <div className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : "_self"}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <span>&copy; {new Date().getFullYear()} Detour</span> */}
    </footer>
  );
}
