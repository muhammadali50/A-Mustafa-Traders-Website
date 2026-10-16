"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./VisitorTracking.module.css";

const VISITOR_KEY = "amt_visitor_key";
const IDENTIFIED_KEY = "amt_visitor_identified";
const POPUP_SHOWN_KEY = "amt_identity_popup_shown";
const ATTRIBUTION_KEY = "amt_visit_attribution";
const TRACKING_API_URL = process.env.NEXT_PUBLIC_VISITOR_TRACKING_API_URL;

let activeVisit = null;
let listenersAttached = false;
let sectionObserver = null;
let pendingSection = null;
let pendingSectionTimer = null;

function getVisitorKey() {
  try {
    let key = window.localStorage.getItem(VISITOR_KEY);
    if (!key) {
      key = window.crypto.randomUUID();
      window.localStorage.setItem(VISITOR_KEY, key);
    }
    return key;
  } catch {
    return null;
  }
}

function getAttribution() {
  try {
    const existing = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (existing) return JSON.parse(existing);

    const params = new URLSearchParams(window.location.search);
    const attribution = {
      referrer: document.referrer || null,
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_term: params.get("utm_term"),
      utm_content: params.get("utm_content"),
    };
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return { referrer: document.referrer || null };
  }
}

function send(payload, { beacon = false } = {}) {
  if (!TRACKING_API_URL) return;
  try {
    const body = JSON.stringify(payload);
    if (beacon && navigator.sendBeacon) {
      if (navigator.sendBeacon(TRACKING_API_URL, new Blob([body], { type: "application/json" }))) return;
    }
    void fetch(TRACKING_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: beacon,
    }).catch(() => {});
  } catch {
    // Tracking must never interrupt the site.
  }
}

function sendVisitDuration(visit, { beacon = false } = {}) {
  if (!visit) return;
  const now = Date.now();
  const elapsedMs = visit.elapsedMs + (visit.activeSince === null ? 0 : Math.max(0, now - visit.activeSince));
  const durationSeconds = Math.max(0, Math.round(elapsedMs / 1000));
  if (durationSeconds > visit.lastDurationSent) {
    visit.lastDurationSent = durationSeconds;
    send({
      action: "page_duration",
      visitor_key: visit.visitorKey,
      page_visit_key: visit.pageVisitKey,
      page_url: visit.pageUrl,
      duration_seconds: durationSeconds,
    }, { beacon });
  }
}

function finishVisit({ beacon = false } = {}) {
  if (!activeVisit) return;
  if (activeVisit.activeSince !== null) {
    activeVisit.elapsedMs += Math.max(0, Date.now() - activeVisit.activeSince);
    activeVisit.activeSince = null;
  }
  sendVisitDuration(activeVisit, { beacon });
}

function getSectionUrl(sectionId) {
  const url = new URL(window.location.href);
  url.hash = sectionId;
  return url.href;
}

function trackVisit(pageUrl, sectionId = null) {
  if (typeof window === "undefined") return;
  const visitorKey = getVisitorKey();
  if (!visitorKey) return;
  if (activeVisit?.pageUrl === pageUrl) return;

  finishVisit();
  const pageVisitKey = window.crypto.randomUUID();
  activeVisit = {
    visitorKey,
    pageVisitKey,
    pageUrl,
    sectionId,
    elapsedMs: 0,
    activeSince: document.visibilityState === "visible" ? Date.now() : null,
    lastDurationSent: -1,
  };
  send({
    action: "page_view",
    visitor_key: visitorKey,
    page_visit_key: pageVisitKey,
    page_url: pageUrl,
    ...getAttribution(),
  });
}

function trackHashOrCurrentPage() {
  if (typeof window === "undefined") return;
  const hash = window.location.hash.slice(1);
  let sectionId = hash;
  try {
    sectionId = decodeURIComponent(hash);
  } catch {
    // Ignore malformed hashes and fall back to page/viewport tracking.
  }
  const section = sectionId ? document.getElementById(sectionId) : null;
  if (section?.matches("section[id]")) {
    trackVisit(getSectionUrl(section.id), section.id);
    return;
  }

  const hasSections = document.querySelector("main section[id]");
  if (!hasSections || window.location.pathname !== "/") trackVisit(window.location.href);
  else scheduleProminentSection(0);
}

function getProminentSection() {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  if (!viewportHeight || !viewportWidth) return null;

  let prominent = null;
  let largestVisibleArea = 0;
  let nearestCenter = Infinity;
  for (const section of document.querySelectorAll("main section[id]")) {
    const rect = section.getBoundingClientRect();
    const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
    const visibleWidth = Math.max(0, Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0));
    const visibleArea = visibleHeight * visibleWidth;
    if (visibleArea < viewportHeight * viewportWidth * 0.2) continue;
    const centerDistance = Math.abs((rect.top + rect.bottom) / 2 - viewportHeight / 2);
    if (visibleArea > largestVisibleArea || (visibleArea === largestVisibleArea && centerDistance < nearestCenter)) {
      prominent = section;
      largestVisibleArea = visibleArea;
      nearestCenter = centerDistance;
    }
  }
  return prominent;
}

