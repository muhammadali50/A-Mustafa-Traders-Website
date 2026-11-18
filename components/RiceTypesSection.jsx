import OptimizedImage from "./OptimizedImage";
import Distributors from "./Distributors";
import ButtonLink from "./ButtonLink";
import { riceVarieties } from "../data/rice-varieties";

/*
 * Five equally sized plates on a red panel aligned to the page container. Plates in the first
 * row are lifted by half their size so each one overlaps the panel's top edge identically
 * (see `.varieties` in globals.css for the per-breakpoint column counts).
 */
export default function RiceTypesSection() {
  return (
    <section id="rice-types" aria-labelledby="rice-types-title" className="varieties bg-white">
      <h2 id="rice-types-title" className="sr-only">Rice varieties</h2>
      <div className="page-container">
        <div className="varieties-panel">
          <ul className="varieties-grid">
            {riceVarieties.map(({ name, lines, image, source, bowl }) => {
              const [x, y, width, height] = bowl;
              return (
                <li key={name}>
                  <figure className="m-0">
                    {/* Crop to the visible bowl so every plate has the same footprint. */}
                    <div className="variety-plate" style={{ aspectRatio: `${width}/${height}` }}>
                      <OptimizedImage src={`/media/${image}`} alt={`Bowl of ${name}`} width={source[0]} height={source[1]}
                        sizes="(max-width: 599px) 34vw, (max-width: 899px) 19vw, 170px"
                        className="absolute max-w-none object-contain"
                        style={{ width: `${source[0] / width * 100}%`, height: `${source[1] / height * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
                    </div>
                    <figcaption className="variety-label">{lines[0]}<br />{lines[1]}</figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="section-actions mt-[clamp(20px,2.5vw,32px)]">
          <ButtonLink href="/rice-varieties" arrow>Explore rice varieties</ButtonLink>
        </p>
      </div>
      <Distributors className="pt-[clamp(32px,5vw,56px)] pb-[clamp(48px,7vw,80px)]" />
    </section>
  );
}
