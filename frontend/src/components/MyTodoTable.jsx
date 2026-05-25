import React from 'react'

const MyTodoTable = () => {
  return (
     <table className='my-todo-table'>
          <thead>
            <tr>
              <th>Title of Task</th>
              <th>Status of Task</th>
              <th>Button</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Complete Backend API</td>
              <td>Pending</td>
              <td>
                <button>Mark Done</button>
              </td>
            </tr>

            <tr>
              <td>Design Frontend</td>
              <td>Completed</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
  )
}

export default MyTodoTable
