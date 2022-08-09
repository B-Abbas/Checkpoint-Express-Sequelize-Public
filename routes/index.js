const express = require('express');
const app = require('../app');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.
router.get("/users", (req, res, next) => {
  try {
    let toSend = todos.listPeople()
    res.send(toSend)
  } catch(err) {
    console.log(err)
  }
})