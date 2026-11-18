import localFont from "next/font/local";

// Single shared instances: each localFont() call is emitted (and downloaded) separately.
// Both files are Latin-only WOFF2 subsets; see the OFL notes in ./fonts.
export const displayFont = localFont({
  src: "./fonts/amt-display.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-amt-display",
  fallback: ["Georgia", "serif"],
});

export const scriptFont = localFont({
  src: "./fonts/the-nautigal.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-amt-script",
  fallback: ["Segoe Script", "cursive"],
  preload: false,
});
