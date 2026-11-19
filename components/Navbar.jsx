"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import OptimizedImage from "./OptimizedImage";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "./LanguageProvider";
import { navigation } from "../data/navigation";

// Ignore jitter from trackpads/touch momentum; a deliberate scroll easily exceeds this.
const DIRECTION_THRESHOLD = 8;
const TOP_ZONE = 16;

function NavigationItems({ pathname, onNavigate }) {
  const { t } = useI18n();
  return navigation.map(({ href }) => (
    <li key={href}>
      <Link href={href} onClick={onNavigate} aria-current={pathname === href ? "page" : undefined} className="nav-item">{t(`nav.${href}`)}</Link>
    </li>
  ));
}

export default function Navbar() {
  const pathname = usePathname();
  const { t, dir } = useI18n();
  const shellRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;
    let anchorY = window.scrollY;
    let frame = 0;

    // State lives in a data attribute rather than React state, so scrolling never re-renders.
    const setState = (state) => { if (shell.dataset.state !== state) shell.dataset.state = state; };
    // Keep the bar while its menu is open or a keyboard user is focused inside it.
    const mustStayVisible = () => menuRef.current?.open || shell.querySelector(":focus-visible") !== null;

    function update() {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      if (y <= TOP_ZONE) { setState("top"); anchorY = y; return; }
      const delta = y - anchorY;
      if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
      anchorY = y;
      if (delta < 0 || mustStayVisible()) setState("pinned");
      else setState("hidden");
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update); }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  // Close the mobile menu after navigation and when tapping/clicking outside it.
  useEffect(() => { if (menuRef.current) menuRef.current.open = false; }, [pathname]);
  useEffect(() => {
    function onPointerDown(event) {
      if (menuRef.current?.open && !menuRef.current.contains(event.target)) menuRef.current.open = false;
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function closeMenu() { if (menuRef.current) menuRef.current.open = false; }
  function reveal() { if (shellRef.current.dataset.state === "hidden") shellRef.current.dataset.state = "pinned"; }

  return (
    <div ref={shellRef} className="site-header-shell" data-state="top">
      {/* The bar keeps one physical layout in both languages (logo left); link lists follow the reading direction. */}
      <header className="site-header" dir="ltr" onFocusCapture={reveal}>
        <Link href="/" onClick={closeMenu} aria-label={t("common.brandHome")} className="brand">
          <OptimizedImage src="/media/AMT logo.webp" alt="" width={1020} height={1020} loading="eager" className="h-full w-full object-contain" sizes="(max-width: 1023px) 58px, 7.1vw" />
        </Link>
        <nav aria-label={t("common.mainNavigation")} className="desktop-navigation">
          <ul dir={dir}><NavigationItems pathname={pathname} /></ul>
        </nav>
        <LanguageSwitcher />
        <details ref={menuRef} className="mobile-navigation" onToggle={reveal}
          onKeyDown={(event) => { if (event.key === "Escape" && menuRef.current.open) { closeMenu(); menuRef.current.querySelector("summary").focus(); } }}>
          <summary aria-label={t("common.menu")}>
            <svg className="menu-open" width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            <svg className="menu-close" width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </summary>
          <nav aria-label={t("common.mainNavigation")} className="mobile-panel" dir={dir}>
            <ul><NavigationItems pathname={pathname} onNavigate={closeMenu} /></ul>
          </nav>
        </details>
      </header>
    </div>
  );
}
