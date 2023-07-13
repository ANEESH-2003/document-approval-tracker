const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  position: {
    type: String,
    enum: ["None", "Admin", "Clark", "DHoD", "HoD"],
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('users', usersSchema);