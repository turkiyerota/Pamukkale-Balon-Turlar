import { createFileRoute } from "@tanstack/react-router";
import { PricesPage } from "@/components/pages/content-pages";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/en/prices")({
  head: () => staticHead("prices", "en"),
  component: () => <PricesPage lang="en" />,
});
