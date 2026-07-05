import { useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

function Employees() {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const openAddForm = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const openEditForm = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const closeForm = () => {
    setSelectedEmployee(null);
    setShowForm(false);
  };

  return showForm ? (
    <EmployeeForm
      employee={selectedEmployee}
      closeForm={closeForm}
      fetchEmployees={() => window.location.reload()}
    />
  ) : (
    <EmployeeTable openAddForm={openAddForm} openEditForm={openEditForm} />
  );
}

export default Employees;
