const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.post('', async (req, res) => {
    const student = new Student(req.body);
    try {
        await student.save();
        res.status(201).send(student);
    } catch (err) {
        res.status(400).send(err);
    }
});
  
  // Retrieve all students
router.get('/', async (req, res) => {
  try {
      const students = await Student.find({});
      res.send(students);
  } catch (err) {
      res.status(500).send(err);
  }
});

// Retrieve a single student by ID
router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  try {
      const student = await Student.findById(_id);
      if (!student) {
          return res.status(404).send();
      }
      res.send(student);
  } catch (err) {
      res.status(500).send(err);
  }
});

// Update a student by ID
router.patch('/:id', async (req, res) => {
  try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!student) {
          return res.status(404).send();
      }
      res.send(student);
  } catch (err) {
      res.status(400).send(err);
  }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
          return res.status(404).send();
      }
      res.send(student);
  } catch (err) {
      res.status(500).send(err);
  }
});

module.exports = router;
