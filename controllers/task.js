const Task = require('../models/task');
const ObjectId = require('mongoose').Types.ObjectId;

function getAll(req, res) {
  Task.find({ userId: req.session.user._id, boardId: req.params.boardId }, (err, tasks) => {
    if (err) {
      return res.status(422).json({ msg: 'impossible de récupérer les tableaux' });
    }
    res.json({ result: tasks || [] });
  })
}

function insert(req, res) {
  const newTask = new Task({
    userId: req.session.user._id,
    boardId: req.body.boardId,
    title: req.body.title,
    content: req.body.content,
    completed: false
  });
  newTask.save(err => {
    if (err) {
      return res.status(422).json({ msg: 'impossible d\'ajouter une tache' });
    }
    res.json({ msg: `Tâche ${req.body.name} crée` });
  });
}

function remove(req, res) {
  Task.deleteOne({ _id: ObjectId(req.params.taskId), userId: req.session.user._id }, err => {
    if (err) {
      return res.status(422).json({ msg: 'impossible de supprimer la tâche ' });
    }
    res.json({ msg: 'Tâche supprimé' });
  });
}

function completeTask(req, res) {
  Task.update({ _id: ObjectId(req.params.taskId), userId: req.session.user._id }, { $set: { completed: true } }, err => {
    if (err) {
      return res.status(422).json({ msg: 'impossible de compléter la tâche ' });
    }
    res.json({ msg: 'Tâche compléter' });
  });
}

exports.getAll = getAll;
exports.insert = insert;
exports.remove = remove;
exports.completeTask = completeTask;
