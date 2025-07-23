import { useState } from "react";
import { getNav } from "../routes/nav";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Post created (not really, since this is a fake API)!");
    getNav().posts.go(undefined, { navigate });
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleCreate}>
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
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
        className="px-4 py-2 bg-green-600 text-white rounded"
        type="submit"
      >
        Create
      </button>
    </form>
  );
}
