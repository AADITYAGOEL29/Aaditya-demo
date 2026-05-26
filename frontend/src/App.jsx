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
    fetch('http://localhost:3000/todos')
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
      return
    }

    try {

      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTask
        })
      })

      const data = await response.json()

      // Update UI instantly
      setTodos((prevTodos) => [
        ...prevTodos,
        data.todo
      ])

      // Clear input
      setNewTask("")

    } catch (error) {
      console.error("Failed to add task:", error)
    }
  }



    // Delete Todo
  const handleDelete = async (id) => {

    try {

      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE'
      })

      // Remove from UI instantly
      setTodos((prevTodos) =>
        prevTodos.filter(todo => todo.id !== id)
      )

    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

    // TOGGLE STATUS
  const handleToggleStatus = async (todo) => {

    try {

      const updatedTodo = {
        completed: !todo.completed
      }

      await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      })

      // Update UI instantly
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id
            ? { ...t, completed: !t.completed }
            : t
        )
      )

    } catch (error) {
      console.error("Status update failed:", error)
    }
  }



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
