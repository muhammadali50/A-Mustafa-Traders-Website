"use client";

import { createContext, Fragment, isValidElement, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import en from "../locales/en.json";
import ur from "../locales/ur.json";
import { STORAGE_KEY } from "../data/language";

/*
 * English/Urdu without separate routes: every page is exported in English (the default) and the
 * visitor's saved choice is applied on the client. The inline script in the root layout sets
 * lang/dir and hides the page before first paint when Urdu is saved, so English never flashes;
 * the page is revealed once Urdu has rendered and its font is ready.
 */
const dictionaries = { en, ur };
const DIRECTIONS = { en: "ltr", ur: "rtl" };
const FONT_WAIT_MS = 1500;

function lookup(dictionary, key) {
  return key.split(".").reduce((value, part) => (value == null ? value : value[part]), dictionary);
}

// "{name}" placeholders; values may be React elements (e.g. a bold name inside a sentence).
function format(template, values) {
  if (typeof template !== "string" || !values) return template;
  const parts = template.split(/\{(\w+)\}/);
  if (parts.length === 1) return template;
  if (!Object.values(values).some(isValidElement)) {
    return parts.map((part, index) => (index % 2 ? String(values[part] ?? "") : part)).join("");
  }
  return parts.map((part, index) => <Fragment key={index}>{index % 2 ? values[part] : part}</Fragment>);
}

function readStoredLanguage() {
  try { return window.localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

function waitForFont(fontFamily) {
  if (!fontFamily || !document.fonts?.load) return Promise.resolve();
  const timeout = new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS));
  return Promise.race([document.fonts.load(`400 1em ${fontFamily}`, "اردو").catch(() => {}), timeout]);
}

function reveal() {
  document.documentElement.removeAttribute("data-lang-pending");
}

const LanguageContext = createContext(null);

export default function LanguageProvider({ urduFontFamily, children }) {
  const [lang, setLang] = useState("en");
  const pathname = usePathname();

  // The exported HTML is English, so the saved choice is applied right after hydration.
  useEffect(() => {
    if (readStoredLanguage() === "ur") setLang("ur");
    else reveal();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (lang === "en" && root.hasAttribute("data-lang-pending")) return; // Urdu is about to apply.
    root.lang = lang;
    root.dir = DIRECTIONS[lang];
    if (lang === "ur") waitForFont(urduFontFamily).then(reveal);
  }, [lang, urduFontFamily]);

  // Localised <title> and description. Next.js also writes the head on navigation, so re-apply on change.
  useEffect(() => {
    const meta = lookup(dictionaries[lang], `meta.${pathname}`);
    if (!meta) return undefined;
    const apply = () => {
      if (document.title !== meta.title) document.title = meta.title;
      const description = document.querySelector('meta[name="description"]');
      if (description && description.content !== meta.description) description.content = meta.description;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [lang, pathname]);

  const setLanguage = useCallback(async (next) => {
    if (!DIRECTIONS[next]) return;
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* The choice still applies to this visit. */ }
    // Load the Urdu font first so the switch happens in one step, without a fallback-font flash.
    if (next === "ur") await waitForFont(urduFontFamily);
    setLang(next);
  }, [urduFontFamily]);

  const value = useMemo(() => {
    const dictionary = dictionaries[lang];
    const t = (key, values) => format(lookup(dictionary, key) ?? lookup(en, key) ?? key, values);
    // Merge a record's Urdu overrides (by id) over its English source data.
    const localize = (collection, record) => (lang === "en" ? record : { ...record, ...dictionary[collection]?.[record.id] });
    return { lang, dir: DIRECTIONS[lang], setLanguage, t, localize };
  }, [lang, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  return useContext(LanguageContext);
}

// Translated text for server components: <T k="pages.contact.closing" />.
export function T({ k, values }) {
  return useI18n().t(k, values);
}
