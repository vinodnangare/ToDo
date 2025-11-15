import { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const api = import.meta.env.VITE_API || "http://localhost:8080";
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [completed, setCompleted] = useState(false);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const r = await axios.get(api);
      setList(Array.isArray(r.data) ? r.data : r.data?.todos || []);
    } catch (e) {
      setList([]);
    }
  };

  const addItem = async () => {
    if (!title) return;
    await axios.post(api, { title, priority, completed });
    setTitle("");
    setPriority("Low");
    setCompleted(false);
    loadData();
  };

  const startEdit = (item) => {
    setEdit(item.id);
    setTitle(item.title);
    setPriority(item.priority);
    setCompleted(item.completed);
  };

  const saveEdit = async () => {
    await axios.patch(`${api}/${edit}`, { title, priority, completed });
    setEdit(null);
    setTitle("");
    setPriority("Low");
    setCompleted(false);
    loadData();
  };

  const removeItem = async (id) => {
    await axios.delete(`${api}/${id}`);
    loadData();
  };

  const toggleCompleted = async (item) => {
    await axios.patch(`${api}/${item.id}`, { completed: !item.completed });
    loadData();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Todo Manager</h1>

        <div className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-3 gap-4">
          <input
            className="px-3 py-2 border rounded-lg w-full"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="px-3 py-2 border rounded-lg w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-5 w-5"
            />
            <span className="text-gray-600">Completed</span>
          </div>

          {edit ? (
            <button
              onClick={saveEdit}
              className="col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg active:scale-95 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={addItem}
              className="col-span-3 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg active:scale-95 transition"
            >
              Add Todo
            </button>
          )}
        </div>

        <div className="space-y-4">
          {list.map((item) => {
            const isDone = Boolean(item.completed);
            return (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-5 shadow rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleCompleted(item)}
                    className="h-5 w-5"
                  />

                  <div>
                    <p className={`text-lg font-medium ${isDone ? "line-through text-gray-500" : ""}`}>
                      {item.title}
                    </p>
                    <p className={`text-sm ${isDone ? "line-through text-gray-400" : "text-gray-500"}`}>
                      Priority: {item.priority}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg active:scale-95 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="px-4 py-1 bg-red-400 hover:bg-red-500 text-white rounded-lg active:scale-95 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
