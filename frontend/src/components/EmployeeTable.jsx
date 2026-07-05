import { useEffect, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  UserPlus,
  RefreshCw,
} from "lucide-react";
import api from "../services/api";

function EmployeeTable({ openAddForm, openEditForm }) {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/users");
      setEmployees(res.data.users);
    } catch (err) {
      console.log(err);
      alert("Failed to load employees");
    }
  };

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);
      alert("Employee Deleted Successfully");
      fetchEmployees();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-slate-800">
          👥 Employee Management
        </h2>

        <div className="flex gap-3">

          <button
            onClick={fetchEmployees}
            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={openAddForm}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            <UserPlus size={18} />
            Add Employee
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
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg pl-10 p-3 outline-none"
        />

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-800 text-white">

              <th className="p-3">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredEmployees.length > 0 ? (

              filteredEmployees.map((emp) => (

                <tr
                  key={emp.id}
                  className="border-b hover:bg-gray-100"
                >

                  <td className="p-3">{emp.id}</td>
                  <td>{emp.full_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>

                  <td>

                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() => openEditForm(emp)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteEmployee(emp.id)}
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
                  No Employees Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default EmployeeTable;