import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/home";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/en/")({
  head: () => staticHead("home", "en"),
  component: () => <HomePage lang="en" />,
});
