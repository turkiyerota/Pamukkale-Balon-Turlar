import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticlePage } from "@/components/pages/blog";
import { articleHead } from "@/lib/page-meta";
import { getArticle, loadArticleBody } from "@/content/articles";

export const Route = createFileRoute("/kesfet/$slug")({
  loader: async ({ params }) => {
    const a = getArticle("tr", params.slug);
    if (!a) throw notFound();
    return { slug: a.body.slug, body: await loadArticleBody("tr", a.id) };
  },
  head: ({ loaderData }) => {
    const a = loaderData && getArticle("tr", loaderData.slug);
    return a
      ? articleHead(a)
      : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
  },
  component: Page,
});

function Page() {
  const { slug, body } = Route.useLoaderData();
  return <ArticlePage a={getArticle("tr", slug)!} body={body} />;
}
