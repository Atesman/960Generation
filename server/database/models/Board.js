const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  configuration: {
    type: [String], // Array of Strings to store characters
    required: true,
  },
  comment: {
    type: String,
    default: "", // Default is empty string
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Board', BoardSchema);
