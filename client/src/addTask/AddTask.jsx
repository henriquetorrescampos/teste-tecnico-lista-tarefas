import React, { useState } from "react";
import "./addTask.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";

const AddTask = () => {
  const [task, setTask] = useState({
    task_name: "",
    cost: "",
    due_date: "",
  });

  const navigate = useNavigate();

  const inputHandle = (event) => {
    const { name, value } = event.target; //name represents input name; value represents input value
    console.log(name, value);

    if (name === "due_data") {
      const formattedDate = moment(value).format("YYYY-dcz");
      setTask({ ...task, [name]: formattedDate });
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    console.log("Dados enviados:", task);

    try {
      const response = await axios.post(
        `https://teste-tecnico-lista-tarefas-back.vercel.app/api/newTask`,
        task
      );
      toast.success(response.data.message, { position: "top-right" });

      navigate("/");
    } catch (error) {
      console.log("Error submit form", error);
    }
  };

  return (
    <div className="add-task">
      <form className="add-task-form" onSubmit={submitForm}>
        <Link to={"/"} type="button" className="btn btn-secondary">
          <i class="fa-solid fa-backward icon-spacing"></i>
          Voltar
        </Link>

        <h3>Adicionar nova Tarefa</h3>
        <div className="input-group">
          <label htmlFor="name-task">Nome da tarefa:</label>
          <input
            type="text"
            id="task_name"
            onChange={inputHandle}
            name="task_name"
            autoComplete="off"
            placeholder="Digite a sua tarefa"
          />
        </div>

        <div className="input-group">
          <label htmlFor="task-cost">Custo da tarefa:</label>
          <input
            type="number"
            step="0.01"
            id="cost"
            onChange={inputHandle}
            name="cost"
            autoComplete="off"
            placeholder="Digite o custo da tarefa"
          />
        </div>

        <div className="input-group">
          <label htmlFor="data-limite">Data limite da tarefa:</label>
          <input
            type="date"
            id="due_date"
            onChange={inputHandle}
            name="due_date"
            autoComplete="off"
            placeholder="Digite a data limite da tarefa"
          />
        </div>

        <div className="input-group">
          <button type="submit" className="btn btn-primary">
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
