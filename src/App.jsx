import { useEffect, useState} from 'react'


const App = () => {


  const [task, setTask] = useState([])
  const [ write, setWrite ] = useState('') 


 
    useEffect(()=>{

      fetch('https://playground.4geeks.com/apis/fake/todos/user/roddsolis')
      .then(response => {

        if(response.status >= 200 && response.status < 300){
          console.log('la respuesta fue exitosa')
        }else{
          console.error(`hubo un error ${response.status}`)
        }

        return response.json()

      })
      .then(data =>{ 

        return setTask(data) 

      })
      .catch(error => console.log(error))

      

    },[])

 
    
    
    const addTask = () => {
      
      let newTask =  [
        { label: write, done: false },
        
      ]

      fetch('https://playground.4geeks.com/apis/fake/todos/user/roddsolis',{
        method: 'PUT',
        body: JSON.stringify(newTask),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {

        if(response.status >= 200 && response.status < 300){
          console.log('la respuesta fue exitosa')}
          else{console.log(`hubo un error ${response.status}`)}
        
        return response.json()
      })
      .then(data => console.log(data))
      .catch(error => console.log(error))

    }

    

    
  return (
    <div>

        <h1>Lista de tareas</h1>
        <div className="todoListWrapper">

            <form onSubmit={e => e.preventDefault() } >

            <input type="text" placeholder='Escribe una tarea aqui y presiona ENTER para crear' onChange={e=>setWrite(e.target.value)} value={write}/>
            <button onClick={() => addTask() }>add</button>
            
            </form>
            <ul>
                { task.length > 0 ? task.map((item, index)=>{
                   
                  
                  return <li key={index}style={{display:'flex', alignItems:'center',  gap:'1em'}}> <p>{item.label}</p> <button>X</button></li>

                }) : 'lista vacia'
               
                }
            </ul>
        </div>
        

    </div>
  )
}

export default App


/*    useEffect(()=>{

            fetch('https://playground.4geeks.com/apis/fake/todos/user/rodrigosolis', {

            method: "PUT",
            body: JSON.stringify(task),
            headers: {
              "Content-Type": "application/json"
            },
            mode: 'no-cors'
              
            
           })
            .then((response) => {
                console.log(response)
                response.json()
            })
            .then((data)=>{
                setTask(data)
            })
            .catch((error)=>{
                 error 
                })


    },[task]) */
