import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/legal";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/gizlilik-politikasi")({
  head: () => staticHead("privacy", "tr"),
  component: () => <LegalPage lang="tr" kind="privacy" />,
});
