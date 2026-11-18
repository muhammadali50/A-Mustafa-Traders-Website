import Script from "next/script";

const GA_ID = "G-W8T0242VZ8";

// gtag.js is ~180 KB of third-party JavaScript. `lazyOnload` waits for browser idle time,
// so it no longer competes with the first render; queued commands are sent once it loads.
export default function GoogleAnalytics() {
  return (
    <>
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      <Script id="ga" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
    </>
  );
}
