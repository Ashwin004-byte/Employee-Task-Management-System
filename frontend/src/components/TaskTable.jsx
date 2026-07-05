import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
} from "lucide-react";
import api from "../services/api";

function TaskTable({ openAddForm, openEditForm }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  // When TaskTable is used on the Dashboard (no props passed),
  // send the user to the full Tasks page instead of crashing.
  const handleAdd = openAddForm || (() => navigate("/tasks"));
  const handleEdit = openEditForm || (() => navigate("/tasks"));

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
      alert("Failed to load tasks");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      alert("Task Deleted Successfully");
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.assigned_to_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          📋 Task Management
        </h2>

        <div className="flex gap-3">

          <button
            onClick={fetchTasks}
            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Task
          </button>

        </div>

      </div>

      {/* Search */}
      <div className="relative mb-6">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search Task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg pl-10 p-3"
        />

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-800 text-white">
              <th className="p-3">ID</th>
              <th>Task</th>
              <th>Employee</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredTasks.length > 0 ? (

              filteredTasks.map((task) => (

                <tr
                  key={task.id}
                  className="border-b hover:bg-gray-100"
                >

                  <td className="p-3">{task.id}</td>

                  <td>{task.title}</td>

                  <td>{task.assigned_to_name}</td>

                  <td>{task.priority}</td>

                  <td>
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        task.status === "Completed"
                          ? "bg-green-500"
                          : task.status === "Pending"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {task.status}
                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => handleEdit(task)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No Tasks Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TaskTable;