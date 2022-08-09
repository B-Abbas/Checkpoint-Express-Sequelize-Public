let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    let returnArray = Object.keys(tasks);
    return returnArray;
  },

  add: function (name, task) {
    // saves a task for a given person
    const formattedTask = 'complete' in task ? task : {...task, 'complete': false};
    if (tasks[name]) {
      tasks[name].push(formattedTask);
    } else {
      tasks[name] = [formattedTask];
    }
  },

  list: function (name) {
    // returns tasks for specified person
    return tasks[name];
  },

  complete: function (name, idx) {
    // marks a task complete
    tasks[name].forEach((task, i) => {
      if (i === idx || (task.complete === true)) {
        task.complete = true;
      }
    })
  },

  remove: function (name, idx) {
    // removes a tasks
    tasks[name].splice(idx, 1)
  },
};
