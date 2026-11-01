import { createFileRoute } from "@tanstack/react-router";
import { BlogListPage } from "@/components/pages/blog";
import { blogHead } from "@/lib/page-meta";
import { totalPages } from "@/content/articles";

export const Route = createFileRoute("/en/insights/")({
  head: () => blogHead("en", 1, totalPages("en")),
  component: () => <BlogListPage lang="en" page={1} />,
});
