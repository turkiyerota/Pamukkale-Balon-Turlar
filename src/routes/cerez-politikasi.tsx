import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/legal";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/cerez-politikasi")({
  head: () => staticHead("cookies", "tr"),
  component: () => <LegalPage lang="tr" kind="cookies" />,
});
