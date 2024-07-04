import React, { useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const initialState = { todos: [], lastAddedTodo: null };

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        lastAddedTodo: action.payload,
      };
    case "TOGGLE_COMPLETED":
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.index
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTitle, setNewTitle] = useState("");

  const addTodo = () => {
    if (newTitle.trim()) {
      const newTodo = { title: newTitle, time: new Date(), completed: false };
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTitle("");
      toast.success("Todo added successfully!");
    }
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  const toggleCompleted = (index) => {
    dispatch({ type: "TOGGLE_COMPLETED", index });
  };

  return (
    <div className="container">
      <h1>TODO List</h1>
      <div className="form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter TODO title"
          className="input"
        />
        <button onClick={addTodo} className="addButton">
          Add TODO
        </button>
        <button onClick={clearAll} className="clearButton">
          Clear All
        </button>
      </div>

      {state.lastAddedTodo && (
        <div className="lastAdded">
          <h2>Last Added TODO</h2>
          <p className="title">
            <strong>Title:</strong> {state.lastAddedTodo.title}
          </p>
          <p className="time">
            <strong>Time:</strong> {state.lastAddedTodo.time.toLocaleString()}
          </p>
        </div>
      )}

      {state.todos.map((todo, index) => (
        <div
          key={index}
          className={`card ${todo.completed ? "completedCard" : ""}`}
        >
          <h2 className="title">{todo.title}</h2>
          <p className="time">{todo.time.toLocaleString()}</p>
          <button
            className={todo.completed ? "completed" : "notCompleted"}
            onClick={() => toggleCompleted(index)}
          >
            {todo.completed ? "Completed" : "Not Completed"}
          </button>
        </div>
      ))}

      <ToastContainer />
    </div>
  );
};

export default TodoApp;
