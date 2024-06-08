const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// List of valid work types
const validWorkTypes = ['chef', 'manager', 'waiter'];

// POST route to add a new Person
router.post('/', async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the mongoose model
    const newPerson = new Person(data);

    // Save the new Person document to the database
    const savedPerson = await newPerson.save();
    console.log('Person data saved');
    res.status(200).json(savedPerson); // Send the saved document in the response
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET method to retrieve all Persons
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Person data fetched');
    res.status(200).json(data);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET method to retrieve Persons by work type
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType.toLowerCase();  // Convert to lowercase for case-insensitive comparison

    if (validWorkTypes.includes(workType)) {
      const response = await Person.find({ work: workType });
      console.log('Person work type fetched');
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Invalid work type' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the url parameter
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // Return updated document
      runValidators: true, // Run Mongoose validation
    });

    if (!response) {
      return res.status(404).json({ message: 'Person not found' });
    }

    console.log('Person data updated');
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the url parameter
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ message: 'Person not found' });
    }

    console.log('Person data deleted');
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
