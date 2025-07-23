import { useQuery } from "@tanstack/react-query";
import api from "../api/client";
import { Link } from "react-router-dom";
import type { Post } from "../types/post";
import type { Comment } from "../types/comment";
import { getNav } from "../routes/nav";

export default function Home() {
  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["posts", "recent"],
    queryFn: async () => (await api.get("/posts")).data.slice(0, 5),
  });
  const { data: comments, isLoading: loadingComments } = useQuery({
    queryKey: ["comments", "recent"],
    queryFn: async () => (await api.get("/comments")).data.slice(0, 5),
  });

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 transition hover:shadow-2xl">
          <h2 className="font-semibold mb-4 text-lg text-gray-700">
            Recent Posts
          </h2>
          {loadingPosts ? (
            <div>Loading...</div>
          ) : (
            <ul className="space-y-2">
              {posts.map((post: Post) => (
                <li
                  key={post.id}
                  className="hover:bg-gray-100 rounded px-2 py-1 transition flex items-center"
                >
                  <Link
                    className="text-blue-700 font-semibold underline hover:text-blue-900"
                    to={getNav().post.get({ id: post.id })}
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 transition hover:shadow-2xl">
          <h2 className="font-semibold mb-4 text-lg text-gray-700">
            Recent Comments
          </h2>
          {loadingComments ? (
            <div>Loading...</div>
          ) : (
            <ul className="space-y-2">
              {comments.map((comment: Comment) => (
                <li
                  key={comment.id}
                  className="hover:bg-gray-100 rounded px-2 py-1 transition"
                >
                  <span className="font-bold text-gray-800">
                    {comment.name}:
                  </span>{" "}
                  <span className="text-gray-700">{comment.body}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
