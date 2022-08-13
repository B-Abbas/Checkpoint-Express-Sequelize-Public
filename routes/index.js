const express = require('express');
const app = require('../app');
const { listPeople } = require('../models/express-models/todos');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

router.use(express.urlencoded({extended: false}))
router.use(express.json())

// write your routes here. Feel free to split into multiple files if you like.
router.get("/", (req, res, next) => {
  try {
    let toSend = todos.listPeople()
    res.send(toSend)
  } catch(err) {
    next(err)
  }
})

router.get("/:name/tasks", (req, res, next) => {
  const personName = req.params.name;
  try {
    if (!todos.listPeople().includes(personName)) {
      res.status(404)
    } else {
      let toSend = todos.list(personName);
      res.send(toSend)
    }
  } catch(err) {
    next(err)
  }
})

router.post("/:name/tasks", (req, res, next) => {
  const personName = req.params.name
  try {
    if (req.body.content) {
      todos.add(personName, req.body)
      res.status(201).send(todos.list(personName)[0])
    } else {
      res.status(400).send("Bad Request")
    }
  } catch (err) {
    next (err)
  }
})

router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(404).send("Not Found")
})

// router.put(":name/tasks/:index", (req, res, next) => {
//   console.log("PUT FUNCTION****")

//   const idx = req.params.index
//   const name = req.params.name
//   console.log("TESTING", idx, name)
//   res.status(500).send("AJDKASJDA")
// })

// router.delete("users/:name/tasks/:index", (req, res, next) => {
//   const name = req.params.name;
//   const idx = req.params.index;
//   res.status(200).send(todos.remove(name, idx))
// })