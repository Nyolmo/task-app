import { useState, useEffect, use } from "react";

function App(){

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({title:"", description:""});
  const [error, setError] = useState("");

  useEffect(()=>{
    fetchTasks();
  }, []);


  const fetchTasks = async() =>{
    try{
      const res = await fetch('http://localhost:5000/api/tasks');
      const data = await res.json();
      console.log(data);
      setTasks(data);
    }catch(err){
      console.log(err);
      setError("Failed to fetch tasks");
    }
  }


  return(
    <div className="p-6 bg-gray-300">
      <h1 className="text-3xl text-black text-center font-bold">Task App</h1>
      <div className="columns-3 py-6 mt-2 bg-black rounded-2xl text-white text-2xl font-bold px-6">
        <h1>Title</h1>
        <h1>Description</h1>
        <h1>Completed</h1>
      </div>
      {
        tasks.map((task)=>(
          <div key={task._id} className="px-6 text-white columns-3 py-6 mt-2 bg-black rounded-2xl" >
           
            <h1 className="font-bold"><span>{task.title}</span></h1>
            <p> {task.description}</p>
            <p> {task.completed? "Completed✅" : "Not Completed ❌" }</p>
          </div>
        ))
      }
    </div>
  )
}

export default App;