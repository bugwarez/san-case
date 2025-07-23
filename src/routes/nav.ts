import routes from "./routeConfig";
import type { RouteConfig, Permission } from "./routeConfig";
import { useNavigate } from "react-router-dom";

type Params = Record<string, string | number>;

function buildUrl(path: string, params?: Params) {
  if (!params) return path;
  return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) =>
    params[key] !== undefined
      ? encodeURIComponent(String(params[key]))
      : `:${key}`
  );
}

export type NavObject = {
  [K in RouteConfig["name"]]: {
    get: (params?: Params) => string;
    go: (
      params?: Params,
      options?: {
        navigate?: ReturnType<typeof useNavigate>;
        userPermissions?: Permission[];
      }
    ) => void;
  };
};

const nav: NavObject = {};

routes.forEach((route) => {
  nav[route.name as keyof NavObject] = {
    get: (params?: Params) => buildUrl(route.path, params),
    go: (
      params?: Params,
      options?: {
        navigate?: ReturnType<typeof useNavigate>;
        userPermissions?: Permission[];
      }
    ) => {
      const url = buildUrl(route.path, params);
      if (route.permissions && options?.userPermissions) {
        const hasPermission = route.permissions.some((p) =>
          options.userPermissions!.includes(p)
        );
        if (!hasPermission) {
          alert("You do not have permission to access this page.");
          if (options?.navigate) options.navigate("/403");
          return;
        }
      }
      if (options?.navigate) options.navigate(url);
    },
  };
});

export default nav;
