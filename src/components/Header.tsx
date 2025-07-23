import { useAuth } from "../auth/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-gray-100 border-b">
      <div className="font-bold text-lg">San TSG Case</div>
      <div className="flex items-center gap-4">
        {user && <span className="text-sm">Hello, {user.name}</span>}
        <button
          className="px-3 py-1 bg-red-600 text-white rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
