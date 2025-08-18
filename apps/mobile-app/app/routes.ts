import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/HomeRoute.tsx"),
  route("article/:title/:page", "routes/ArticleRoute.tsx"),
] satisfies RouteConfig;
