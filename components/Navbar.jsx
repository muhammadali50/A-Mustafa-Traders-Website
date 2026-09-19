"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "#home", ready: true },
  { label: "Products", href: "#products", ready: true },
  { label: "History", href: "#history", ready: true },
  { label: "Our Leadership", href: "#leadership", ready: true },
  { label: "About Us", href: "#about", ready: true },
  { label: "Contact Us", href: "#contact", ready: true },
];

function NavigationItems({ onNavigate }) {
  return navigation.map(({ label, href, ready }) => (
    <li key={href}>
      {ready ? (
        <a href={href} onClick={onNavigate} className="nav-item">{label}</a>
      ) : (
        <span role="link" aria-disabled="true" title={`${label} — coming soon`} className="nav-item cursor-default">{label}</span>
      )}
    </li>
  ));
}

export default function Navbar() {
  const menuRef = useRef(null);
  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }
  return (
    <div className="sticky top-0 z-50 h-0">
    <header className="site-header absolute z-20 bg-[#a12222] text-white">
      <Link href="#home" onClick={closeMenu} aria-label="A. Mustafa Traders home" className="brand absolute">
        <Image src="/media/AMT logo.png" alt="AM Traders Nawabshah" width={1254} height={1254} loading="eager" className="h-full w-full object-contain" sizes="(max-width: 767px) 64px, 8vw" />
      </Link>
      <nav aria-label="Main navigation" className="desktop-navigation h-full">
        <ul className="flex h-full items-center justify-end"><NavigationItems /></ul>
      </nav>
      <details ref={menuRef} onKeyDown={(event) => { if (event.key === "Escape") { closeMenu(); menuRef.current.querySelector("summary").focus(); } }} className="mobile-navigation relative ml-auto w-fit">
        <summary aria-label="Toggle navigation menu" className="flex h-11 w-11 cursor-pointer list-none items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" /></svg>
        </summary>
        <nav aria-label="Mobile navigation" className="absolute right-0 top-full w-56 bg-[#a12222] px-5 py-3 shadow-lg">
          <ul className="flex flex-col gap-1"><NavigationItems onNavigate={closeMenu} /></ul>
        </nav>
      </details>
    </header>
    </div>
  );
}

