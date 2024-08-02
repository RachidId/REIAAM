const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Project = require('./models/project');

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
// Define your schema and model here

// Create a new project
app.post('/api/projects', async (req, res) => {
  const newProject = new Project(req.body);
  try {
    await newProject.save();
    res.status(201).send(newProject);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.send({ projectsTableData: projects });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedProject);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
