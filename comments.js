// Create web server
// Run web server
// Listen for requests
// Respond with appropriate content
// Respond with appropriate status code

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const comments = require("./data/comments");

app.use(bodyParser.json());

app.get("/comments", (req, res) => {
  res.json(comments);
});

app.get("/comments/:id", (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({
      error: `Comment with id ${id} not found`
    });
  }
});

app.post("/comments", (req, res) => {
  const { body } = req;
  if (body.text) {
    const newComment = {
      id: comments.length + 1,
      text: body.text
    };
    comments.push(newComment);
    res.json(newComment);
  } else {
    res.status(400).json({
      error: "Please provide comment text"
    });
  }
});

app.put("/comments/:id", (req, res) => {
  const id = Number(req.params.id);
  const { body } = req;
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    if (body.text) {
      comment.text = body.text;
      res.json(comment);
    } else {
      res.status(400).json({
        error: "Please provide comment text"
      });
    }
  } else {
    res.status(404).json({
      error: `Comment with id ${id} not found`
    });
  }
});

app.delete("/comments/:id", (req, res) => {
  const id = Number(req.params.id);
  const commentIndex = comments.findIndex(comment => comment.id === id);
  if (commentIndex !== -1) {
    const deletedComment = comments.splice(commentIndex, 1);
    res.json(deletedComment[0]);
  } else {
    res.status(404).json({
      error: `Comment with id ${id} not found`
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));