import { createFileRoute } from "@tanstack/react-router";
import { ReservationPage } from "@/components/pages/reservation";
import { staticHead } from "@/lib/page-meta";

export const Route = createFileRoute("/rezervasyon")({
  head: () => staticHead("reservation", "tr"),
  component: () => <ReservationPage lang="tr" />,
});
