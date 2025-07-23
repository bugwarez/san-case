import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/client";

export default function PostDetails() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => (await api.get(`/posts/${id}`)).data,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Post not found</div>;

  return (
    <div className="mb-6 max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-extrabold mb-3 text-gray-800">
        {data.title}
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed">{data.body}</p>
    </div>
  );
}
