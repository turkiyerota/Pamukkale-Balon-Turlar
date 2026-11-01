import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "@/components/pages/content-pages";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/sik-sorulan-sorular")({
  head: () => staticHead("faq", "tr"),
  component: () => <FaqPage lang="tr" />,
});
