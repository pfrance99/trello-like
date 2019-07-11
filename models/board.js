const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const BoardSchema = new Schema({
  userId: ObjectId,
  // Ce champ n'est pas nécéssairement unique (traitement des tableaux par _id)
  name: {
    type: String,
    required: true
  },
});


module.exports = mongoose.model('Board', BoardSchema);
