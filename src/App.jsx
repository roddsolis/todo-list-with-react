import { useEffect, useState } from 'react';
import { FiX } from "react-icons/fi";

const App = () => {

  const [task, setTask] = useState();
  const [write, setWrite] = useState('');


  



  useEffect(() => {

    fetch('https://playground.4geeks.com/apis/fake/todos/user/roddsolis',
    {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify([])
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);

    
    fetch('https://playground.4geeks.com/apis/fake/todos/user/roddsolis')
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log('La respuesta fue exitosa');
      } else {
        console.error(`Hubo un error ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {setTask(data);})
    .catch((error) => console.log(error));
    
  },[]);

  const addTask = () => {
    const newTask = { label: write, done: false };
    const updatedTasks = [...task, newTask];

    updateTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...task];
    updatedTasks.splice(index, 1);
    updateTasks(updatedTasks);
  };

  const updateTasks = (updatedTasks) => {

    fetch('https://playground.4geeks.com/apis/fake/todos/user/roddsolis', {
      method: 'PUT',
      body: JSON.stringify(updatedTasks.length === 0 ? [] : updatedTasks),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTask(updatedTasks);
        setWrite('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Lista de tareas</h1>
      <div className="todoListWrapper">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Escribe una tarea aquí y presiona Agregar"
            onChange={(e) => setWrite(e.target.value)}
            value={write}
          />
          <button onClick={() => addTask()} className='addButton'>Agregar</button>
        </form>
        <ul>
          {task?.map((item, index) => {
            return (
              <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                <p>{item.label}</p>
                <button onClick={() => deleteTask(index)} className='deleteButton'><FiX/></button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default App;
