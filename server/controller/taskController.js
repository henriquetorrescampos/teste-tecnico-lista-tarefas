import Task from "../model/taskModel.js";

export const create = async (request, response) => {
  try {
    const id_display_order = await Task.findOne().sort({ display_order: -1 });
    const next_id_display_order = id_display_order // novo numero garantindo unique number
      ? id_display_order.display_order + 1
      : 1;

    const newTask = new Task({
      task_name: request.body.task_name,
      cost: request.body.cost,
      due_date: request.body.due_date,
      display_order: next_id_display_order,
    });

    const savedTask = await newTask.save();

    response.status(201).json(savedTask);
  } catch (error) {
    response.status(500).json({ errorMessage: error.message });
  }
};

export const getTasks = async (request, response) => {
  try {
    const tasksData = await Task.find().sort({ display_order: 1 });

    response.status(200).json(tasksData);
  } catch (error) {
    response.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const { task_name, cost, due_date } = request.body;

    const existingTask = await Task.findOne({ task_name });

    if (existingTask && existingTask._id.toString() !== id) {
      return response.status(400).json({ message: "Tarefa já existe" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task_name, cost, due_date },
      { new: true }
    );

    response.status(200).json(updatedTask);
  } catch (error) {
    response.status(500).json({ errorMessage: error.message });
  }
};

export const deleteTask = async (request, response) => {
  try {
    const id = request.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);

    response.status(200).json({ message: "Tarefa deletada" });
  } catch (error) {
    response.status(500).json({ errorMessage: error.message });
  }
};
