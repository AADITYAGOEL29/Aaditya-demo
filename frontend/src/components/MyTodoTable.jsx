import React from 'react'

const MyTodoTable = ({ todos, onDelete, onToggleStatus }) => {

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>

            <td>{todo.id}</td>

            <td>{todo.title}</td>

            <td>
              {todo.completed ? "Completed" : "Pending"}
            </td>

            <td>

              <button
                onClick={() => onToggleStatus(todo._id || todo.id)}
              >
                Toggle Status
              </button>

              <button
                onClick={() => onDelete(todo._id || todo.id)}
              >
                Delete
              </button>

            </td>

          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MyTodoTable