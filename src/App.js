import React, { useState } from 'react';
import './App.css'
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');

  // useEffect(() => {
  //   const storedTodos = sessionStorage.getItem('todos');
  //   if (storedTodos) {
  //     setTodos(JSON.parse(storedTodos));
  //   }
  // }, []);

  // useEffect(() => {
  //   sessionStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (newTodo.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };

      setTodos([...todos, newTask]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const handleUpdateTodo = (event, id) => {
    event.preventDefault();

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: editingTodoText,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  return (
    <div className='app'>
      <h1> Todo App</h1>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Add New Task"
        />
        <button type="submit"> Add </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <form onSubmit={(event) => handleUpdateTodo(event, todo.id)}>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={(event) => setEditingTodoText(event.target.value)}
                />
                <button type="submit" style={{marginRight:"45px"}}> Save </button>
              </form>
            ) : (
              <div style={{alignItems:"center" , display:"flex"}}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;