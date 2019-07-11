const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const TaskSchema = new Schema({
  userId: ObjectId,
  boardId: String,
  boardName: String,
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  completed: Boolean
}, {
  timestamps: true
});


module.exports = mongoose.model('Task', TaskSchema);
