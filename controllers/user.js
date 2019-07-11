const User = require('../models/user');

// Renvoie la page de connexion
function getLoginView(req, res) {
  const username = req.session && req.session.user && req.session.user.username || ''
  res.render('login', { title: 'Se connecter', username: username });
}

// Renvoie la page d'enregistrement
function getRegisterView(req, res) {
  const username = req.session && req.session.user && req.session.user.username || ''
  res.render('register', { title: `S'enregister`, username: username });
}

// Connexion d'un utilisateur
function login(req, res) {
  User.findOne({
    $or: [
      { username: req.body.login },
      { email: req.body.login }
    ],
    password: req.body.password
  }, (err, user) => {
    if (err) {
      return res.status(500).send()
    }

    req.session.user = user;
    console.log(req.session.user);
    return !user ? res.status(401).send() : res.send();
  })
}

// Inscription d'un utilisateur
function register(req, res) {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      return res.json({ msg: 'An error occured' });
    }
    req.session.user = user;
    return res.redirect('/');
  })
}

function getAll(req, res) {
  res.send('respond with a resource');
}

function logout(req, res) {
  req.session.destroy();
  res.redirect('/');
}

exports.getLoginView = getLoginView;
exports.getRegisterView = getRegisterView;
exports.login = login;
exports.register = register;
exports.getAll = getAll;
exports.logout = logout;
