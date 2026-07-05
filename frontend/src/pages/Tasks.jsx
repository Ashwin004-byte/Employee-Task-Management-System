import { useState } from "react";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";

function Tasks() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openAddForm = () => {
    setSelectedTask(null);
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setSelectedTask(null);
    setShowForm(false);
  };

  return showForm ? (
    <TaskForm
      task={selectedTask}
      closeForm={closeForm}
      fetchTasks={() => window.location.reload()}
    />
  ) : (
    <TaskTable openAddForm={openAddForm} openEditForm={openEditForm} />
  );
}

export default Tasks;
