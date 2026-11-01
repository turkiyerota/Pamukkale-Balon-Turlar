import { createFileRoute } from "@tanstack/react-router";
import { PricesPage } from "@/components/pages/content-pages";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/fiyatlar")({
  head: () => staticHead("prices", "tr"),
  component: () => <PricesPage lang="tr" />,
});
