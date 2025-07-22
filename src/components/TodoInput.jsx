function TodoInput({ newTask, handleInputChange, handleAddTask }) {
  return (
    <div className="todo-input">
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}
export default TodoInput;
