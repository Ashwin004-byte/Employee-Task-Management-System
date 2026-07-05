import { useState, useEffect } from "react";
import api from "../services/api";

function EmployeeForm({ employee, fetchEmployees, closeForm }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "employee",
    department: "",
    designation: "",
  });

  useEffect(() => {
    if (employee) {
      setForm({
        full_name: employee.full_name,
        email: employee.email,
        password: "",
        role: employee.role,
        department: employee.department,
        designation: employee.designation,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (employee) {
        await api.put(`/users/${employee.id}`, form);
        alert("Employee Updated Successfully");
      } else {
        await api.post("/users/register", form);
        alert("Employee Added Successfully");
      }

      fetchEmployees();
      closeForm();

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        {!employee && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />
        )}

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            {employee ? "Update" : "Add"}
          </button>

          <button
            type="button"
            onClick={closeForm}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default EmployeeForm;