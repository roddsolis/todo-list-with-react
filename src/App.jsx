import { useEffect, useState } from 'react';

const App = () => {
  const [task, setTask] = useState([]);
  const [write, setWrite] = useState('');

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/roddsolis')
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log('La respuesta fue exitosa');
        } else {
          console.error(`Hubo un error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTask(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const addTask = () => {
    // Crea una nueva tarea con la etiqueta proporcionada
    const newTask = { label: write, done: false };

    // Fusiona la nueva tarea con las tareas existentes
    const updatedTasks = [...task, newTask];

    fetch('https://playground.4geeks.com/apis/fake/todos/user/roddsolis', {
      method: 'PUT',
      body: JSON.stringify(updatedTasks),
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
    <div>
      <h1>Lista de tareas</h1>
      <div className="todoListWrapper">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Escribe una tarea aquí y presiona ENTER para crear"
            onChange={(e) => setWrite(e.target.value)}
            value={write}
            style={{ width: '20%' }}
          />
          <button onClick={() => addTask()}>add</button>
        </form>
        <ul>
          {task?.map((item, index) => {
            return (
              <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                <p>{item.label}</p>
                <button>x</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
