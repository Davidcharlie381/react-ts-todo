import { memo, useState } from "react";
import { Todo, useTodoContext } from "../contexts/TodoContext";

const TodoItem = memo(({ name, completed, id }: Todo) => {
  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(name);

  const { dispatch } = useTodoContext();

  return (
    <div className="relative flex justify-between gap-5 items-center py-2">
      <div className="flex space-x-5">
        <input
          onChange={() => {
            setChecked(!checked);
            dispatch({
              type: "SET_COMPLETE",
              payload: { name, completed: !completed, id },
            });
          }}
          type="checkbox"
          name=""
          id=""
          checked={checked}
        />

        {isEditing && (
          <input
            type="text"
            className="border p-4 rounded-lg h-10 w-full"
            placeholder="Enter new todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}
        {!isEditing && (
          <span className={`text-xl ${checked && "line-through"}`}>{name}</span>
        )}
      </div>
      <div className="flex space-x-2">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 h-10 rounded-md bg-blue-400 text-white"
            >
              edit
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "DELETE_TODO",
                  payload: { id, completed, name },
                })
              }
              className="px-5 h-10 rounded-md bg-red-400 text-white"
            >
              delete
            </button>
          </>
        )}
        {isEditing && (
          <>
            <button
              onClick={() => {
                dispatch({
                  type: "EDIT_TODO",
                  payload: { completed, id, name: input },
                });
                setIsEditing(false);
              }}
              className="px-5 h-10 rounded-md bg-blue-400 text-white"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 h-10 rounded-md bg-red-400 text-white"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
});

export default TodoItem;
