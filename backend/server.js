// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contact1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create a schema and model for the Contact form
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Define API route to handle form submission
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, username, email, message } = req.body;
  
  const newContact = new Contact({
    firstName,
    lastName,
    username,
    email,
    message,
  });

  newContact.save()
    .then(() => res.json({ msg: 'Message saved successfully!' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
