import { createFileRoute } from "@tanstack/react-router";
import { FlightPage } from "@/components/pages/content-pages";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/en/flight-information")({
  head: () => staticHead("flight", "en"),
  component: () => <FlightPage lang="en" />,
});
