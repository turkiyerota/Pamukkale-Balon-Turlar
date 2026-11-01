import { createFileRoute } from "@tanstack/react-router";
import { FlightPage } from "@/components/pages/content-pages";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/ucus-bilgileri")({
  head: () => staticHead("flight", "tr"),
  component: () => <FlightPage lang="tr" />,
});
