const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectsRoutes = require('./routes/projects');
const studentsRoutes = require('./routes/students');


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

app.use('/api/projects', projectsRoutes);
app.use('/api/students', studentsRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
