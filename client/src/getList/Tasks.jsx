import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tasks.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/tasks");
        setTasks(
          response.data.map((task) => ({
            ...task,
            cost: parseFloat(task.cost),
          }))
        );
      } catch (error) {
        console.log("Error while fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditClick = (task) => {
    setEditTaskId(task._id);
    setEditedTask({ ...task });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/task/${editTaskId}`,
        editedTask
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === editTaskId ? editedTask : task))
      );
      toast.success(response.data.message, { position: "top-right" });
      setEditTaskId(null);
    } catch (error) {
      console.log("Error while saving task", error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/delete/task/${taskToDelete}`
      );
      setTasks((previousTask) =>
        previousTask.filter((task) => task._id !== taskToDelete)
      );
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log("Error while deleting task", error);
    } finally {
      setIsModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const openModal = (task_id) => {
    setTaskToDelete(task_id);
    setIsModalOpen(true);
  };

  return (
    <div className="task-table">
      <Link to={"/add"} type="button" className="btn btn-primary">
        Nova Tarefa
        <i className="fa-solid fa-plus icon-spacing"></i>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Nome da Tarefa</th>
            <th scope="col">Custo R$</th>
            <th scope="col">Data Limite</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .sort((a, b) => a.display_order - b.display_order)
            .map((task) => (
              <tr key={task._id} className={task.cost >= 1000 ? "yellow" : ""}>
                {editTaskId === task._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="task_name"
                        value={editedTask.task_name}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="cost"
                        value={editedTask.cost}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="due_date"
                        value={
                          new Date(editedTask.due_date)
                            .toISOString()
                            .split("T")[0]
                        }
                        onChange={handleInputChange}
                      />
                    </td>
                    <td className="action-buttons">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleSaveClick}
                      >
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setEditTaskId(null)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{task.task_name}</td>
                    <td>{task.cost}</td>
                    <td>{new Date(task.due_date).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => handleEditClick(task)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => openModal(task._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteTask}
      />
    </div>
  );
};

export default Tasks;
