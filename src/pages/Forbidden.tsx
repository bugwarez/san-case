import { useNavigate } from "react-router-dom";
import { getNav } from "../routes/nav";

export default function Forbidden() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">403 Forbidden</h1>
      <p className="mb-4">You do not have permission to access this page.</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => getNav().home.go(undefined, { navigate })}
      >
        Go Home
      </button>
    </div>
  );
}
