const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


// POST method to add new MenuItem
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const savedMenuItem = await newMenu.save();
    console.log('MenuItem data saved');
    res.status(200).json(savedMenuItem); // Use savedMenuItem to send the saved document in response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET method to get the Menu Items
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('MenuItem data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET method to retrieve menu items by taste
router.get('/:taste', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // PUT method to update menu item

  router.put('/:id', async (req, res) => {
    try {
      const data = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return updated document
        runValidators: true, // Run Mongoose validation
      });
      console.log('data updated');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // Delete method

  router.delete('/:id', async (req, res) => {
    try {
      const data = await MenuItem.findByIdAndDelete(req.params.id);
      console.log('data deleted');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// coment added for testing purpose
module.exports = router;