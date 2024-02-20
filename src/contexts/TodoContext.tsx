import React, { Reducer, createContext, useContext, useReducer } from "react";

export type Todo = {
  name: string;
  completed: boolean;
  id: string;
};

type TodoState = Todo[];

type TodoAction = {
  type: "ADD_TODO" | "DELETE_TODO" | "EDIT_TODO" | "SET_COMPLETE" | "DELETE_ALL";
  payload: Todo;
};

export type TodoContextType = {
  todoState: TodoState;
  dispatch: React.Dispatch<TodoAction>;
};

export const TodoContext = createContext<TodoContextType | null>(null);

const { Provider } = TodoContext;
const reducer: Reducer<TodoState, TodoAction> = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, name: action.payload.name }
          : todo
      );
    case "SET_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.completed }
          : todo
      );
    case "DELETE_ALL":
      return []
    default:
      return state;
  }
};

const initialState: TodoState = [
  {
    name: "Read things they didn't teach you in school",
    completed: true,
    id: "1",
  },
  { name: "Read your anatomy", completed: false, id: "2" },
];

export default function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todoState, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ todoState, dispatch }}>{children}</Provider>;
}

export function useTodoContext() {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error("Can only use todoContext in a TodoProvider");
  }
  return todoContext;
}
