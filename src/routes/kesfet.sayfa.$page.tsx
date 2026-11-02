import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { BlogListPage } from "@/components/pages/blog";
import { blogHead } from "@/lib/page-meta";
import { totalPages } from "@/content/articles";
import { PAGES } from "@/lib/paths";

export const Route = createFileRoute("/kesfet/sayfa/$page")({
  loader: ({ params }) => {
    const n = Number(params.page);
    if (n === 1) throw redirect({ to: PAGES.blog.tr as never, statusCode: 301 });
    if (!Number.isInteger(n) || n < 1 || n > totalPages("tr")) throw notFound();
    return { page: n };
  },
  head: ({ loaderData }) =>
    loaderData
      ? blogHead("tr", loaderData.page, totalPages("tr"))
      : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] },
  component: Page,
});

function Page() {
  const { page } = Route.useLoaderData();
  return <BlogListPage lang="tr" page={page} />;
}
