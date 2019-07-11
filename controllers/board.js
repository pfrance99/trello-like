const Board = require('../models/board');
const ObjectId = require('mongoose').Types.ObjectId;

function getAll(req, res) {
  Board.find({ userId: req.session.user._id }, (err, boards) => {
    if (err) {
      return res.status(422).json({ msg: 'impossible de récupérer les tableaux' });
    }
    res.json({ result: boards || [] });
  })
}

function insert(req, res) {
  const newBoard = new Board({
    userId: req.session.user._id,
    name: req.body.name
  });
  newBoard.save(err => {
    if (err) {
      return res.status(422).json({ msg: 'impossible d\'ajouter un tableau ' });
    }
    res.json({ msg: `Tableau ${req.body.name} crée` });
  });
}

function remove(req, res) {
  Board.deleteOne({ _id: ObjectId(req.params.boardId), userId: req.session.user._id }, err => {
    if (err) {
      return res.status(422).json({ msg: 'impossible de supprimer le tableau ' });
    }
    res.json({ msg: 'Tableau supprimé' });
  });
}

function getAllBoardsView(req, res) {
  let username = req.session && req.session.user && req.session.user.username || ''
  return res.render('boards', { title: 'Trello', username: username });
}

function getBoardView(req, res) {
  let username = req.session && req.session.user && req.session.user.username || ''
  return res.render('board', { title: 'Trello', username: username });
}

exports.getAll = getAll;
exports.insert = insert;
exports.remove = remove;
exports.getAllBoardsView = getAllBoardsView;
exports.getBoardView = getBoardView;
