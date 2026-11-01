import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/content-pages";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/iletisim")({
  head: () => staticHead("contact", "tr"),
  component: () => <ContactPage lang="tr" />,
});
