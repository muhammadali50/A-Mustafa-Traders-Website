import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="hero relative min-h-svh">
      <Image src="/media/Home page Background Image.jpg" alt="" fill preload sizes="100vw" className="hero-background -z-20 object-cover" />
      <div aria-hidden="true" className="hero-shade pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-copy absolute z-10 text-white">
        <h1 id="hero-heading" className="font-serif font-normal">
          <span className="block">Premium Rice</span>
          <span className="block text-[#ffb743]">Trusted Quality</span>
        </h1>
        <p className="hero-description font-medium">Delivering carefully selected rice with<br className="hidden min-[400px]:block" /> quality, purity and trust from Nawabshah.</p>
      </div>
      <div className="product-composition absolute" role="group" aria-label="Punj Sher rice and a freshly prepared rice bowl">
        <div className="rice-bag absolute aspect-[433/577]">
          {/* Preserve the previous asset's visible footprint inside its unchanged container. */}
          <div className="absolute" style={{ left: "18.7067%", top: "20.2773%", width: "54.9654%", height: "62.565%" }}>
            <Image src="/media/punj sher 5 kg home.png" alt="Punj Sher 5 kg rice bag" fill loading="eager" sizes="(max-width: 767px) 130px, 16vw" className="object-contain" />
          </div>
        </div>
        <Image src="/media/Rice bowl in Home page.png" alt="Bowl of cooked rice with vegetables and fresh mint" width={375} height={666} loading="eager" sizes="(max-width: 767px) 230px, 25vw" className="rice-bowl absolute h-auto" />
      </div>
    </section>
  );
}
