import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL_VERCEL}/api/tasks`
        );
        setTasks(response.data);
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
        `${process.env.REACT_APP_URL_VERCEL}/api/update/task/${editTaskId}`,
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
        `${process.env.REACT_APP_URL_VERCEL}/api/delete/task/${taskToDelete}`
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

  const formatDateForInput = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(
      adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset()
    );
    return adjustedDate.toISOString().split("T")[0];
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  const moveTask = (index, direction) => {
    const updatedTasks = [...tasks];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= updatedTasks.length) return;

    const [movedTask] = updatedTasks.splice(index, 1);
    updatedTasks.splice(targetIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className="task-table">
      <Link to={"/add"} type="button" className="btn btn-primary">
        Nova Tarefa
        <i className="fa-solid fa-plus icon-spacing"></i>
      </Link>

      <table className="table-custom ">
        <thead>
          <tr>
            <th scope="col">Nome da Tarefa</th>
            <th scope="col">Custo R$</th>
            <th scope="col">Data Limite</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id} className={task.cost >= 1000 && "yellow"}>
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
                      type="text"
                      name="cost"
                      value={editedTask.cost}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="pointer">
                    <input
                      type="date"
                      name="due_date"
                      value={formatDateForInput(editedTask.due_date)}
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
                  <td>
                    {task.cost.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
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

                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => moveTask(index, -1)}
                      disabled={index === 0}
                    >
                      <i className="fa-solid fa-arrow-up"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => moveTask(index, 1)}
                      disabled={index === tasks.length - 1}
                    >
                      <i className="fa-solid fa-arrow-down"></i>
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
