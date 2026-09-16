import Image from "next/image";

const riceTypes = [
  {
    name: "1121 Steam Basmati Rice", lines: ["1121 Steam", "Basmati Rice"],
    image: "1121 Steam Basmati rice.png", source: [1122, 1402], bowl: [34, 166, 1009, 1004],
    position: "left-[26%] top-[5.5%] min-[640px]:left-[17.5%] min-[640px]:top-[4%]",
    color: "text-white",
  },
  {
    name: "1121 Sella Basmati Rice", lines: ["1121 Sella", "Basmati Rice"],
    image: "1121 Sella Basmati Rice.png", source: [1122, 1402], bowl: [36, 170, 1027, 1021],
    position: "left-[73%] top-[5.5%] min-[640px]:left-[51%] min-[640px]:top-[4%]",
    color: "text-white",
  },
  {
    name: "PK 386 Full Grain Rice", lines: ["PK 386 Full", "Grain Rice"],
    image: "Pk-386 Full Grain Rice.png", source: [1122, 1402], bowl: [38, 176, 1045, 1041],
    position: "left-[26%] top-[35.4%] min-[640px]:left-[83%] min-[640px]:top-[4%]",
    color: "text-white",
  },
  {
    name: "Basmati White Rice", lines: ["Basmati", "White Rice"],
    image: "basmati white rice.png", source: [1122, 1402], bowl: [32, 162, 1000, 995],
    position: "left-[73%] top-[35.4%] min-[640px]:left-[35.5%] min-[640px]:top-[48.6%]",
    color: "text-white min-[640px]:text-[#b42125]",
  },
  {
    name: "Basmati Broken Rice", lines: ["Basmati", "Broken Rice"],
    image: "basmati broken rice.png", source: [1060, 1484], bowl: [22, 237, 1013, 1018],
    position: "left-1/2 top-[64.3%] min-[640px]:left-[69%] min-[640px]:top-[48.6%]",
    color: "text-[#b42125]",
  },
];

export default function RiceTypesSection() {
  return (
    <section id="rice-types" aria-labelledby="rice-types-title" className="bg-white">
      <h2 id="rice-types-title" className="sr-only">Rice varieties</h2>
      <div className="relative isolate mx-auto aspect-[328/492] w-full max-w-[1280px] min-[640px]:aspect-[744/430]">
        <div aria-hidden="true" className="absolute inset-x-[8.2%] top-[10.4%] bottom-[22.3%] -z-10 bg-[#9e2424] min-[640px]:inset-x-[6.7%] min-[640px]:top-[16.7%] min-[640px]:bottom-[26%]" />
        <ul className="m-0 list-none p-0">
          {riceTypes.map(({ name, lines, image, source, bowl, position, color }, index) => {
            const [x, y, width, height] = bowl;
            return (
              <li key={name} className={`absolute w-[38%] -translate-x-1/2 text-center min-[640px]:w-[28%] ${position}`}>
                <figure className="m-0">
                  {/* Align the visible bowls while retaining every pixel of the original images. */}
                  <div className="relative mx-auto w-[86.8%] min-[640px]:w-[66%]" style={{ aspectRatio: `${width}/${height}` }}>
                    <Image src={`/media/${image}`} alt={name} width={source[0]} height={source[1]}
                      sizes="(max-width: 639px) 36vw, (max-width: 1280px) 20vw, 256px"
                      className="absolute max-w-none object-contain"
                      style={{ width: `${source[0] / width * 100}%`, height: `${source[1] / height * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
                  </div>
                  <figcaption className={`relative text-[clamp(11px,3.2vw,18px)] leading-[1.3] font-bold min-[640px]:text-[clamp(15px,2.28vw,28px)] ${index === 4 ? "mt-[5%]" : "mt-0"} ${index >= 3 ? "min-[640px]:mt-[1%]" : "min-[640px]:mt-[4%]"} ${color}`}>
                    {lines[0]}<br />{lines[1]}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
