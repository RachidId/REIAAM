const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
      await project.save();
      res.status(201).send(project);
  } catch (err) {
      res.status(400).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
      const projects = await Project.find({});
      res.send(projects);
  } catch (err) {
      res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
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

router.patch('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;
