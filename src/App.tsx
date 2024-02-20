import { FC, useState } from "react";
import Tabs from "./components/Tabs";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { Todo, useTodoContext } from "./contexts/TodoContext";

const App: FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const todoContext = useTodoContext();

  const { todoState, dispatch } = todoContext;

  const active = todoState.filter((item) => item.completed === false);
  const completed = todoState.filter((item) => item.completed === true);

  return (
    <div className="flex place-content-center">
      <div className="mt-14 p-4 w-full max-w-2xl">
        <h1 className="text-center font-bold text-4xl mb-5">#Todo</h1>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <TodoForm />
        {todoState.length <= 0 && (
          <div className="text-center mt-4 text-lg">
            There are currently no todos
          </div>
        )}
        {activeTab === "all" &&
          todoState.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              name={todo.name}
            />
          ))}
        {activeTab === "active" &&
          active.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              name={todo.name}
            />
          ))}
        {activeTab === "completed" &&
          completed.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              name={todo.name}
            />
          ))}
        {completed.length > 0 && activeTab === "completed" && (
          <button onClick={() => {
            if (confirm("Are you sure to delete completed tasks?")) {
              dispatch({type: "DELETE_ALL", payload: {}})
            }
          }} className=" float-right px-5 h-10 rounded-md bg-red-400 mt-3 text-white">
            Delete all
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
