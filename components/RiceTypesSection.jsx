import OptimizedImage from "./OptimizedImage";
import localFont from "next/font/local";
import { riceVarieties } from "../data/rice-varieties";

const distributorFont = localFont({ src: "../public/fonts/lobster.ttf", weight: "400", display: "swap" });

export default function RiceTypesSection() {
  return (
    <section id="rice-types" aria-labelledby="rice-types-title" className="bg-white">
      <h2 id="rice-types-title" className="sr-only">Rice varieties</h2>
      <div className="relative isolate mx-auto aspect-[328/492] w-full max-w-[1280px] min-[640px]:aspect-[744/220]">
        <div aria-hidden="true" className="absolute inset-x-[8.2%] top-[10.4%] bottom-[22.3%] -z-10 bg-[#9e2424] min-[640px]:inset-x-[5.9%] min-[640px]:top-[34%] min-[640px]:bottom-[11.4%]" />
        <ul className="m-0 list-none p-0">
          {riceVarieties.map(({ name, lines, image, source, bowl, position, color }, index) => {
            const [x, y, width, height] = bowl;
            return (
              <li key={name} className={`absolute w-[38%] -translate-x-1/2 text-center min-[640px]:w-[18%] ${position}`}>
                <figure className="m-0">
                  {/* Align the visible bowls while retaining every pixel of the original images. */}
                  <div className="relative mx-auto w-[86.8%] min-[640px]:w-[66%]" style={{ aspectRatio: `${width}/${height}` }}>
                    <OptimizedImage src={`/media/${image}`} alt={name} width={source[0]} height={source[1]}
                      sizes="(max-width: 639px) 36vw, (max-width: 1280px) 12vw, 153px"
                      className="absolute max-w-none object-contain"
                      style={{ width: `${source[0] / width * 100}%`, height: `${source[1] / height * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
                  </div>
                  <figcaption className={`relative text-[clamp(11px,3.2vw,18px)] leading-[1.3] font-bold min-[640px]:text-[clamp(10px,1.5vw,19px)] ${index === 4 ? "mt-[5%]" : "mt-0"} ${index >= 3 ? "min-[640px]:mt-[1%]" : "min-[640px]:mt-[4%]"} ${color}`}>
                    {lines[0]}<br />{lines[1]}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
      <div aria-labelledby="distributors-title" className="mx-auto max-w-[1280px] px-[8%] pt-[8%] pb-[10%] min-[640px]:pt-[1%] min-[640px]:pb-[3.5%]">
        <h2 id="distributors-title" className={`${distributorFont.className} m-0 text-center text-[clamp(25px,7.5vw,40px)] leading-[1.2] font-normal text-[#ac3033] min-[640px]:text-[clamp(36px,5.6vw,68px)]`}>Distributors</h2>
        <div className="mt-[9%] flex items-center justify-center gap-[10%] min-[640px]:mt-[3%] min-[640px]:gap-[7%]">
          <OptimizedImage src="/media/Arshman Logo.webp" alt="Arshman Rice" width={1254} height={1254} className="h-auto w-[40%] object-contain min-[640px]:w-[16%]" sizes="(max-width: 639px) 34vw, (max-width: 1280px) 14vw, 180px" />
          <OptimizedImage src="/media/Mahmood Logo.webp" alt="Mahmood Rice" width={1254} height={1254} className="h-auto w-[40%] object-contain min-[640px]:w-[16%]" sizes="(max-width: 639px) 34vw, (max-width: 1280px) 14vw, 180px" />
        </div>
      </div>
    </section>
  );
}
