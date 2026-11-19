import MovedPage from "../../components/MovedPage";
import en from "../../locales/en.json";

// Former URL (listed in the earlier sitemap); kept so existing links keep working.
export const metadata = { title: en.meta.moved.title, robots: { index: false, follow: true }, alternates: { canonical: "/history" } };

export default function OurStoryRedirect() {
  return <MovedPage to="/history" />;
}
