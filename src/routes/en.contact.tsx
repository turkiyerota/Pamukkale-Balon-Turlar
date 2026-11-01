import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/content-pages";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/en/contact")({
  head: () => staticHead("contact", "en"),
  component: () => <ContactPage lang="en" />,
});
