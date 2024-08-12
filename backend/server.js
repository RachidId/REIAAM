const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Project = require('./models/project');
const Student = require('./models/student');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const connectDB = async () => {
    try {
      const conn = await mongoose.connect("mongodb://localhost:27017/REIAAM");
      // Your code here
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
connectDB()

/////////// project's api /////////////
app.post('/api/projects', async (req, res) => {
  const project = new Project(req.body);
  try {
      await project.save();
      res.status(201).send(project);
  } catch (err) {
      res.status(400).send(err);
  }
});

app.get('/api/projects', async (req, res) => {
  try {
      const projects = await Project.find({});
      res.send(projects);
  } catch (err) {
      res.status(500).send(err);
  }
});

app.get('/api/projects/:id', async (req, res) => {
  const _id = req.params.id;
  try {
      const project = await Project.findById(_id);
      if (!project) {
          return res.status(404).send();
      }
      res.send(project);
  } catch (err) {
      res.status(500).send(err);
  }
});

app.patch('/api/projects/:id', async (req, res) => {
  try {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!project) {
          return res.status(404).send();
      }
      res.send(project);
  } catch (err) {
      res.status(400).send(err);
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
          return res.status(404).send();
      }
      res.send(project);
  } catch (err) {
      res.status(500).send(err);
  }
});


////////////////// students's api ///////////////////

app.post('/api/students', async (req, res) => {
  const student = new Student(req.body);
  try {
      await student.save();
      res.status(201).send(student);
  } catch (err) {
      res.status(400).send(err);
  }
});

// Retrieve all students
app.get('/api/students', async (req, res) => {
  try {
      const students = await Student.find({});
      res.send(students);
  } catch (err) {
      res.status(500).send(err);
  }
});

// Retrieve a single student by ID
app.get('/api/students/:id', async (req, res) => {
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
app.patch('/api/students/:id', async (req, res) => {
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
app.delete('/api/students/:id', async (req, res) => {
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
