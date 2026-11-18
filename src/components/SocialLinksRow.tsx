import React from "react";
import { GOOGLE_MAPS_URL } from "../lib/seoConfig";

interface SocialLinksRowProps {
  variant?: "dark" | "light";
  className?: string;
}

interface SocialItem {
  name: string;
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/beingyoupathoffical",
    ariaLabel: "Being You Path on Instagram",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[18px] h-[18px]"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/beingyou-path-9965b1389/",
    ariaLabel: "Being You Path on LinkedIn",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[18px] h-[18px]"
        aria-hidden="true"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590091544601",
    ariaLabel: "Being You Path on Facebook",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[18px] h-[18px]"
        aria-hidden="true"
      >
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@beingyoupath",
    ariaLabel: "Being You Path on YouTube",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[18px] h-[18px]"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/BeingyouP84126",
    ariaLabel: "Being You Path on X",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[16px] h-[16px]"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/u/Beingyoupath/s/PcquEhRTpM",
    ariaLabel: "Being You Path on Reddit",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[18px] h-[18px]"
        aria-hidden="true"
      >
        <path d="M12 2a10 10 0 0 0-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10A10 10 0 0 0 12 2Zm5.8 11.1c.04.22.06.44.06.67 0 2.31-2.63 4.18-5.86 4.18-3.24 0-5.86-1.87-5.86-4.18 0-.23.02-.45.06-.67a1.36 1.36 0 0 1-.57-1.11 1.38 1.38 0 0 1 2.34-.99 7.12 7.12 0 0 1 3.79-1.2l.72-3.36a.33.33 0 0 1 .4-.25l2.37.5a1 1 0 1 1-.14.66l-2.1-.45-.64 3.01a7.08 7.08 0 0 1 3.74 1.19 1.38 1.38 0 0 1 2.34.99c0 .44-.22.84-.56 1.09ZM9.85 12.6a.98.98 0 1 0 0 1.96.98.98 0 0 0 0-1.96Zm4.3 0a.98.98 0 1 0 0 1.96.98.98 0 0 0 0-1.96Zm-4.46 3.55c.63.63 1.84.68 2.31.68.47 0 1.68-.05 2.31-.68a.33.33 0 1 0-.47-.46c-.4.4-1.36.49-1.84.49-.48 0-1.44-.09-1.84-.49a.33.33 0 1 0-.47.46Z" />
      </svg>
    ),
  },
  {
    name: "Google Business Profile",
    href: GOOGLE_MAPS_URL,
    ariaLabel: "Being You Path on Google Business Profile",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[17px] h-[17px]"
        aria-hidden="true"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
      </svg>
    ),
  },
];

export default function SocialLinksRow({
  variant = "dark",
  className = "",
}: SocialLinksRowProps) {
  const linkClass =
    variant === "dark"
      ? "min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-white/10 hover:bg-[#E6A157] text-[#FAF9F6] hover:text-[#0B3A42] border border-white/25 hover:border-[#E6A157] flex items-center justify-center transition-all"
      : "min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-white hover:bg-[#0B3A42] text-[#0B3A42] hover:text-white border border-stone-300 hover:border-[#0B3A42] flex items-center justify-center transition-all shadow-2xs";

  return (
    <div
      className={`flex flex-wrap items-center gap-2.5 ${className}`}
      role="group"
      aria-label="Being You Path social media and clinic profiles"
    >
      {SOCIAL_ITEMS.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={item.ariaLabel}
          title={item.name}
          className={linkClass}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
