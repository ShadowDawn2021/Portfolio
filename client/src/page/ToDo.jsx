import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../css/ToDo.css'

function ToDo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchData = () => {
    axios.get("http://localhost:8080/api/todos")
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:8080/api/todos', { title: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  };

  const toggleComplete = (id) => {
    const todo = todos.find(todo => todo._id === id);
    axios.put(`http://localhost:8080/api/todos/${id}`, { completed: !todo.completed })
      .then((response) => {
        setTodos(todos.map(todo => todo._id === id ? response.data : todo));
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8080/api/todos/delete/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div className="todo-container">
      <Header />
      <h1 className="todo-title">To-Do List</h1>
      <div className="todo-input-container">
        <input
          className="todo-input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task"
        />
        <button className="todo-add-button" onClick={addTodo}>Add</button>
      </div>
      <span className="todo-instruction">Click on the item to mark as complete</span>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <span
              className={`todo-title-item ${todo.completed ? 'completed' : ''}`}
              onClick={() => toggleComplete(todo._id)}
            >
              {todo.title}
            </span>
            <button className="todo-delete-button" onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
