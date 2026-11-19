"use client";

import OptimizedImage from "./OptimizedImage";
import { useI18n } from "./LanguageProvider";
import ContactIcon from "./ContactIcon";
import { contacts, socialLinks } from "../data/contact";

/*
 * The global footer: the "Contact Us" design, rendered once per page by the root layout.
 * Phone: stacked. 768–1099px: decorative rice art beside the copy, contact cards in two columns.
 * ≥1100px: art | copy | cards. The art is a grid item, so it can never overlap the content.
 * The grid spans the full width so the rice art always sits against the left screen edge — in both
 * languages (the grid is LTR; the copy and contact cards follow the reading direction).
 */
export default function SiteFooter() {
  const { t, dir } = useI18n();
  const id = "contact";
  return (
    <footer id={id} aria-labelledby={`${id}-title`} className="relative isolate overflow-clip bg-[var(--brand-red)] text-white">
      <div className="grid items-center gap-x-[clamp(24px,4vw,64px)] min-[768px]:grid-cols-[clamp(170px,24vw,300px)_1fr] min-[1100px]:grid-cols-[clamp(220px,22vw,320px)_1fr_minmax(260px,320px)] min-[1100px]:pr-[var(--gutter)]" dir="ltr">
        <div className="hidden self-end min-[768px]:row-span-2 min-[768px]:block min-[1100px]:row-span-1" aria-hidden="true">
          <OptimizedImage src="/media/contact us image.webp" alt="" width={547} height={626} className="pointer-events-none block h-auto w-full" sizes="(max-width: 1099px) 24vw, 320px" />
        </div>

        <div dir={dir} className="px-[var(--gutter)] pt-12 text-center min-[768px]:pt-[clamp(32px,4vw,56px)] min-[768px]:pl-0 min-[1100px]:px-0 min-[1100px]:py-[clamp(32px,4vw,56px)]">
          <h2 id={`${id}-title`} className="heading-display text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)]">{t("footer.title")}</h2>
          <p className="mt-1 text-[var(--fs-lead)] font-bold">{t("footer.tagline")}</p>
          <p className="text-pretty mx-auto mt-4 max-w-[52ch] text-[var(--fs-body)] leading-[1.55] text-white/95">{t("footer.description")}</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-3" aria-label={t("footer.socialLabel")} data-clarity-mask="true">
            {socialLinks.map(({ name, icon, href, newTab }) => (
              <li key={name}>
                <a href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined}
                  aria-label={newTab ? t("common.opensInNewTab", { name: t(`footer.social.${name}`) }) : t(`footer.social.${name}`)}
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-white/10">
                  <ContactIcon icon={icon} className="h-8 w-8" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ul dir={dir} className="mx-auto grid w-full max-w-[640px] gap-4 px-[var(--gutter)] pt-8 pb-12 min-[480px]:grid-cols-2 min-[768px]:col-start-2 min-[768px]:px-0 min-[768px]:pt-6 min-[768px]:pr-[var(--gutter)] min-[768px]:pb-[clamp(32px,4vw,56px)] min-[1100px]:col-start-3 min-[1100px]:grid-cols-1 min-[1100px]:p-0">
          {contacts.map((contact) => (
            <li key={contact.phone}>
              <a href={contact.href} className="flex min-h-[76px] items-center gap-4 rounded-2xl bg-white px-4 py-3 text-[var(--brand-red-strong)] shadow-[0_8px_24px_rgb(0_0_0/18%)] transition-colors duration-200 hover:bg-[#fff2e9]" data-clarity-mask="true">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-red-strong)] text-white"><ContactIcon icon="phone" className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1 leading-[1.25]">
                  <span className="sr-only">{t("footer.call")} </span>
                  <span className="block text-[14px] font-bold"><bdi>{contact.name}</bdi></span>
                  <span className="block text-[13px] text-[#3b3b3b]">{t(contact.roleKey)}</span>
                  {/* Phone numbers always read left to right, also inside Urdu text. */}
                  <span className="mt-0.5 block text-[clamp(18px,1.4vw,21px)] font-bold tracking-[.01em] whitespace-nowrap"><bdi dir="ltr" lang="en">{contact.phone}</bdi></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
