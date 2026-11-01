import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticlePage } from "@/components/pages/blog";
import { articleHead } from "@/lib/page-meta";
import { getArticle } from "@/content/articles";

export const Route = createFileRoute("/en/insights/$slug")({
  loader: ({ params }) => {
    const a = getArticle("en", params.slug);
    if (!a) throw notFound();
    return { slug: a.body.slug };
  },
  head: ({ loaderData }) => {
    const a = loaderData && getArticle("en", loaderData.slug);
    return a ? articleHead(a) : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  return <ArticlePage a={getArticle("en", slug)!} />;
}
