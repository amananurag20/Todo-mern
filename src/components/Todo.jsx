import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/todos', {
        withCredentials: true,
      });
      setTodos(data.todos);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch todos');
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const { data } = await axios.post(
        'http://localhost:5000/todos',
        { text: newTodo },
        { withCredentials: true }
      );
      setTodos([...todos, data.todo]);
      setNewTodo('');
      toast.success('Todo added successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success('Todo deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete todo');
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.patch(
        `http://localhost:5000/todos/${id}`,
        { completed: !completed },
        { withCredentials: true }
      );
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      toast.success('Todo status updated');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update todo status');
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditText(todo.text);
  };

  const updateTodo = async (id) => {
    if (!editText.trim()) return;

    try {
      await axios.patch(
        `http://localhost:5000/todos/${id}`,
        { text: editText },
        { withCredentials: true }
      );
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, text: editText } : todo
        )
      );
      setEditingTodo(null);
      toast.success('Todo updated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update todo');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Todos</h1>
      
      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Todo
          </button>
        </div>
      </form>

      {/* Todo List */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center gap-4 bg-white p-4 rounded shadow"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id, todo.completed)}
              className="h-5 w-5"
            />
            
            {editingTodo === todo._id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => updateTodo(todo._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTodo(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => startEditing(todo)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
