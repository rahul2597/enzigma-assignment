import './App.css'
import React, { useEffect, useState } from "react";

function App() {

  const [tasks, setTasks] = useState([
    { id: 1, assignedTo: "User 1", status: "Completed", dueDate: "2024-07-12", priority: "Low", description: "This task is good" },
    { id: 2, assignedTo: "User 2", status: "In Progress", dueDate: "2024-09-01", priority: "High", description: "This task is good" },
  ]);

  const [showNewTask, setShowNewTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDeleteTaskMsg, setShowDeleteTaskMsg] = useState(false);
  const [showDeleteId, setShowDeleteId] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [newTask, setNewTask] = useState({
    assignedTo: "",
    status: "Not Started",
    dueDate: "",
    priority: "Normal",
    description: ""
  });

  useEffect(() => {
    console.log("show new task : " + JSON.stringify(newTask));
  },[newTask])

  //to update the new tab.
  const handleActionChange = (taskId, action) => {
    if (action === 'edit') {
      setShowEditTask(true);
      const taskToEdit = tasks.find(t => t.id === taskId);
      setNewTask({
        assignedTo: taskToEdit.assignedTo,
        status: taskToEdit.status,
        dueDate: taskToEdit.dueDate,
        priority: taskToEdit.priority,
        description: taskToEdit.description,
      });
      setEditingTaskId(taskId);
      
    } else if (action === 'delete') {
      // Implement delete functionality
      setShowDeleteId(taskId);
      setShowDeleteTaskMsg(true);
    }
  };

  //to change the new user.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  //to save the new user.
  const handleSave = () => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setShowNewTask(false);
  };

  const handleUpdate = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editingTaskId ? { ...task, ...newTask } : task
    );
    setTasks(updatedTasks);
    setShowEditTask(false);
  };

  const handleDelete = (id) => {
    const newTaskArray = tasks.filter(t => t.id != id);
    setTasks(newTaskArray);
    setShowDeleteTaskMsg(false);
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setShowNewTask(true)}
      >
        New Task
      </button>

      <table className="min-w-full table-auto mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Assigned To</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Due Date</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left">Comments</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="px-4 py-2">{task.assignedTo}</td>
              <td className="px-4 py-2">{task.status}</td>
              <td className="px-4 py-2">{task.dueDate}</td>
              <td className="px-4 py-2">{task.priority}</td>
              <td className="px-4 py-2">{task.description}</td>
              <td className="px-4 py-2">
                <select
                  onChange={(e) => handleActionChange(task.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value = ""></option>
                  <option value = "edit">Edit</option>
                  <option value = "delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for New Task */}
      {showNewTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">New Task</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2">Assigned To</label>
                <input
                  type="text"
                  name="assignedTo"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newTask.assignedTo}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Status</label>
                <select
                  name="status"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newTask.status}
                  onChange={handleChange}
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newTask.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Priority</label>
                <select
                  name="priority"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newTask.priority}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newTask.description}
                  onChange={handleChange}
                />
              </div>
            </form>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                onClick={() => setShowNewTask(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleSave}
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}


      {showEditTask && (
 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2">Assigned To</label>
                <input
                  type="text"
                  name="assignedTo"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newTask ? newTask.assignedTo : ""}
                  onChange={handleChange}
                />
              </div>
               
              <div className="mb-4">
                <label className="block mb-2">Status</label>
                <select
                  name="status"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newTask.status}
                  onChange={handleChange}
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newTask.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Priority</label>
                <select
                  name="priority"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newTask.priority}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newTask.description}
                  onChange={handleChange}
                />
              </div>
            </form>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                onClick={() => setShowEditTask(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleUpdate}
              >
                Save Task
              </button>
            </div>
          </div>
        </div> 

)}

{
  showDeleteTaskMsg && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Delete Task</h2>
      
      <div className = "mt-4">
        <h2>Do you want to delete {showDeleteId ? showDeleteId : ""}nd id?</h2> 
      </div>
      <div className="flex justify-end space-x-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setShowDeleteTaskMsg(false)}
        >
          No
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => { showDeleteId ? handleDelete(showDeleteId) : ""}}
        >
          Yes 
        </button>
      </div>
      </div>
    </div>
  )
}
</div>
);
}


export default App
