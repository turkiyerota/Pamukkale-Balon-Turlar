import { createFileRoute } from "@tanstack/react-router";
import { ReservationPage } from "@/components/pages/reservation";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/en/reservation")({
  head: () => staticHead("reservation", "en"),
  component: () => <ReservationPage lang="en" />,
});
