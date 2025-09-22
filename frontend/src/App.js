import React, { useState, useEffect } from "react";
import API from "./api"; // 👈 import axios helper
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(""); // for backend date column
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch all todos from backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add or Update Task
  const handleAdd = async () => {
    if (!task.trim() || !date) return;

    try {
      if (editId) {
        // Update task
        await API.put(`/todos/${editId}`, { todo: task, date });
      } else {
        // Add new task
        await API.post("/todos", { todo: task, date });
      }

      setTask("");
      setDate("");
      setEditId(null);
      fetchTodos(); // refresh list
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Edit Task
  const handleEdit = (todo) => {
    setTask(todo.todo);
    setDate(todo.date);
    setEditId(todo.id);
  };

  // Delete Task
  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos(); // refresh list
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="app">
      <h1>To-Do List (Connected to Laravel)</h1>

      {/* Input and Add Button */}
      <div className="input-section">
        <input
          type="text"
          value={task}
          placeholder="Enter a task..."
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAdd}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Task List */}
      <ul className="todo-list">
        {todos.length === 0 && <p>No tasks yet. Add one!</p>}
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>
              {todo.todo} - <small>{todo.date}</small>
            </span>
            <div>
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
