"use client";

import { useI18n } from "./LanguageProvider";

const options = [
  { code: "en", label: "EN", name: "English" },
  { code: "ur", label: "اردو", name: "اردو" },
];

// "EN | اردو": each option names its language in that language; the current one is pressed.
export default function LanguageSwitcher() {
  const { lang, setLanguage, t } = useI18n();
  return (
    <div role="group" aria-label={t("language.label")} className="lang-switch" dir="ltr">
      {options.map(({ code, label, name }, index) => (
        <span key={code} className="contents">
          {index > 0 && <span aria-hidden="true" className="lang-switch-divider">|</span>}
          <button type="button" lang={code} aria-label={name} aria-pressed={lang === code} onClick={() => setLanguage(code)}>{label}</button>
        </span>
      ))}
    </div>
  );
}
