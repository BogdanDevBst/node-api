const express = require("express");
const db = require("./db/todos");
const bodyParser = require("body-parser");

//set up the express app
const app = express();

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get("/api/v1/todos", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "todos retrieved successfully",
    todos: db,
  });
});

// get single todo
app.get("/api/v1/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const todo = db.find((todo) => todo.id === id);

  if (todo) {
    return res.status.status(200).send({
      success: "true",
      message: "todo retrieved successfully",
      todo: todo,
    });
  }
  return res.status(404).send({
    success: "false",
    message: "todo not found",
  });
});

// post the data
app.post("/api/v1/todos", (req, res) => {
  if (req.body.title) {
    return res.status(400).send({
      success: false,
      message: "Title is required",
    });
  } else if (!req.body.descriuption) {
    return req.status(400).send({
      success: false,
      message: "Description is required",
    });
  }

  const todo = {
    id: db.length + 1,
    title: req.body.title,
    description: req.body.description,
  };

  db.push(todo);

  return res.status(201).send({
    success: "true",
    message: "todo added successfully",
    todo: todo,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
