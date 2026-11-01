import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "@/components/pages/content-pages";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/en/faqs")({
  head: () => staticHead("faq", "en"),
  component: () => <FaqPage lang="en" />,
});
