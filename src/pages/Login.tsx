import { useAuth } from "../auth/AuthProvider";
import { getNav } from "../routes/nav";
import { useNavigate } from "react-router-dom";

import type { Permission } from "../routes/routeConfig";
const DUMMY_USER = {
  name: "John Doe",
  permissions: ["VIEW_POSTS", "VIEW_COMMENTS"] as Permission[],
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(DUMMY_USER);
    getNav().home.go(undefined, { navigate });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleLogin}
      >
        Login as John Doe
      </button>
    </div>
  );
}
