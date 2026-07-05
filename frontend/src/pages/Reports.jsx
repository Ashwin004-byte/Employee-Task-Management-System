import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Users,
  ClipboardList,
  Clock3,
  CheckCircle,
} from "lucide-react";

function Reports() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [usersRes, tasksRes] = await Promise.all([
        api.get("/users"),
        api.get("/tasks"),
      ]);

      const users =
        usersRes.data.users ||
        usersRes.data.data ||
        usersRes.data ||
        [];

      const taskList =
        tasksRes.data.tasks ||
        tasksRes.data.data ||
        tasksRes.data ||
        [];

      setEmployees(Array.isArray(users) ? users : []);
      setTasks(Array.isArray(taskList) ? taskList : []);
    } catch (error) {
      console.log("Reports Error:", error);
    }
  };

  const totalEmployees = employees.filter(
    (emp) => emp.role === "employee"
  ).length;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status?.toLowerCase() === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status?.toLowerCase() === "pending"
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const employeeReport = employees
    .filter((emp) => emp.role === "employee")
    .map((employee) => {
      const employeeTasks = tasks.filter(
        (task) => Number(task.assigned_to) === Number(employee.id)
      );

      return {
        id: employee.id,
        name: employee.full_name,
        total: employeeTasks.length,
        pending: employeeTasks.filter(
          (task) => task.status?.toLowerCase() === "pending"
        ).length,
        
        completed: employeeTasks.filter(
          (task) => task.status?.toLowerCase() === "completed"
        ).length,
      };
    });

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Reports Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-blue-100">Total Employees</p>
            <h2 className="text-4xl font-bold mt-2">{totalEmployees}</h2>
          </div>
          <Users size={36} />
        </div>

        <div className="bg-indigo-600 text-white rounded-xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-indigo-100">Total Tasks</p>
            <h2 className="text-4xl font-bold mt-2">{totalTasks}</h2>
          </div>
          <ClipboardList size={36} />
        </div>

        <div className="bg-orange-500 text-white rounded-xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-orange-100">Pending Tasks</p>
            <h2 className="text-4xl font-bold mt-2">{pendingTasks}</h2>
          </div>
          <Clock3 size={36} />
        </div>

        <div className="bg-green-600 text-white rounded-xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-green-100">Completed Tasks</p>
            <h2 className="text-4xl font-bold mt-2">{completedTasks}</h2>
          </div>
          <CheckCircle size={36} />
        </div>

      </div>

      {/* Task Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-6">
          Task Summary
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Total Tasks</span>
            <span className="font-bold">{totalTasks}</span>
          </div>

          <div className="flex justify-between">
            <span>Completed Tasks</span>
            <span className="font-bold text-green-600">
              {completedTasks}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Pending Tasks</span>
            <span className="font-bold text-orange-600">
              {pendingTasks}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Completion Rate</span>
            <span className="font-bold text-blue-600">
              {completionRate}%
            </span>
          </div>

        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full mt-6 overflow-hidden">
          <div
            className="h-4 bg-green-600 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>

      </div>

      {/* Employee-wise Report */}

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-6">
          Employee-wise Task Report
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full border border-gray-200">

            <thead>

              <tr className="bg-slate-800 text-white">

                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-center">Total Tasks</th>
                <th className="p-3 text-center">Pending</th>
                <th className="p-3 text-center">Completed</th>

              </tr>

            </thead>

            <tbody>

              {employeeReport.length > 0 ? (
                employeeReport.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{emp.name}</td>

                    <td className="p-3 text-center">
                      {emp.total}
                    </td>

                    <td className="p-3 text-center text-orange-600 font-semibold">
                      {emp.pending}
                    </td>

                    <td className="p-3 text-center text-green-600 font-semibold">
                      {emp.completed}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500"
                  >
                    No Employee Report Available
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Reports;