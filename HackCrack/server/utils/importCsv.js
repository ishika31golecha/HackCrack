const fs = require('fs');
const csv = require('csv-parser');
const Hackathon = require('../models/Hackathon');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hackcrack_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const results = [];

// Find the CSV file in the correct location
// If in server/utils directory, use a relative path to go up to the project root
fs.createReadStream('./hackathons_dataset.csv')
  .on('error', (err) => console.error('Error reading CSV file:', err))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    console.log(`Parsed ${results.length} records from CSV`);
    try {
      for (const item of results) {
        await Hackathon.create({
          name: item.name,
          organization_name: item.organization_name, 
          location: item.location,
          themes: item.themes,
          submission_start_date: item.submission_start_date && item.submission_start_date !== '########' ? new Date(item.submission_start_date) : null,
          submission_end_date: item.submission_end_date && item.submission_end_date !== '########' ? new Date(item.submission_end_date) : null,
          prize_currency: item.prize_currency,
          prize_amount: item.prize_amount ? Number(item.prize_amount) : null,
          registrations: item.registrations ? Number(item.registrations) : null,
          url: item.url,
          category: item.category
        });
        console.log(`Imported: ${item.name}`);
      }
      console.log('Data successfully imported');
      mongoose.connection.close();
    } catch (error) {
      console.error('Error importing data:', error);
      mongoose.connection.close();
    }
  });