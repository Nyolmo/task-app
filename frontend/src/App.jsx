import { useState, useEffect } from "react";

function App(){

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({title:"", description:""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    fetchTasks();
  }, []);

  const handleChange = (e)=>{
    setNewTask({...newTask, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate
  if (!newTask.title.trim()) {
    setError("Title is required");
    return;
  }

  setError("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask), 
    });

    if (!res.ok) throw new Error("Failed to create task");

    const createdTask = await res.json(); 

    // Update UI immediately
    setTasks([createdTask, ...tasks]);
    setNewTask({ title: "", description: "" });
  } catch (err) {
    console.error(err);
    setError("Error creating task");
  } finally {
    setLoading(false);
  }
};
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

  const handleDelete = async(id)=> {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`,
        {
          method: "DELETE",
        }
      )

      if(!res.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((task)=>task._id !== id ));
    } catch (err) {
      console.log("Error deleting task:", err);
      setError("Error deleting task");
    }

  }

  const handleToggle = async(task)=>{
    try
      {const res = await fetch(`http://localhost:5000/${task._id}`,{
      
        method:"PATCH",
        
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
          completed:!task.completed
        }),
      });

    
    if(!res.ok) throw new Error("Failed to update task")

    const updatedTask = await res.json()

    setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t) )
  } catch(err){
    console.log(err);
    setError("Error Updating task")
  }
};




  return(
    <div className="p-6 bg-gray-300 ">
      <h1 className="text-3xl text-black text-center font-bold mb-4">Task App</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div >
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2" >
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleChange}  
            required 
            className="border p-2 rounded-2xl"       
          ></input>
          <input
            type="text"
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleChange}  
            required 
            className="border rounded-2xl p-2"          
          >
          </input>

          <button type="submit" onSubmit={handleSubmit} disabled={loading}
            className="border rounded bg-blue-400 text-white hover:bg-blue-600 disabled:bg-gray-500"
          
          >{loading? "Creating..." : "Add Task"}</button>
        </form>
      </div>
      <div className="columns-4 py-6 mt-2 bg-black rounded-2xl text-white text-2xl font-bold px-6">
        <h1>Title</h1>
        <h1>Description</h1>
        <h1>Completed</h1>
        <h1>Action</h1>
      </div>
      {tasks.length === 0 ? (
        <p>No task Found</p>
      ):(
      
        tasks.map((task)=>(
          <div key={task._id} className="px-6 text-white columns-4 py-6 mt-2 bg-black  border p-3 rounded mb-2 shadow-sm" >
           
            <h1 className="font-semibold"><span>{task.title}</span></h1>
            <p> {task.description}</p>
            <button onClick={()=>handleToggle(task)} className={task.completed ? "text-green-400" : "text-red-400"}>
              {task.completed ? "Completed ✅" : "Not Completed ❌"}
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
          
        ))
      
  )}

    </div>
  );
}



export default App;