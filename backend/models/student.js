const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  category: String,
  score: String,
  scoreLevel: String,
  status: String,
  stars: Number,
  committee: String,
  codeApogee: String,
  sector: String,
  semestre: String,
  address: String,
  birthDay: String,
  techScore: String,
  softScore: String,
  committeScore: String,
  skills: [String],
  advantages: [String],
  disadvantages: [String]
});

module.exports = mongoose.model('Student', studentSchema);
