import React, { useRef, useState } from "react";
import { useTodoContext } from "../contexts/TodoContext";

// interface IProps {
//   handleSubmit: (e: React.SyntheticEvent) => void;
// }

const TodoForm = () => {
  const [input, setInput] = useState("");

  const { dispatch } = useTodoContext();

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TODO",
      payload: {
        name: input,
        completed: false,
        id: Math.random().toString(32),
      },
    });
    inputRef.current?.blur()
    setInput("");
  };

  return (
    <div className="">
      <form
        className="mx-auto mt-5 gap-4 flex justify-center"
        onSubmit={handleSubmit}
        action=""
      >
        <input
          type="text"
          ref={inputRef}
          className="border rounded-lg p-4 w-3/4"
          placeholder="Enter details"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="w-1/4 rounded-lg bg-blue-500 text-white">Add</button>
      </form>
    </div>
  );
};

export default TodoForm;
