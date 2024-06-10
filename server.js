const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
const PORT = process.env.PORT || 3000;


// Route to handle the root URL
app.get('/', (req, res) => {
  res.send('Welcome to our lovely hotel');
});


// Import the router files
const PersonRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


// Use the router files
app.use('/person', PersonRoutes);
app.use('/menu', menuItemRoutes);


// Start the server on port 3000
app.listen(PORT, () => {
  console.log('Server running on port 3000');
});
