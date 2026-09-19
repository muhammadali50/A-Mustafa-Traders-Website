import Image from "next/image";
import localFont from "next/font/local";

const headingFont = localFont({ src: "../public/fonts/lobster.ttf", weight: "400", display: "swap" });
const missionFont = localFont({ src: "../public/fonts/the-nautigal.ttf", weight: "400", display: "swap" });

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate overflow-hidden bg-white text-[#ac3033]">
      <div className="relative mx-auto max-w-[1280px] px-[8%] pt-10 pb-16 min-[640px]:px-[6.3%] min-[640px]:pt-[5.7%] min-[640px]:pb-[9.4%]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[5%] top-[18%] -z-10 h-[65%] opacity-[0.36] min-[640px]:inset-x-[28%] min-[640px]:top-[14%] min-[640px]:h-[68%]">
          <Image src="/media/background image of history and about us.png" alt="" fill className="object-contain" sizes="(max-width: 639px) 90vw, 44vw" />
        </div>
        <h2 id="about-title" className={`${headingFont.className} m-0 text-center text-[clamp(34px,9vw,42px)] leading-[1.15] font-normal min-[640px]:pl-[2.5%] min-[640px]:text-left min-[640px]:text-[clamp(36px,5.6vw,68px)]`}>About Us</h2>
        <p className="mt-5 text-center text-[14px] leading-[1.42] min-[640px]:mt-[2.3%] min-[640px]:text-left min-[640px]:text-[clamp(14px,2.02vw,24px)] min-[640px]:leading-[1.35]">
          Mustafa Traders is a trusted rice business serving Nawabshah with a strong focus on quality, taste, and customer satisfaction. For generations, we have carefully selected and supplied premium rice varieties while maintaining the values of honesty, fair dealing, and reliability. Today, we continue to serve our customers with the same commitment that has shaped our name for decades.
        </p>
        <h3 className={`${missionFont.className} my-5 text-center text-[42px] leading-none font-normal min-[640px]:my-[2%] min-[640px]:text-[clamp(38px,5.8vw,70px)]`}>Our Mission</h3>
        <div className="text-center text-[14px] leading-[1.42] min-[640px]:text-left min-[640px]:text-[clamp(14px,2.02vw,24px)] min-[640px]:leading-[1.35]">
          <p>Our mission is to provide quality rice at fair prices while maintaining the honesty, trust, and personal service that have defined Mustafa Traders since 1948.</p>
          <p>We aim to understand our customers&apos; needs and offer carefully selected rice varieties that deliver excellent taste and dependable quality.</p>
        </div>
      </div>
    </section>
  );
}
