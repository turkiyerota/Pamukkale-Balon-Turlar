import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages/content-pages";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/hakkimizda")({
  head: () => staticHead("about", "tr"),
  component: () => <AboutPage lang="tr" />,
});
