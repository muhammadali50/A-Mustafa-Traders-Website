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

function finishVisit({ beacon = false } = {}) {
  if (!activeVisit) return;
  const durationSeconds = Math.max(0, Math.round((Date.now() - activeVisit.startedAt) / 1000));
  if (durationSeconds > activeVisit.lastDurationSent) {
    activeVisit.lastDurationSent = durationSeconds;
    send({
      action: "page_duration",
      visitor_key: activeVisit.visitorKey,
      page_visit_key: activeVisit.pageVisitKey,
      page_url: activeVisit.pageUrl,
      duration_seconds: durationSeconds,
    }, { beacon });
  }
}

function startVisit() {
  if (typeof window === "undefined") return;
  const visitorKey = getVisitorKey();
  if (!visitorKey) return;
  const pageUrl = window.location.href;
  if (activeVisit?.pageUrl === pageUrl) return;

  finishVisit();
  const pageVisitKey = window.crypto.randomUUID();
  activeVisit = { visitorKey, pageVisitKey, pageUrl, startedAt: Date.now(), lastDurationSent: -1 };
  send({
    action: "page_view",
    visitor_key: visitorKey,
    page_visit_key: pageVisitKey,
    page_url: pageUrl,
    ...getAttribution(),
  });
}

function handleVisibilityChange() {
  if (document.visibilityState === "hidden") finishVisit({ beacon: true });
}

function handlePageHide() {
  finishVisit({ beacon: true });
  activeVisit = null;
}

function attachTrackingListeners() {
  if (listenersAttached) return;
  listenersAttached = true;
  window.addEventListener("hashchange", startVisit);
  window.addEventListener("popstate", startVisit);
  window.addEventListener("pageshow", startVisit);
  window.addEventListener("pagehide", handlePageHide);
  document.addEventListener("visibilitychange", handleVisibilityChange);
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
    <aside className={styles.popup} aria-label="Optional visitor details">
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
    startVisit();
  }, [pathname]);

  return <EmailCapturePopup />;
}
