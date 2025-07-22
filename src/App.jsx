import { useState } from 'react';
import './App.css';
import { Toaster, toast } from 'sonner'; // import Toaster + toast
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => setNewTask(e.target.value);

  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;

    if (todos.find(todo => todo.text.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Task already exists!"); // use toast instead of alert
      return;
    }

    const newTodo = { id: Date.now(), text: trimmed, completed: false };
    setTodos([...todos, newTodo]);
    setNewTask('');
    toast.success("Task added!"); // optional: show success toast
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    const newText = prompt("Edit task:", todoToEdit.text);
    if (newText) {
      const trimmed = newText.trim();
      if (!trimmed) return;

      if (todos.find(todo => todo.text.toLowerCase() === trimmed.toLowerCase() && todo.id !== id)) {
        toast.error("Task already exists!"); // toast here too
        return;
      }

      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      ));
      toast.success("Task updated!"); // optional: show success toast
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success("Task deleted!"); // optional
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

  return (
    <div className="App">
      {/* Add Toaster here at the top-level of your JSX */}
      <Toaster richColors />
      
      <h2> My Todo App</h2>

      <TodoInput
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
      />

      <p>Total tasks: {todos.length}</p>
      <p>Completed tasks: {completedCount}</p>

      <TodoList
        todos={sortedTodos}
        toggleComplete={toggleComplete}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
