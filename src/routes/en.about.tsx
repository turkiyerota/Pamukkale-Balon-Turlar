import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages/content-pages";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/en/about")({
  head: () => staticHead("about", "en"),
  component: () => <AboutPage lang="en" />,
});
