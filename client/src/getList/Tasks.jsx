import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './tasks.css'


const Tasks = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {

        const response = await axios.get("http://localhost:8000/api/tasks")  
        setTasks(response.data)
        console.log('tasks fetched', response.data.tasks)

      } catch (error) {
        console.log('Error while fetching tasks', error)
      }
      
    }

    fetchTasks()
  }, [])

  return (
    <div className='task-table'>  

    <button type='button' className='btn btn-primary'>Nova Tarefa</button>

      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Nome da Tarefa</th>
            <th scope='col'>Custo R$</th>
            <th scope='col'>Data Limite</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.sort((a,b) => a.display_order - b.display_order).map(task => (
            <tr key={task._id} style={{backgroundColor: task.cost >= 1000 ? 'yelloe' : 'transparent'}}>
              <td>{task.task_name} </td>
              <td>{task.cost.toFixed(2)} </td>
              <td>{new Date(task.due_date).toLocaleDateString()} </td>
              <td>
                <button>Editar</button>
                <button>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    
    </div>
  )
}

export default Tasks