import Image from "next/image";

type LogoColor =
  | "blue"
  | "darkOrange"
  | "green"
  | "lightBlue"
  | "lightGreen"
  | "orange"
  | "red"
  | "skyBlue"
  | "white"
  | "yellow";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  color?: LogoColor;
  size?: LogoSize;
  domain?: boolean;
}

export default function Logo({
  color = "red",
  size = "md",
  domain = false,
}: LogoProps) {
  const sizes = {
    sm: { w: 100, text: "text-2xl" },
    md: { w: 150, text: "text-4xl" },
    lg: { w: 200, text: "text-5xl" },
  };

  return (
    <div className="flex items-center">
      <Image
        src={`/detour/${color}.svg`}
        alt="logo"
        width={sizes[size].w}
        height={45}
      />
      {domain && (
        <p className={`font-mono opacity-10 ${sizes[size].text}`}>app.io</p>
      )}
    </div>
  );
}
