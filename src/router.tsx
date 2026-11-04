import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    // Jump to the top of a new page instantly; html {scroll-behavior:smooth} otherwise animates
    // through the whole (still revealing) page on every click.
    scrollRestorationBehavior: "instant",
    trailingSlash: "always",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
