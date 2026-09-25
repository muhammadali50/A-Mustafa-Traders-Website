import Image from "next/image";
import localFont from "next/font/local";

const headingFont = localFont({ src: "../public/fonts/lobster.ttf", weight: "400", display: "swap" });

const leaders = [
  { name: "Haji Meraj Ul Haq Mustafai", role: "CEO & Co-Owner", image: "Haji Meraj Ul Haq Mustafai.webp", width: 1122, height: 1402 },
  { name: "Abdulhaq Mustafai", role: "Managing Director & Co-Owner", image: "Haji AbdulHaq Mustafai.webp", width: 1122, height: 1402 },
  { name: "Akbar Ali", role: "Operations Manager", image: "Akbar Ali.webp", width: 1122, height: 1190 },
];

export default function LeadershipSection() {
  return (
    <section id="leadership" aria-labelledby="leadership-title" className="bg-[#dedbd8] text-[#ac3033]">
      <div className="mx-auto max-w-[1280px] px-[6.5%] pt-9 pb-10 min-[640px]:pt-[5.4%] min-[640px]:pb-[2.4%]">
        <h2 id="leadership-title" className={`${headingFont.className} m-0 text-center text-[clamp(32px,9vw,42px)] leading-[1.15] font-normal min-[640px]:text-left min-[640px]:text-[clamp(36px,5.6vw,68px)]`}>Our Leadership</h2>
        <p className="mx-auto mt-6 max-w-[360px] text-center text-[14px] leading-[1.4] min-[640px]:mt-[3%] min-[640px]:max-w-none min-[640px]:px-[1%] min-[640px]:text-left min-[640px]:text-[clamp(14px,2.02vw,24px)] min-[640px]:leading-[1.28]">
          Our business continues to grow under the leadership of the next generation, carrying forward the values of honesty, quality, and customer trust. With experience, dedication, and a commitment to excellence, our leadership team works together to preserve the legacy while moving the business forward.
        </p>
        <div className="mt-7 grid grid-cols-1 justify-items-center gap-10 min-[640px]:mt-[2.7%] min-[640px]:grid-cols-3 min-[640px]:gap-[3%]">
          {leaders.map((leader) => (
            <figure key={leader.name} className="m-0 w-[76%] max-w-[260px] min-[640px]:w-[72%] min-[640px]:max-w-none">
              <div className="relative mx-auto aspect-[110/165] w-[76%]">
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[90%] rounded-t-full bg-[#a12222]" />
                {/* The source files have transparent side margins; sizing by height preserves each portrait. */}
                <Image src={`/media/${leader.image}`} alt={leader.name} width={leader.width} height={leader.height} className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain" sizes="(max-width: 639px) 60vw, 20vw" />
              </div>
              <figcaption className="mt-[6%] bg-[#a12222] px-1 py-[3%] text-center text-[clamp(11px,3.3vw,14px)] leading-[1.12] font-bold text-white min-[640px]:text-[clamp(8px,1.2vw,15px)]">
                <span className="block">{leader.name}</span>
                <span className="block">{leader.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
