import { navigation } from "../data/navigation";
import { SITE_URL } from "../data/seo-metadata";

export const dynamic = "force-static";

const priority = { "/": 1, "/products": 0.9, "/rice-varieties": 0.9, "/contact": 0.8 };

export default function sitemap() {
  return navigation.map(({ href }) => ({
    url: href === "/" ? SITE_URL : `${SITE_URL}${href}`,
    changeFrequency: href === "/" || href === "/products" || href === "/rice-varieties" ? "monthly" : "yearly",
    priority: priority[href] ?? 0.7,
  }));
}
