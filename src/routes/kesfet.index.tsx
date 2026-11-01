import { createFileRoute } from "@tanstack/react-router";
import { BlogListPage } from "@/components/pages/blog";
import { blogHead } from "@/lib/page-meta";
import { totalPages } from "@/content/articles";

export const Route = createFileRoute("/kesfet/")({
  head: () => blogHead("tr", 1, totalPages("tr")),
  component: () => <BlogListPage lang="tr" page={1} />,
});
