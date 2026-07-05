import { useEffect, useState } from "react";
import {
  Users,
  ClipboardList,
  Clock3,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";

function DashboardCards() {
  const [stats, setStats] = useState({
    employees: 0,
    tasks: 0,
    pending: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [userRes, taskRes] = await Promise.all([
        api.get("/users"),
        api.get("/tasks"),
      ]);

      const users = userRes.data.users || [];
      const tasks = taskRes.data.tasks || [];

      setStats({
        employees: users.length,
        tasks: tasks.length,
        pending: tasks.filter((t) => t.status !== "Completed").length,
        completed: tasks.filter((t) => t.status === "Completed").length,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Employees",
      value: stats.employees,
      icon: <Users size={40} />,
      color: "bg-blue-600",
    },
    {
      title: "Tasks",
      value: stats.tasks,
      icon: <ClipboardList size={40} />,
      color: "bg-purple-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <Clock3 size={40} />,
      color: "bg-orange-500",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: <CheckCircle size={40} />,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-white rounded-2xl shadow-xl p-6 flex justify-between items-center hover:scale-105 transition duration-300`}
        >
          <div className="flex-1 text-center">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <h1 className="text-4xl font-bold mt-3">
              {loading ? "..." : card.value}
            </h1>
          </div>
          <div className="opacity-90">{card.icon}</div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
