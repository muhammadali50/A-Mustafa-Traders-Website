import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "/", ready: true },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "History", href: "/history" },
  { label: "Our Leadership", href: "/leadership" },
  { label: "Contact Us", href: "/contact" },
];

function NavigationItems() {
  return navigation.map(({ label, href, ready }) => (
    <li key={href}>
      {ready ? (
        <Link href={href} aria-current="page" className="nav-item">{label}</Link>
      ) : (
        <span role="link" aria-disabled="true" title={`${label} — coming soon`} className="nav-item cursor-default">{label}</span>
      )}
    </li>
  ));
}

export default function Navbar() {
  return (
    <header className="site-header absolute z-20 bg-[#a12222] text-white">
      <Link href="/" aria-label="A. Mustafa Traders home" className="brand absolute">
        <Image src="/media/AMT logo.png" alt="AM Traders Nawabshah" width={1254} height={1254} loading="eager" className="h-full w-full object-contain" sizes="(max-width: 767px) 64px, 8vw" />
      </Link>
      <nav aria-label="Main navigation" className="desktop-navigation h-full">
        <ul className="flex h-full items-center justify-end"><NavigationItems /></ul>
      </nav>
      <details className="mobile-navigation relative ml-auto w-fit">
        <summary aria-label="Toggle navigation menu" className="flex h-11 w-11 cursor-pointer list-none items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" /></svg>
        </summary>
        <nav aria-label="Mobile navigation" className="absolute right-0 top-full w-56 bg-[#a12222] px-5 py-3 shadow-lg">
          <ul className="flex flex-col gap-1"><NavigationItems /></ul>
        </nav>
      </details>
    </header>
  );
}

