// components/Todo.tsx
import { useState } from "react";
import "../index.css";
import { useTodoStore } from "../store/todoStore";
import TodoList from "./TodoList";

export default function Todo() {
  const {
    titleInput,
    descriptionInput,
    add,
    setDescription,
    setTime,
    setTitle,
  } = useTodoStore();

  const [isShow, setShow] = useState(false);

  return (
    <div className="min-h-screen px-4 py-20 font-sans text-white bg-gray-950">
      <h1 className="text-4xl font-bold mb-8 text-center">Todo</h1>

      <div className="flex flex-col gap-4 mb-10">
        <input
          type="text"
          placeholder="Title"
          value={titleInput}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
        />
        <textarea
          placeholder="Description"
          value={descriptionInput}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
        />
        <button
          onClick={() => {
            if (titleInput || descriptionInput) add();
            setTime(new Date().toISOString());
          }}
          className="self-start px-4 py-2 bg-green-700 hover:bg-green-600 rounded-md text-white transition-colors">
          Add Todo
        </button>
      </div>
      <button onClick={() => setShow(!isShow)}>show</button>
      {isShow && <TodoList />}
    </div>
  );
}
