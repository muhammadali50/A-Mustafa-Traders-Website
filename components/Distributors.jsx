import OptimizedImage from "./OptimizedImage";

const distributors = [
  { name: "Arshman Rice", logo: "/media/Arshman Logo.webp", width: 867, height: 867 },
  { name: "Mahmood Rice", logo: "/media/Mahmood Logo.webp", width: 1200, height: 1200 },
];

export default function Distributors({ className = "" }) {
  return (
    <div className={`page-container ${className}`}>
      <h2 id="distributors-title" className="heading-display text-center text-[var(--brand-red-text)]">Distributors</h2>
      <ul aria-labelledby="distributors-title" className="m-0 mt-[clamp(20px,3vw,40px)] flex list-none items-center justify-center gap-[clamp(32px,7vw,96px)] p-0">
        {distributors.map(({ name, logo, width, height }) => (
          <li key={name} className="w-[clamp(120px,16vw,200px)]">
            <OptimizedImage src={logo} alt={name} width={width} height={height} className="h-auto w-full object-contain" sizes="(max-width: 767px) 34vw, 200px" />
          </li>
        ))}
      </ul>
    </div>
  );
}
