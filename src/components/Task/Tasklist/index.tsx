import React, { useState } from "react";
import Task from "../Task";

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: "1", nama: "Task 1", perusahaan: "Company A", no_telp: "123", email: "email@company.com", tags: [] },
    { id: "2", nama: "Task 2", perusahaan: "Company B", no_telp: "456", email: "email@company.com", tags: [] },
  ]);

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleUpdateTask = (updatedTask: any) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          provided={{ innerRef: () => {}, draggableProps: {}, dragHandleProps: {} }}
        />
      ))}
    </div>
  );
};

export default TaskList;
