const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  teamName: String,
  teamChef: String,
  projectName: String,
  progress: Number,
  budget: Number,
  domain: String,
  problems: [String],
  projectDescription: String,
  materials: [String],
  members: [String]
});

module.exports = mongoose.model('Project', projectSchema);
