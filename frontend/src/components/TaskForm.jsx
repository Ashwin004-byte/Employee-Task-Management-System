import { useState, useEffect } from "react";
import api from "../services/api";

function TaskForm({ task, closeForm, fetchTasks }) {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    assigned_to: "",
    priority: "Medium",
    start_date: "",
    due_date: "",
    status: "Pending",
  });

  const isLocked = task?.status === "Completed";

  useEffect(() => {
    loadEmployees();

    if (task) {
      setForm({
        title: task.title,
        description: task.description || "",
        assigned_to: task.assigned_to,
        priority: task.priority,
        start_date: task.start_date ? task.start_date.split("T")[0] : "",
        due_date: task.due_date ? task.due_date.split("T")[0] : "",
        status: task.status,
      });
    }
  }, [task]);

  const loadEmployees = async () => {
    try {
      const res = await api.get("/users");
      const onlyEmployees = res.data.users.filter(
        (u) => u.role === "employee"
      );
      setEmployees(onlyEmployees);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) {
      alert("Completed tasks cannot be edited.");
      return;
    }

    if (form.start_date && form.due_date && form.due_date < form.start_date) {
      setError("Due Date cannot be earlier than Start Date.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        ...form,
        assigned_by: user.id,
      };

      if (task) {
        await api.put(`/tasks/edit/${task.id}`, payload);
        alert("Task Updated Successfully");
      } else {
        await api.post("/tasks", payload);
        alert("Task Added Successfully");
      }

      fetchTasks();
      closeForm();

    } catch (err) {
      console.log(err);
      console.log("SERVER SAID:", err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        {task ? "Edit Task" : "Add Task"}
      </h2>

      {isLocked && (
        <p className="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4">
          This task is Completed and cannot be edited.
        </p>
      )}

      {error && (
        <p className="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          disabled={isLocked}
          className="w-full border p-3 rounded-lg disabled:bg-gray-100"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          disabled={isLocked}
          className="w-full border p-3 rounded-lg disabled:bg-gray-100"
        />

        <select
          name="assigned_to"
          value={form.assigned_to}
          onChange={handleChange}
          disabled={isLocked}
          className="w-full border p-3 rounded-lg disabled:bg-gray-100"
          required
        >
          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}

        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          disabled={isLocked}
          className="w-full border p-3 rounded-lg disabled:bg-gray-100"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              disabled={isLocked}
              className="w-full border p-3 rounded-lg disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
              disabled={isLocked}
              className="w-full border p-3 rounded-lg disabled:bg-gray-100"
            />
          </div>
        </div>

        {task && (
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={isLocked}
            className="w-full border p-3 rounded-lg disabled:bg-gray-100"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        )}

        <div className="flex gap-3">

          <button
            type="submit"
            disabled={isLocked}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-40"
          >
            {task ? "Update Task" : "Add Task"}
          </button>

          <button
            type="button"
            onClick={closeForm}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default TaskForm;