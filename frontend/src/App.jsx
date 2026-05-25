import React from 'react'
import './App.css'
import MyTodoTable from './components/MyTodoTable'

const App = () => {
  return (
    <div>
      <h1 className='my-main-heading'>My Todo list</h1>
      <section>
        <h2>All Tasks</h2>
        <MyTodoTable />

      </section>

      <section>
        <h2>Pending Tasks</h2>
        <MyTodoTable />
      </section>

      <section>
        <h2>Completed Tasks</h2>
        <MyTodoTable />
      </section>
    </div>
  )
}

export default App
