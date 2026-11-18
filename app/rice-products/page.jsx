import MovedPage from "../../components/MovedPage";

// Former URL (listed in the earlier sitemap); kept so existing links keep working.
export const metadata = { title: "Moved | A. Mustafa Traders", robots: { index: false, follow: true }, alternates: { canonical: "/products" } };

export default function RiceProductsRedirect() {
  return <MovedPage to="/products" label="Products" />;
}
