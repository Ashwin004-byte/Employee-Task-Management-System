import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function EmployeeDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      const allTasks = res.data.tasks || [];
      const myTasks = allTasks.filter(
        (t) => String(t.assigned_to) === String(user.id)
      );
      setTasks(myTasks);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const isOverdue = (task) =>
    task.status !== "Completed" &&
    task.due_date &&
    new Date(task.due_date) < new Date(new Date().toDateString());

  const completed = tasks.filter((t) => t.status === "Completed").length;
  const overdue = tasks.filter(isOverdue).length;
  const pending = tasks.filter(
    (t) => t.status !== "Completed" && !isOverdue(t)
  ).length;

  const updateStatus = async (task, newStatus) => {
    if (task.status === "Completed") {
      alert("Completed tasks cannot be edited.");
      return;
    }
    try {
      await api.put(`/tasks/edit/${task.id}`, {
        title: task.title,
        description: task.description,
        assigned_to: task.assigned_to,
        priority: task.priority,
        due_date: task.due_date ? task.due_date.split("T")[0] : "",
        status: newStatus,
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.full_name}
          </h1>
          <p className="text-gray-500 mt-1">Here are your tasks</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-3xl font-bold mt-2">{tasks.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {completed}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-amber-600 mt-2">{pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Overdue</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{overdue}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">My Tasks</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Title</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  No tasks assigned yet.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{task.priority}</td>
                  <td className="p-3">
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString()
                      : "-"}
                    {isOverdue(task) && (
                      <span className="ml-2 text-xs text-red-600 font-semibold">
                        Overdue
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <select
                      value={task.status}
                      disabled={task.status === "Completed"}
                      onChange={(e) => updateStatus(task, e.target.value)}
                      className="border rounded p-1 disabled:opacity-50"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDashboard;