export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: "https://www.amustafatraders.com",
      changeFrequency: "monthly",
      priority: 1,
    },
    { url: "https://www.amustafatraders.com/rice-varieties", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.amustafatraders.com/rice-products", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.amustafatraders.com/our-story", changeFrequency: "yearly", priority: 0.6 },
    { url: "https://www.amustafatraders.com/contact", changeFrequency: "yearly", priority: 0.7 },
  ];
}
