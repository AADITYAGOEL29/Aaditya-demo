const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


let todos = [
  {
    id: 1,
    title: "Learn Express",
    completed: false
  },
  {
    id: 2,
    title: "Learn React",
    completed: true
  },
  {
    id: 3,
    title: "Learn Spanish",
    completed: false
  }
];


// ==============================
// GET ALL TODOS
// ==============================
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});



// ==============================
// ADD TODO
// ==============================
app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const newTodo = {
    id: Date.now(),
    title,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json({
    message: "Todo created",
    todo: newTodo
  });
});


// ==============================
// UPDATE TODO
// ==============================
// PATCH -> partial update
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found"
    });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    todo.title = title;
  }

  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.status(200).json({
    message: "Todo updated",
    todo
  });
});


// ==============================
// DELETE TODO
// ==============================
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const todoExists = todos.some(t => t.id === id);

  if (!todoExists) {
    return res.status(404).json({
      message: "Todo not found"
    });
  }

  todos = todos.filter(t => t.id !== id);

  res.status(200).json({
    message: "Todo deleted"
  });
});



// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});