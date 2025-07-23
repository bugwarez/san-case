import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/client";
import type { Comment } from "../types/comment";

export default function PostComments() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => (await api.get(`/posts/${id}/comments`)).data,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="font-semibold mb-2">Comments</h3>
      <ul>
        {data.map((comment: Comment) => (
          <li key={comment.id} className="mb-2">
            <div className="font-bold">{comment.name}</div>
            <div className="text-sm">{comment.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
