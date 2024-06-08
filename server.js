const express = require('express');
const app = express();
const db = require('./db');


const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

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
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
