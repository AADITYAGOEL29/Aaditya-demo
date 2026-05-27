import React from 'react'
import './App.css'
import MyTodoTable from './components/MyTodoTable'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {


  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState("")


  // Fetch data from backend
  useEffect(() => {
    fetch('https://aaditya-demo.onrender.com/todos')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data)
      })
      .catch((error) => {
        console.error("Error fetching todos:", error)
      })
  }, [])

    // ADD TODO
    const handleAddTask = async () => {
      if (!newTask.trim()) {
        return;
      }
    
      try {
        const response = await fetch('https://aaditya-demo.onrender.com/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTask,
          }),
        });
    
        const data = await response.json();
    
        setTodos([...todos, data]);
    
        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };


    // Delete Todo
  const handleDelete = async (id) => {

    try {

      await fetch(`https://aaditya-demo.onrender.com/todos/${id}`, {
        method: 'DELETE'
      })

      // Remove from UI instantly
      setTodos((prevTodos) =>
        prevTodos.filter(
          (todo) => todo._id !== id && todo.id !== id
        )
      
      )

    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

    // TOGGLE STATUS
    const handleToggleStatus = async (id) => {
      const updatedTodos = todos.map((todo) => {
        if (todo._id === id || todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    
      setTodos(updatedTodos);
    };



  // Filter data
  const pendingTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)


  return (
    <div>
      <h1 className='my-main-heading'>My Todo list</h1>
      

      <h2>
        Enter new Task name:

        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button onClick={handleAddTask}>
          Add Task
        </button>
      </h2>


      <section>
        <h2>All Tasks</h2>
        <MyTodoTable todos={todos} onDelete={handleDelete} onToggleStatus={handleToggleStatus}/>

      </section>

      <section>
        <h2>Pending Tasks</h2>
        <MyTodoTable todos={pendingTodos} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
      </section>

      <section>
        <h2>Completed Tasks</h2>
        <MyTodoTable todos={completedTodos} onDelete={handleDelete} onToggleStatus={handleToggleStatus}/>
      </section>
    </div>
  )
}

export default App
