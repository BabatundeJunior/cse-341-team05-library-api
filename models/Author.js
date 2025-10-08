const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+\..+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Author', authorSchema);
