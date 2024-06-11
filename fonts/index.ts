import localFont from "next/font/local";

export const JimmySans = localFont({
  src: [
    {
      path: "./JimmySansPro-Regular.otf",
      weight: "400",
      style: "normal",
    },

    {
      path: "./JimmySansPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  style: "normal",
  fallback: ["system-ui", "sans-serif"],
  display: "swap",
  variable: "--jimmy-sans",
});

export const Satoshi = localFont({
  src: "./Satoshi.woff2",
  style: "normal",
  fallback: ["system-ui", "sans-serif"],
  display: "swap",
  variable: "--satoshi",
});
export const Ranade = localFont({
  src: "./Ranade.woff2",
  style: "normal",
  fallback: ["system-ui", "sans-serif"],
  display: "swap",
  variable: "--ranade",
});
