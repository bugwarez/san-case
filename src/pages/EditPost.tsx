import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/client";
import { useState, useEffect } from "react";

export default function EditPost() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => (await api.get(`/posts/${id}`)).data,
  });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setBody(data.body);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Post not found</div>;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Post updated (not really, since this is a fake API)!");
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSave}>
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      <div className="mb-2">
        <label className="block mb-1">Title</label>
        <input
          className="w-full border px-2 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Body</label>
        <textarea
          className="w-full border px-2 py-1"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
