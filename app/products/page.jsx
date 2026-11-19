import PageHero from "../../components/PageHero";
import ProductCatalogue from "../../components/ProductCatalogue";
import { createPageMetadata } from "../../data/seo-metadata";

export const metadata = createPageMetadata("/products");

export default function ProductsPage() {
  return (
    <main id="main-content">
      <PageHero page="products" path="/products" />
      <ProductCatalogue />
    </main>
  );
}
