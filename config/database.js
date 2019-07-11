const mongoose = require('mongoose');

function openConnection() {
  mongoose.connect('mongodb://localhost/trello', { useNewUrlParser: true });

}

function closeConnection() {
  //TODO close connection
}

exports.openConnection = openConnection;
exports.closeConnection = closeConnection;
