import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, handleEdit, handleDelete }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
export default TodoList;
