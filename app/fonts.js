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

// Urdu (Nastaliq): the Arabic-script subset of Noto Nastaliq Urdu (variable 400–700, SIL OFL).
// It is only applied under html[lang="ur"], so English visitors never download it.
export const urduFont = localFont({
  src: "./fonts/noto-nastaliq-urdu.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-amt-urdu",
  fallback: ["Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Urdu Typesetting", "Noto Naskh Arabic", "Arial", "sans-serif"],
  adjustFontFallback: false,
  preload: false,
});
