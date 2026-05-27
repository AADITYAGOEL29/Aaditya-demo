const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://aadityagoel:aadityagoel29@cluster0.umc71jx.mongodb.net/todoDB?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());



const TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

// ==============================
// GET ALL TODOS
// ==============================
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});



// ==============================
// ADD TODO
// ==============================
app.post('/todos', async (req, res) => {
  const { title } = req.body;

  const newTodo = new Todo({
    title,
    completed: false
  });

  await newTodo.save();

  res.status(201).json(newTodo);
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
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);

  res.json({
    message: "Todo deleted"
  });
});



// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});