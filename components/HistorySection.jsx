import Image from "next/image";
import localFont from "next/font/local";

const historyFont = localFont({ src: "../public/fonts/lobster.ttf", weight: "400", display: "swap" });

const founders = [
  {
    name: "Late Haji Muhammad Saddique",
    role: "Founder of A Mustafa Traders",
    image: "Late Haji Muhammad Siddque.webp",
    width: 224, height: 299,
    position: "min-[640px]:left-[1.5%] min-[640px]:top-0",
  },
  {
    name: "Late Haji Noor Mustafa Mustafai",
    role: "Chairman",
    image: "Late Haji Noor Mustafa Mustafai.webp",
    width: 225, height: 297,
    position: "min-[640px]:-right-[4%] min-[640px]:top-[39%]",
  },
];

export default function HistorySection() {
  return (
    <section id="history" aria-labelledby="history-title" className="relative isolate overflow-hidden bg-white">
      <div className="relative mx-auto max-w-[1280px] px-[6.3%] pt-[clamp(28px,8vw,44px)] pb-[7%] min-[640px]:px-[5.7%] min-[640px]:pt-[4.8%] min-[640px]:pb-[4.5%]">
        <div aria-hidden="true" className="pointer-events-none absolute top-[44%] -right-[15%] h-[45%] w-[130%] opacity-[0.36] min-[640px]:top-[12%] min-[640px]:right-[2%] min-[640px]:h-[73%] min-[640px]:w-[55%]">
          <Image src="/media/background image of history and about us.webp" alt="" fill className="object-contain" sizes="(max-width: 639px) 130vw, 55vw" />
        </div>
        <div className="relative grid grid-cols-1 min-[640px]:grid-cols-[53%_47%]">
          <div>
            <h2 id="history-title" className={`${historyFont.className} m-0 text-center text-[clamp(32px,10.5vw,44px)] leading-[1.1] font-normal text-[#ac3033] min-[640px]:pl-[2%] min-[640px]:text-left min-[640px]:text-[clamp(36px,5.6vw,68px)]`}>History</h2>
            <div className="mt-[6%] bg-[#9e2424] px-[9%] py-[7%] text-center text-[clamp(14px,4.05vw,18px)] leading-[1.32] text-white min-[640px]:mt-[6.3%] min-[640px]:px-[5.3%] min-[640px]:py-[8.2%] min-[640px]:text-left min-[640px]:text-[clamp(15px,2.28vw,28px)]">
              <p className="m-0">Founded in 1948 by <strong>Late Haji Muhammad Siddique</strong>, the business grew through honesty, hard work, and a commitment to providing quality rice sourced from Punjab and other cities. In 1968, his son <strong>Haji Noor Mustafa Mustafai</strong> joined the business, continuing his father’s legacy and carrying forward the same values of quality, trust, and customer satisfaction.</p>
            </div>
          </div>
          <div className="relative mt-[13%] flex flex-col items-center gap-[8vw] min-[640px]:mt-0 min-[640px]:block min-[640px]:min-h-[46vw] min-[1280px]:min-h-[589px]">
            {founders.map((founder) => (
              <figure key={founder.name} className={`relative m-0 w-[88%] min-[640px]:absolute min-[640px]:w-[49%] ${founder.position}`}>
                <Image src={`/media/${founder.image}`} alt={founder.name} width={founder.width} height={founder.height} className="mx-auto h-auto w-[76%] object-contain" sizes="(max-width: 639px) 59vw, 16vw" />
                <figcaption className="mt-[3%] bg-[#9e2424] px-1 py-[2%] text-center text-[clamp(11px,3.7vw,18px)] leading-[1.12] font-bold text-white min-[640px]:text-[clamp(8px,1.23vw,15px)]">
                  <span className="block">{founder.name}</span>
                  <span className="block">{founder.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
