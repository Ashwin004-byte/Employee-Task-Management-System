import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <div className="px-8 pt-8 pb-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
