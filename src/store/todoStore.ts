import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type TodoItem = {
  title: string;
  description: string;
  done: boolean;
  time: string;
};

type TodoState = {
  titleInput: string;
  descriptionInput: string;
  createTime: string;
  todos: TodoItem[];
};

type TodoActions = {
  clear: () => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setTime: (value: string) => void;
  add: () => void;
  dlt: (index: number) => void;
  edit: (index: number, newTitle: string, newDescription: string) => void;
  toggleDone: (index: number) => void;
};

export const useTodoStore = create<TodoState & TodoActions>()(
  devtools(
    persist(
      (set, get) => ({
        titleInput: "",
        descriptionInput: "",
        createTime: "",
        todos: [],

        clear: () =>
          set(() => ({
            titleInput: "",
            descriptionInput: "",
          })),

        setTitle: (value) => set(() => ({ titleInput: value })),
        setDescription: (value) => set(() => ({ descriptionInput: value })),
        setTime: (value) => set(() => ({ createTime: value })),

        add: () => {
          const { titleInput, descriptionInput, todos } = get();
          if (!titleInput && !descriptionInput) return;

          set(() => ({
            todos: [
              ...todos,
              {
                title: titleInput,
                description: descriptionInput,
                done: false,
                time: new Date().toISOString(),
              },
            ],
            titleInput: "",
            descriptionInput: "",
          }));
        },

        dlt: (index) =>
          set((state) => ({
            todos: state.todos.filter((_, i) => i !== index),
          })),

        edit: (index, newTitle, newDescription) =>
          set((state) => {
            const updatedTodos = [...state.todos];
            if (!updatedTodos[index]) return state;
            updatedTodos[index] = {
              ...updatedTodos[index],
              title: newTitle,
              description: newDescription,
            };
            return { todos: updatedTodos };
          }),

        toggleDone: (index) =>
          set((state) => {
            const todos = [...state.todos];
            todos[index] = {
              ...todos[index],
              done: !todos[index].done,
            };
            return { todos };
          }),
      }),
      {
        name: "todo-storage",
      }
    )
  )
);
