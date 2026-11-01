import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/legal";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/kullanim-kosullari")({
  head: () => staticHead("terms", "tr"),
  component: () => <LegalPage lang="tr" kind="terms" />,
});
