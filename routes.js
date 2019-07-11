const express = require('express');
const router = express.Router();
const user = require('./controllers/user');
const board = require('./controllers/board');
const auth = require('./utils/auth');
const task = require('./controllers/task');

// Middlewares
const needAuth = auth.checkLoggedUser;

// Vues
router.get('/', needAuth, board.getAllBoardsView); // Renvoie la vue contenant la liste des tableaux
router.get('/users/login', user.getLoginView);
router.get('/users/register', user.getRegisterView);
router.get('/board/:boardId', needAuth, board.getBoardView); // Renvoie

// Utilisateurs
router.get('/users/', user.getAll);
router.post('/users/login', user.login);
router.post('/users/register', user.register);
router.get('/users/logout', user.logout);

// Tableaux

router.get('/boards', needAuth, board.getAll); // Récupère tout les tableaux
router.post('/board', needAuth, board.insert); // Insère un tableau
router.delete('/board/:boardId', needAuth, board.remove); // Supprime un tableau

// Tasks
router.get('/tasks', task.getAll);
router.post('/task', needAuth, task.insert); // Insère une tâche
router.delete('/task/:boardId', needAuth, task.remove); // Supprime une tâche
router.put('/task/:taskId', task.completeTask); // Complète une tâche

// Si aucune route n'est trouvée
router.use((req, res) => {
  return req.session.user ? res.redirect('/') : res.redirect('/users/login');
});

module.exports = router;