function scheduleProminentSection(delay = 450) {
  if (document.visibilityState !== "visible") return;
  const section = getProminentSection();
  const sectionId = section?.id ?? null;
  if (!sectionId || sectionId === activeVisit?.sectionId) {
    if (pendingSectionTimer !== null) window.clearTimeout(pendingSectionTimer);
    pendingSectionTimer = null;
    pendingSection = null;
    return;
  }
  if (sectionId === pendingSection) return;

  pendingSection = sectionId;
  if (pendingSectionTimer !== null) window.clearTimeout(pendingSectionTimer);
  pendingSectionTimer = window.setTimeout(() => {
    pendingSectionTimer = null;
    const current = getProminentSection();
    if (document.visibilityState === "visible" && current?.id === pendingSection) {
      trackVisit(getSectionUrl(current.id), current.id);
    }
    pendingSection = null;
  }, delay);
}

function observeSections() {
  const sections = document.querySelectorAll("main section[id]");
  if (!sections.length) return null;

  if (typeof IntersectionObserver === "undefined") {
    const onScroll = () => scheduleProminentSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    return { disconnect: () => window.removeEventListener("scroll", onScroll) };
  }

  sectionObserver?.disconnect();
  sectionObserver = new IntersectionObserver(() => scheduleProminentSection(), {
    root: null,
    threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.7, 0.9, 1],
  });
  sections.forEach((section) => sectionObserver.observe(section));
  return sectionObserver;
}

function handleVisibilityChange() {
  if (document.visibilityState === "hidden") finishVisit({ beacon: true });
  else if (activeVisit && activeVisit.activeSince === null) activeVisit.activeSince = Date.now();
  else scheduleProminentSection(0);
}

function handlePageHide() {
  finishVisit({ beacon: true });
  activeVisit = null;
  pendingSection = null;
  if (pendingSectionTimer !== null) window.clearTimeout(pendingSectionTimer);
  pendingSectionTimer = null;
}

function attachTrackingListeners() {
  if (listenersAttached) return;
  listenersAttached = true;
  window.addEventListener("hashchange", trackHashOrCurrentPage);
  window.addEventListener("popstate", trackHashOrCurrentPage);
  window.addEventListener("pageshow", trackHashOrCurrentPage);
  window.addEventListener("pagehide", handlePageHide);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("resize", () => scheduleProminentSection());
}

function EmailCapturePopup() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(IDENTIFIED_KEY) === "true") return;
      if (window.sessionStorage.getItem(POPUP_SHOWN_KEY) === "true") return;
      const timer = window.setTimeout(() => {
        try {
          if (window.sessionStorage.getItem(POPUP_SHOWN_KEY) === "true") return;
          window.sessionStorage.setItem(POPUP_SHOWN_KEY, "true");
        } catch {
          // The popup can still be shown for this visit if session storage is blocked.
        }
        setVisible(true);
      }, 1800);
      return () => window.clearTimeout(timer);
    } catch {
      // Storage may be disabled. The popup remains available for this visit.
      const timer = window.setTimeout(() => setVisible(true), 1800);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function closePopup() {
    setVisible(false);
  }

  async function submit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Enter your name and a valid email address.");
      return;
    }
    const visitorKey = getVisitorKey();
    if (!visitorKey || !TRACKING_API_URL) {
      setError("We couldn’t save that just now. Please try again later.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(TRACKING_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "identify", visitor_key: visitorKey, name: trimmedName, email: trimmedEmail }),
      });
      if (!response.ok) throw new Error("Identity request failed");
      const result = await response.json();
      if (result?.success !== true) throw new Error("Identity request was not confirmed");

      try {
        window.localStorage.setItem(IDENTIFIED_KEY, "true");
      } catch {
        // The API confirmed the save; storage restrictions only affect future suppression.
      }
      setVisible(false);
    } catch {
      setError("We couldn’t save your details. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!visible) return null;

  return (
    <aside className={styles.popup} aria-label="Optional visitor details" data-clarity-mask="true">
      <button className={styles.close} type="button" onClick={closePopup} aria-label="Close and skip">×</button>
      <p className={styles.eyebrow}>A. Mustafa Traders</p>
      <h2 className={styles.title}>Stay in touch</h2>
      <p className={styles.description}>Share your details if you’d like us to know who’s visiting.</p>
      <form className={styles.form} onSubmit={submit} noValidate>
        <label className={styles.label} htmlFor="visitor-name">Name</label>
        <input id="visitor-name" className={styles.input} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />
        <label className={styles.label} htmlFor="visitor-email">Email</label>
        <input id="visitor-email" className={styles.input} type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={styles.submit} type="submit" disabled={submitting}>{submitting ? "Sending…" : "Submit"}</button>
      </form>
      <button className={styles.skip} type="button" onClick={closePopup}>Skip for now</button>
    </aside>
  );
}

export default function VisitorTracking() {
  const pathname = usePathname();

  useEffect(() => {
    attachTrackingListeners();
    const observer = observeSections();
    trackHashOrCurrentPage();
    return () => observer?.disconnect();
  }, [pathname]);

  return <EmailCapturePopup />;
}
