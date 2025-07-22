import { useState } from 'react';
import './App.css'; // optional: style as you like

function App() {
  // State: list of todos
  const [todos, setTodos] = useState([]);
  // State: new task input value
  const [newTask, setNewTask] = useState('');

  // Handle typing in the input
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  // Add new task (prevent duplicate)
  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return; // ignore empty
    if (todos.find(todo => todo.text.toLowerCase() === trimmed.toLowerCase())) {
      alert("Task already exists!");
      return;
    }

    const newTodo = {
      id: Date.now(), // unique id
      text: trimmed,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setNewTask(''); // clear input
  };

  // Toggle complete/incomplete
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Edit task text
  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    const newText = prompt("Edit task:", todoToEdit.text);
    if (newText) {
      const trimmed = newText.trim();
      if (!trimmed) return;

      // prevent duplicate
      if (todos.find(todo => todo.text.toLowerCase() === trimmed.toLowerCase() && todo.id !== id)) {
        alert("Task already exists!");
        return;
      }

      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      ));
    }
  };


  // Delete task
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Count completed tasks
  const completedCount = todos.filter(todo => todo.completed).length;

  // Sort: incomplete tasks first, completed at bottom
  const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

  return (
    <div className="App">
      <h2> My Todo App</h2>

      {/* Input to add new task */}
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <p>Total tasks: {todos.length}</p>
      <p>Completed tasks: {completedCount}</p>

      <ul>
        {sortedTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleEdit(todo.id)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
