import { useState } from "react";
import { useTodoStore } from "../store/todoStore";

export default function TodoList() {
  const {
    todos,
    edit,
    toggleDone,
    dlt,
  } = useTodoStore();

  
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");


  const startEdit = (index: number) => {
    const todo = [...todos][index];
    setEditIndex(index);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const saveEdit = (index: number) => {
    edit(index, editTitle, editDescription);
    setEditIndex(null);
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        {[...todos].reverse().map((item, index) => {
          const realIndex = todos.length - 1 - index;
          return (
            <div
              key={realIndex}
              className={`${
                item.done && "opacity-50"
              }  bg-gray-900 p-4 rounded border border-gray-700 shadow-sm`}>
              {editIndex === realIndex ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="p-2 bg-gray-700 text-white border border-gray-600 rounded"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="p-2 bg-gray-700 text-white border border-gray-600 rounded"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(realIndex)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm">
                      Save
                    </button>
                    <button
                      onClick={() => setEditIndex(null)}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-5 justify-between items-start">
                    <div className="flex gap-2">
                      <div className=" w-[20px] h-[30px]">
                        <input
                          className="block h-[30px] w-[20px]"
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleDone(realIndex)}
                        />
                      </div>
                      <div>
                        <strong
                          className={`${
                            item.done
                              ? "text-gray-400 line-through"
                              : "text-white"
                          } text-[20px]`}>
                          {item.title}
                        </strong>
                        <p
                          className={`${
                            item.done
                              ? "text-gray-500 line-through"
                              : "text-gray-300"
                          } `}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-gray-500">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => startEdit(realIndex)}
                          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white rounded text-sm">
                          Edit
                        </button>
                        <button
                          onClick={() => dlt(realIndex)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm">
                          Delete
                        </button>
                      </div>
                      <span className="whitespace-nowrap">
                        {" "}
                        {new Date(item.time).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
