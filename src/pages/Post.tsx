import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/client";

export default function Post() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => (await api.get(`/posts/${id}`)).data,
  });
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Post not found</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p className="mb-4">{data.body}</p>
      <div className="flex gap-4 mb-4">
        <NavLink
          to={`/posts/${id}/edit`}
          className={({ isActive }) =>
            isActive ? "font-bold underline" : "text-blue-600 underline"
          }
        >
          Edit Post
        </NavLink>
        <NavLink
          to={`/posts/${id}/comments`}
          className={({ isActive }) =>
            isActive ? "font-bold underline" : "text-blue-600 underline"
          }
        >
          Comments
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
