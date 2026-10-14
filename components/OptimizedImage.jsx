import Image from "next/image";

export default function OptimizedImage({ src, ...props }) {
  if (typeof src !== "string" || !src.endsWith(".webp")) {
    return <Image src={src} {...props} />;
  }

  const avifSrc = src.replace(/\.webp$/i, ".avif");

  return (
    <picture style={{ display: "contents" }}>
      <source srcSet={avifSrc} type="image/avif" />
      <Image src={src} {...props} />
    </picture>
  );
}
