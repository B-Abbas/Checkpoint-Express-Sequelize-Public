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
    if (req.query.status) {
      if (req.query.status === 'complete') {
        const completed = todos.list(personName).filter(t => (t.complete))
        res.status(200).send(completed)
      } else if (req.query.status === 'active') {
        const active = todos.list(personName).filter(t => !(t.complete))
        res.status(200).send(active)
      }
    } else if (!todos.listPeople().includes(personName)) {
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
  try {
  const personName = req.params.name
  const task = req.body
  if (task.content) {
    // this next line causes the specs to time out -- tried a few other approaches too and not sure how to fix
    // if (!(personName in todos.listPeople())) res.status(404).send("Not Found")
    todos.add(personName, task)
    const newTask = todos.list(personName, task)[0]
    res.status(201).send(newTask)
  } else {
    res.status(400).send("No Content Found")
  }
 } catch(err) {
  // console.log('error: ', err)
 }
})

// router.use((err, req, res, next) => { // custom error handler attempt
//   console.error(err.stack)
//   res.status(404).send("Not Found")
// })

router.put("/:name/tasks/:index", (req, res, next) => {
  const userName = req.params.name
  const idx = req.params.index
  todos.complete(userName, idx)
  res.status(200).send(`Todos for ${userName} updated`)
})

router.delete("/:name/tasks/:index", (req, res, next) => {
  const name = req.params.name;
  const idx = req.params.index;
  todos.remove(name, idx)
  res.status(204).send('test')
})