const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);

Task.clearCompleted = async () => {
  return await Task.destroy({
    where: { complete: true }
  });
}

Task.completeAll = async () => {
  return await Task.update(
    { complete: true },
    { where: { complete: false }
  });
}

Task.prototype.getTimeRemaining = function () {
  if (!this.due) {
    return Infinity
  } else {
    return this.due - Date.now()
  }
}

Task.prototype.isOverdue = function() {
  const timeLeft = this.getTimeRemaining()
  if (timeLeft < 0 && this.complete || timeLeft > 0) {
    return false
  }
  return true
}
// // console.log('>>>>', Object.keys(Owner.prototype))
// Task.prototype.assignOwner = async function (owner) {
//   console.log('>>>', await owner.setTasks(owner.id))
//   // return await owner.setTasks(owner.id)
// }

Owner.getOwnersAndTasks = async function() {
  const ownersAndTasks = await Owner.findAll({
    include: { model: Task }
  })
  return ownersAndTasks
}

Owner.prototype.getIncompleteTasks = async function() {
  const incompleteTasks = await Task.findAll({
    where : { complete: true }
  })
  return incompleteTasks
}

Owner.beforeDestroy((instance) => {
    if (instance.name === 'Grace Hopper') {
      throw new Error("Cannot delete that!");
    }
})



//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
