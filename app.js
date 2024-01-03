const express = require('express');
const app = express();

//Node JS system module

const fs = require('fs');
const { parse } = require('path');

//Load website

app.use(express.static('client'));
app.use(express.json());

app.get('/doctor/:id', (req, res) => {
    const doctorId = req.params.id;
  
    // Read the JSON file
    fs.readFile('doctorFacts.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      try {
        const doctorFacts = JSON.parse(data);
        const selectedDoctorFacts = doctorFacts[doctorId];
  
        if (selectedDoctorFacts) {
          res.send(selectedDoctorFacts); // Send JSON response
        } else {
          res.status(404).send('Doctor not found');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
  });

module.exports = app;

