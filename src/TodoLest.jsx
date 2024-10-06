import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleToggleDetails(e) {
    setNewTask(e.target.value);
  }

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
      toast.success("تم إضافة المهمة بنجاح!");
    }
  }

  // حذف مهمة
  function deleteTask(index) {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    toast.error("تم حذف المهمة بنجاح!");
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function markAsDone(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
    toast.success("تم إتمام المهمة بنجاح!");
  }

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h1 className="text-center mb-4">To-Do List</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={newTask}
            placeholder="Add a task"
            onChange={handleToggleDetails}
          />
          <button className="btn btn-primary" onClick={addTask}>Add</button>
        </div>

        {/* عرض قائمة المهام */}
        <ul className="list-group">
          {tasks.map((task, index) => (
            <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-success text-white' : ''}`}>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
              <div>
                <button className="btn btn-success btn-sm ms-2" onClick={() => markAsDone(index)} disabled={task.completed}>Done</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Delete</button>
                <button className="btn btn-warning btn-sm ms-2" onClick={() => moveTaskUp(index)}>Move Up</button>
                <button className="btn btn-warning btn-sm ms-2" onClick={() => moveTaskDown(index)}>Move Down</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
