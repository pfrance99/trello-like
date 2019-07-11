// Middleware pour tester si l'utilisateur est connecté
function checkLoggedUser(req, res, next) {
  return req.session.user ? next() : res.redirect('/users/login');
}

exports.checkLoggedUser = checkLoggedUser;
