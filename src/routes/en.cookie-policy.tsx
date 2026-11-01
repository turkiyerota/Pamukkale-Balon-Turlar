import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/legal";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/en/cookie-policy")({
  head: () => staticHead("cookies", "en"),
  component: () => <LegalPage lang="en" kind="cookies" />,
});
