import DashboardCards from "../components/DashboardCards";
import TaskTable from "../components/TaskTable";

function AdminDashboard() {
  return (
    <div>
      <DashboardCards />

      <div className="mt-10">
        <TaskTable />
      </div>
    </div>
  );
}

export default AdminDashboard;
