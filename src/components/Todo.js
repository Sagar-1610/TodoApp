import React, { useState } from "react";


const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [InputValue, setInputValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (InputValue.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: InputValue,
      };
      setTodo([...todo, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodo = todo.filter((todo) => todo.id !== id);
    setTodo(updatedTodo);
  };

  const enterEditMode = (id, text) => {
    setEditMode(true);
    setEditId(id);
    setEditValue(text);
  };

  const updatedTodo = () => {
    const updateTodo = todo.map((todo) => {
      if (todo.id === editId) {
        return {
          ...todo,
          text: editValue,
        };
      }
      return todo;
    });
    setTodo(updateTodo);
    setEditId(null);
    setEditValue("");
    setEditMode(false);
  };

  return (
    <div className="h-full w-screen color">
      <div className=" flex flex-col items-center ">
      <div className="text-4xl underline font-bold font-mono text-white">Todo App</div>
      <input
        type="text"
        value={InputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-2/5 my-10 p-2 rounded-2xl text-xl font-semibold font-mono"
      />
      {editMode ? (
        <div>
          <input className="w-3/5 rounded-sm text-base font-semibold font-mono "
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={updatedTodo} className="w-20 bg-green-500 px-2 ml-2 py-1 text-white text-sm">
            Update
          </button>
        </div>
      ) : (
        <button
          onClick={addTodo}
          className="bg-violet-500 mx-10 px-6 py-3 text-white font-bold"
        >
          Add
        </button>
      )}
      </div>
  
      <div >
        <div  >
          <ul className="flex justify-center flex-col items-center mt-5">
            {todo.map((todo) => (
              <li key={todo.id} className="bg-transparent w-2/5 h-14 border-white border-4 rounded-3xl text-center text-base mb-20 font-semibold font-mono text-white">
                <div className="pt-2.5">
                {todo.text}
                </div>
                <div className="mt-2 mb-10">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500  px-4 py-2 text-white text-sm m-4"
                >
                  Delete
                </button>
                <button
                  onClick={() => enterEditMode(todo.id, todo.text)}
                  className="bg-orange-500 px-4 py-2 text-white text-sm"
                >
                  Edit
                </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
