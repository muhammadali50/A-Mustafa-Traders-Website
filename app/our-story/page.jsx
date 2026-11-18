import MovedPage from "../../components/MovedPage";

// Former URL (listed in the earlier sitemap); kept so existing links keep working.
export const metadata = { title: "Moved | A. Mustafa Traders", robots: { index: false, follow: true }, alternates: { canonical: "/history" } };

export default function OurStoryRedirect() {
  return <MovedPage to="/history" label="History" />;
}
