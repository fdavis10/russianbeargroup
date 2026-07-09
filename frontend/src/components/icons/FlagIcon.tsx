import { Globe } from "lucide-react";

interface FlagIconProps {
  code: string;
  size?: number;
  className?: string;
}

export function FlagIcon({ code, size = 24, className = "" }: FlagIconProps) {
  if (!code || code === "OTHER") {
    return <Globe size={size} className={`text-sand ${className}`} aria-hidden />;
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt=""
      className={`rounded-sm object-cover ${className}`}
      loading="lazy"
    />
  );
}
