import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Employees", path: "/employees", icon: Users },
  { label: "Tasks", path: "/tasks", icon: ClipboardList },
  { label: "Reports", path: "/reports", icon: BarChart3 },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col sticky top-0">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-center pt-8">
        Task Manager
      </h1>

      {/* Menu */}
      <ul className="flex flex-col gap-3 mt-14 px-5 flex-1">
        {navItems.map(({ label, path, icon: Icon }) => (
          <li
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center gap-3 cursor-pointer rounded-lg p-3 transition ${
              location.pathname === path
                ? "bg-slate-700"
                : "hover:bg-slate-700"
            }`}
          >
            <Icon size={20} />
            {label}
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="px-5 pb-8">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer bg-red-600 hover:bg-red-700 rounded-lg p-3 transition"
        >
          <LogOut size={20} />
          Logout
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
