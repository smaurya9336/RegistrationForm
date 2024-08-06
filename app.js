const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require("./models/User");
const dotenv= require("dotenv");
const app = express();

dotenv.config();
const port =process.env.PORT;

// Connect to MongoDB


mongoose.connect('mongodb://localhost:27017/mydatabase');


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route to show registration form
app.get('/register', (req, res) => {
  res.render('register');
});

// Route to handle registration form submission
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.send('Registration successful!');
  } catch (error) {
    res.status(500).send('Error registering user: ' + error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
