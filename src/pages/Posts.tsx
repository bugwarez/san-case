import { useQuery } from "@tanstack/react-query";
import api from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { getNav } from "../routes/nav";
import type { Post } from "../types/post";

export default function Posts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => (await api.get("/posts")).data,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Posts</h1>
        <ul className="space-y-2 mb-6">
          {data.slice(0, 10).map((post: Post) => (
            <li
              key={post.id}
              className="flex items-center gap-3 hover:bg-gray-100 rounded px-2 py-2 transition"
            >
              <Link
                className="text-blue-700 font-semibold underline hover:text-blue-900"
                to={getNav().post.get({ id: post.id })}
              >
                {post.title}
              </Link>
              {user?.permissions.includes("EDIT_POST") && (
                <button
                  className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition px-3 py-1 rounded shadow"
                  onClick={() =>
                    getNav().editPost.go(
                      { id: post.id },
                      { navigate, userPermissions: user.permissions }
                    )
                  }
                >
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
        {user?.permissions.includes("CREATE_POST") && (
          <button
            className="inline-block mt-2 px-5 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded font-semibold shadow"
            onClick={() =>
              getNav().createPost.go(undefined, {
                navigate,
                userPermissions: user.permissions,
              })
            }
          >
            + Create Post
          </button>
        )}
      </div>
    </div>
  );
}
