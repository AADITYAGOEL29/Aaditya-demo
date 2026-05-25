const express = require('express');

const app = express();
const PORT = 3000;
app.use(express.json());


let todos = [];

//GETting all data - GET


//ADD - Post


//DElETE - delete


//UPDATE STATUS - patch/put

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});