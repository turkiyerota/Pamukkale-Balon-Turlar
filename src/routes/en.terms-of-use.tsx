import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/legal";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/en/terms-of-use")({
  head: () => staticHead("terms", "en"),
  component: () => <LegalPage lang="en" kind="terms" />,
});
