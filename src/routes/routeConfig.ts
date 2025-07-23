import Home from "../pages/Home";
import Login from "../pages/Login";
import Forbidden from "../pages/Forbidden";
import PostDetails from "../pages/PostDetails";

export type Permission =
  | "VIEW_POSTS"
  | "VIEW_COMMENTS"
  | "EDIT_POST"
  | "CREATE_POST";

export interface RouteConfig<T = unknown> {
  name: string;
  path: string;
  element?: React.ComponentType<T>;
  lazy?: () => Promise<{ default: React.ComponentType<T> }>;
  permissions?: Permission[];
  translations?: string[];
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    name: "login",
    path: "/login",
    element: Login,
    translations: ["login"],
  },
  {
    name: "home",
    path: "/",
    element: Home,
    permissions: ["VIEW_POSTS", "VIEW_COMMENTS"],
    translations: ["home"],
  },
  {
    name: "forbidden",
    path: "/403",
    element: Forbidden,
    translations: ["forbidden"],
  },
  {
    name: "posts",
    path: "/posts",
    lazy: () => import("../pages/Posts"),
    permissions: ["VIEW_POSTS"],
    translations: ["posts"],
  },
  {
    name: "post",
    path: "/posts/:id",
    lazy: () => import("../pages/Post"),
    permissions: ["VIEW_POSTS"],
    translations: ["post"],
    children: [
      {
        name: "postDetails",
        path: "",
        element: PostDetails,
        translations: ["postDetails"],
      },
      {
        name: "editPost",
        path: "edit",
        lazy: () => import("../pages/EditPost"),
        permissions: ["EDIT_POST"],
        translations: ["editPost"],
      },
      {
        name: "postComments",
        path: "comments",
        lazy: () => import("../pages/PostComments"),
        permissions: ["VIEW_COMMENTS"],
        translations: ["postComments"],
      },
    ],
  },
  {
    name: "createPost",
    path: "/posts/create",
    lazy: () => import("../pages/CreatePost"),
    permissions: ["CREATE_POST"],
    translations: ["createPost"],
  },
];

export default routes;
