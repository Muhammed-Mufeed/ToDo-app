function TodoItem({ todo, toggleComplete, handleEdit, handleDelete }) {
  return (
    <li className="todo-item">
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
  );
}
export default TodoItem;
