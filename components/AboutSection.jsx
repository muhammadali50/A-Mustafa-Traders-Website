import ButtonLink from "./ButtonLink";
import OptimizedImage from "./OptimizedImage";

// `standalone`: on the About page the banner carries the introduction, so the section starts at the mission.
export default function AboutSection({ standalone = false }) {
  const MissionHeading = standalone ? "h2" : "h3";
  return (
    <section id="about" aria-labelledby={standalone ? "about-mission" : "about-title"} className="relative isolate overflow-hidden bg-white text-[#ac3033]">
      <div className="relative mx-auto max-w-[1280px] px-[8%] pt-10 pb-16 min-[640px]:px-[6.3%] min-[640px]:pt-[5.7%] min-[640px]:pb-[9.4%]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[5%] top-[18%] -z-10 h-[65%] opacity-[0.36] min-[640px]:inset-x-[28%] min-[640px]:top-[14%] min-[640px]:h-[68%]">
          <OptimizedImage src="/media/background image of history and about us.webp" alt="" fill className="object-contain" sizes="(max-width: 639px) 90vw, 44vw" />
        </div>
        {!standalone && <>
          <h2 id="about-title" className="heading-display text-center min-[640px]:pl-[2.5%] min-[640px]:text-left">About Us</h2>
          <p className="mt-5 text-pretty text-center text-[15px] leading-[1.55] min-[640px]:mt-[2.3%] min-[640px]:text-left min-[640px]:text-[clamp(16px,1.9vw,24px)] min-[640px]:leading-[1.4]">
            Mustafa Traders is a trusted rice business serving Nawabshah with a strong focus on quality, taste, and customer satisfaction. For generations, we have carefully selected and supplied premium rice varieties while maintaining the values of honesty, fair dealing, and reliability. Today, we continue to serve our customers with the same commitment that has shaped our name for decades.
          </p>
        </>}
        <MissionHeading id="about-mission" className="font-script my-5 text-center text-[clamp(44px,11vw,52px)] leading-none font-normal min-[640px]:my-[2%] min-[640px]:text-[clamp(44px,5.8vw,74px)]">Our Mission</MissionHeading>
        <div className="text-pretty text-center text-[15px] leading-[1.55] min-[640px]:text-left min-[640px]:text-[clamp(16px,1.9vw,24px)] min-[640px]:leading-[1.4]">
          <p>Our mission is to provide quality rice at fair prices while maintaining the honesty, trust, and personal service that have defined Mustafa Traders since 1948.</p>
          <p>We aim to understand our customers&apos; needs and offer carefully selected rice varieties that deliver excellent taste and dependable quality.</p>
        </div>
        {!standalone && (
          <p className="section-actions mt-6">
            <ButtonLink href="/about" arrow>More about us</ButtonLink>
          </p>
        )}
      </div>
    </section>
  );
}
