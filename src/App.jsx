import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from "uuid";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

uuidv4(); // ⇨ 'ab16e731-6cee-424d-81a0-5929e9bdb0cc'

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring= localStorage.getItem("todos")
    if (todostring){

      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  

  const savetols= (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const togglefinished=(e)=>{
setshowfinished(!showfinished)
  }

  const handleedit = (e,id) => {
let t = todos.filter(i=>i.id === id)
settodo(t[0].todo)
 let newtodos = todos.filter(item => {
        return item.id !== id
      })

      settodos(newtodos)
      savetols()
  }

  const handledelete = (e, id) => {
    let c = confirm("Do you really want to delete this todo?")

    if (c) {
      let newtodos = todos.filter(item => {
        return item.id !== id
      })

      settodos(newtodos)
      savetols()
    }
  }

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    savetols()
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    savetols()
  }


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-start justify-center py-8 px-4">
        <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10">
          <h1 className='font-syne font-bold text-center text-3xl md:text-4xl mb-8 text-gray-800'>DoNest- Manage your tasks at one place</h1>
          
          <div className="addtodo mb-8">
            <h2 className='font-syne text-xl font-bold mb-4 text-gray-700'>Add a Task</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                onChange={handlechange} 
                value={todo} 
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-colors" 
                type="text" 
                placeholder="Enter your task..."
              />
              <button 
                onClick={handleadd} 
                disabled={todo.length<=3} 
                className='bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 disabled:cursor-not-allowed px-6 py-3 font-semibold text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg'
              >
                Save
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-2">
            <input 
              className='w-4 h-4 accent-violet-600 cursor-pointer' 
              onChange={togglefinished} 
              type="checkbox" 
              checked={showfinished}
              id="showFinished"
            />
            <label htmlFor="showFinished" className="text-gray-700 cursor-pointer select-none">Show Finished</label>
          </div>

          <h2 className="font-syne text-xl font-bold mb-4 text-gray-700">YOUR TASKS</h2>
          
          <div className="todos space-y-3">
            {todos.length===0 && <div className='text-center py-8 text-gray-500'>No Tasks to display</div> }
            {todos.map(item => {

              return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className='flex gap-4 flex-1 min-w-0 items-start'>
                  <input 
                    onChange={handlecheckbox} 
                    type="checkbox" 
                    name={item.id} 
                    checked={item.isCompleted} 
                    className="w-5 h-5 mt-0.5 accent-violet-600 cursor-pointer"
                  />
                  <div className={`break-words min-w-0 flex-1 text-gray-800 ${item.isCompleted ? "line-through text-gray-400" : ""}`}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-2 shrink-0">
                  <button 
                    onClick={(e) => { handleedit(e, item.id) }} 
                    className='bg-violet-600 hover:bg-violet-700 p-2.5 text-white rounded-lg transition-colors shadow-sm hover:shadow-md'
                  >
                    <MdEditSquare size={18} />
                  </button>
                  <button 
                    onClick={(e) => { handledelete(e, item.id) }} 
                    className='bg-violet-600 hover:bg-violet-700 p-2.5 text-white rounded-lg transition-colors shadow-sm hover:shadow-md'
                  >
                    <AiFillDelete size={18} />
                  </button>
                </div>
              </div>
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default App

