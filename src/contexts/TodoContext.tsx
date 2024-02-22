import React, { Reducer, createContext, useContext, useReducer } from "react";

export type Todo = {
  name: string;
  completed: boolean;
  id: string;
};

type TodoState = Todo[];

// type TodoState<T>= {
//   all: T[];
//   active: T[];
//   completed: T[];
// };

type TodoAction =
  | {
    type: "ADD_TODO" | "DELETE_TODO" | "EDIT_TODO" | "SET_COMPLETE";
    payload: Todo;
  }
  | {
    type: "DELETE_ALL";
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
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

const initialState: TodoState = [
  {
    name: "Read physiology",
    completed: true,
    id: "1",
  },
  {
    name: "Read your anatomy",
    completed: false,
    id: "2"
  },
  {
    name: "Make the commented code in ./src/contextx/TodoContext.tsx:97 work",
    completed: false,
    id: "3 "
  }
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

// TODO: Make the commented code below work 

// const reducer: Reducer<TodoState, TodoAction> = (state, action) => {
//   switch (action.type) {
//     case "ADD_TODO":
//       return {
//         ...state,
//         all: [...state.all, action.payload],
//         active: [...state.active, action.payload],
//       };
//     case "DELETE_TODO":
//       return {
//         ...state,
//         all: state.all.filter((todo) => todo.id !== action.payload.id),
//         active: state.active.filter((todo) => todo.id !== action.payload.id),
//         completed: state.completed.filter(
//           (todo) => todo.id !== action.payload.id
//         ),
//       };
//     case "EDIT_TODO":
//       // state.map((todo) =>
//       //   todo.id === action.payload.id
//       //     ? { ...todo, name: action.payload.name }
//       //     : todo
//       // );
//       return {
//         ...state,
//         all: state.all.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, name: action.payload.name }
//             : todo
//         ),
//         active: state.active.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, name: action.payload.name }
//             : todo
//         ),
//         completed: state.completed.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, name: action.payload.name }
//             : todo
//         ),
//       };
//     case "SET_COMPLETE":
//       // state.map((todo) =>
//       //   todo.id === action.payload.id
//       //     ? { ...todo, completed: action.payload.completed }
//       //     : todo
//       // );
//       return {
//         ...state,
//         // all: state.all.map((todo) =>
//         //   todo.id === action.payload.id
//         //     ? { ...todo, completed: action.payload.completed }
//         //     : todo
//         // ),
//         // active: state.active.map((todo) =>
//         //   todo.id === action.payload.id
//         //     ? { ...todo, completed: action.payload.completed }
//         //     : todo
//         // ),
//         completed: state.completed.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, completed: action.payload.completed }
//             : todo
//         ),
//       };

//     case "DELETE_ALL":
//       return {
//         ...state,
//         completed: [],
//       };
//     default:
//       return state;
//   }
// };

// const initialState: TodoState = {
//   all: [
//     {
//       name: "Read things they didn't teach you in school",
//       completed: true,
//       id: "1",
//     },
//     { name: "Read your anatomy", completed: false, id: "2" },
//   ],
//   active: [{ name: "Read your anatomy", completed: false, id: "2" }],
//   completed: [
//     {
//       name: "Read things they didn't teach you in school",
//       completed: true,
//       id: "1",
//     },
//   ],
// };

// const reducer: Reducer<TodoState, TodoAction> = (state, action) => {
//   switch (action.type) {
//     case "ADD_TODO":
//       return {
//         ...state,
//         all: [...state.all, action.payload],
//         active: [...state.active, action.payload],
//       };
//     case "DELETE_TODO":
//       return {
//         ...state,
//         all: state.all.filter((todo) => todo.id !== action.payload.id),
//         active: state.active.filter((todo) => todo.id !== action.payload.id),
//         completed: state.completed.filter(
//           (todo) => todo.id !== action.payload.id
//         ),
//       };
//     case "EDIT_TODO":
//       // state.map((todo) =>
//       //   todo.id === action.payload.id
//       //     ? { ...todo, name: action.payload.name }
//       //     : todo
//       // );
//       return {
//         ...state,
//         all: state.all.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, name: action.payload.name }
//             : todo
//         ),
//         active: state.active.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, name: action.payload.name }
//             : todo
//         ),
//         completed: state.completed.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, name: action.payload.name }
//             : todo
//         ),
//       };
//     case "SET_COMPLETE":
//       // state.map((todo) =>
//       //   todo.id === action.payload.id
//       //     ? { ...todo, completed: action.payload.completed }
//       //     : todo
//       // );
//       return {
//         ...state,
//         all: state.all.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, completed: action.payload.completed }
//             : todo
//         ),
//         active: state.active.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, completed: action.payload.completed }
//             : todo
//         ),
//         completed: state.completed.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, completed: action.payload.completed }
//             : todo
//         ),
//       };

//     case "DELETE_ALL":
//       return {
//         ...state,
//         completed: [],
//       };
//     default:
//       return state;
//   }
// };
