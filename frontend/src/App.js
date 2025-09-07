import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Add or Update Task
  const handleAdd = () => {
    if (!task.trim()) return;

    if (editIndex !== null) {
      // Update existing task
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = task;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Add new task
      setTodos([...todos, task]);
    }

    setTask("");
  };

  // Edit Task
  const handleEdit = (index) => {
    setTask(todos[index]);
    setEditIndex(index);
  };

  // Delete Task
  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>

      {/* Input and Add Button */}
      <div className="input-section">
        <input
          type="text"
          value={task}
          placeholder="Enter a task..."
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Task List */}
      <ul className="todo-list">
        {todos.length === 0 && <p>No tasks yet. Add one!</p>}
        {todos.map((todo, index) => (
          <li key={index}>
            <span>{todo}</span>
            <div>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
