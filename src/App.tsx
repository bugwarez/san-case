import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import React from "react";
import "./style/index.css";
import routes from "./routes/routeConfig";
import type { RouteConfig } from "./routes/routeConfig";
import { Suspense } from "react";
import { useAuth } from "./auth/AuthProvider";
import Header from "./components/Header";

function ProtectedRoute({ permissions }: { permissions?: string[] }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (permissions && !permissions.some((p) => user.permissions.includes(p))) {
    return <Navigate to="/403" replace />;
  }
  return <Outlet />;
}

function renderRoutes(routes: RouteConfig[]) {
  return routes.map((route) => {
    let Element: React.ReactNode = null;
    if (route.element) {
      Element = React.createElement(route.element);
    } else if (route.lazy) {
      const LazyComponent = React.lazy(route.lazy);
      Element = <LazyComponent />;
    }

    if (route.permissions) {
      return (
        <Route
          key={route.name}
          path={route.path}
          element={<ProtectedRoute permissions={route.permissions} />}
        >
          {route.children ? (
            renderRoutes(route.children)
          ) : (
            <Route index element={Element} />
          )}
        </Route>
      );
    }
    return (
      <Route key={route.name} path={route.path} element={Element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {renderRoutes(routes)}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
