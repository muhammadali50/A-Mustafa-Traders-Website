"use client";

import ButtonLink from "./ButtonLink";
import { useI18n } from "./LanguageProvider";
import OptimizedImage from "./OptimizedImage";

const leaders = [
  { name: "Haji Meraj Ul Haq Mustafai", roleKey: "roles.ceo", image: "Haji Meraj Ul Haq Mustafai.webp", width: 1122, height: 1402 },
  { name: "Abdulhaq Mustafai", roleKey: "roles.md", image: "Haji AbdulHaq Mustafai.webp", width: 1122, height: 1402 },
  { name: "Akbar Ali", roleKey: "roles.operations", image: "Akbar Ali.webp", width: 1122, height: 1190 },
];

// `standalone`: on the Leadership page the page banner already introduces the team, so only the profiles render.
// Names are kept as officially written (Latin script) in both languages.
export default function LeadershipSection({ standalone = false }) {
  const { t } = useI18n();
  return (
    <section id="leadership" aria-labelledby={standalone ? undefined : "leadership-title"} aria-label={standalone ? t("leadershipSection.teamLabel") : undefined} className="bg-[#dedbd8] text-[#ac3033]">
      <div className={`mx-auto max-w-[1280px] px-[6.5%] ${standalone ? "py-[var(--section-y)]" : "pt-9 pb-10 min-[640px]:pt-[5.4%] min-[640px]:pb-[2.4%]"}`}>
        {!standalone && <>
          <h2 id="leadership-title" className="heading-display text-center min-[640px]:text-start">{t("leadershipSection.title")}</h2>
          <p className="text-pretty mx-auto mt-6 max-w-[420px] text-center text-[15px] leading-[1.5] min-[640px]:mt-[3%] min-[640px]:max-w-none min-[640px]:px-[1%] min-[640px]:text-start min-[640px]:text-[clamp(16px,1.9vw,24px)] min-[640px]:leading-[1.35]">
            {t("leadershipSection.intro")}
          </p>
        </>}
        <div className={`${standalone ? "" : "mt-7 min-[640px]:mt-[2.7%] "}grid grid-cols-1 justify-items-center gap-10 min-[640px]:grid-cols-3 min-[640px]:gap-[3%]`}>
          {leaders.map((leader) => (
            <figure key={leader.name} className="m-0 w-[76%] max-w-[260px] min-[640px]:w-[72%] min-[640px]:max-w-none" data-clarity-mask="true">
              <div className="relative mx-auto aspect-[110/165] w-[76%]">
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[90%] rounded-t-full bg-[#a12222]" />
                {/* The source files have transparent side margins; sizing by height preserves each portrait. */}
                <OptimizedImage src={`/media/${leader.image}`} alt={leader.name} width={leader.width} height={leader.height} className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain" sizes="(max-width: 639px) 60vw, 20vw" />
              </div>
              <figcaption className="mt-[6%] bg-[#a12222] px-1 py-[3%] text-center text-[clamp(13px,3.6vw,15px)] leading-[1.25] font-bold text-white min-[640px]:text-[clamp(11px,1.2vw,15px)]">
                <span className="block"><bdi>{leader.name}</bdi></span>
                <span className="block">{t(leader.roleKey)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        {!standalone && (
          <p className="section-actions mt-8 pb-4 min-[640px]:mt-[3%]">
            <ButtonLink href="/leadership" arrow>{t("leadershipSection.meetMore")}</ButtonLink>
          </p>
        )}
      </div>
    </section>
  );
}
