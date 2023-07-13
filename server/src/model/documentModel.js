const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Positions = new Schema({
  value: {
    type: String,
    enum: ["Clark", "DHoD", "HoD"],
    required: true
  }
});

const docsSchema = new Schema({
  url: {
    type: [{ doc: String, timestamp: Date }],
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now()
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Accepted', 'Rejected', 'In progress'],
    required: true,
    default: 'In progress'
  },
  past: {
    type: [Schema.Types.ObjectId],
    required: true,
    trim: true
  },
  current: {
    type: Schema.Types.ObjectId,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model("documents", docsSchema);