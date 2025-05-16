const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  });

// Import Hackathon model
const Hackathon = require('./models/Hackathon');

// Array to store the hackathons
const hackathons = [];

// Read the CSV file
fs.createReadStream('./utils/hackathons_dataset.csv')
  .pipe(csv())
  .on('data', (data) => {
    // Transform CSV data to match your schema
    const hackathon = {
      name: data.name || 'Unnamed Hackathon',
      organization_name: data.organization_name || 'Unknown Organization',
      location: data.location || 'Online',
      themes: data.themes || '',
      submission_start_date: data.submission_start_date ? new Date(data.submission_start_date) : null,
      submission_end_date: data.submission_end_date ? new Date(data.submission_end_date) : null,
      prize_currency: data.prize_currency || 'USD',
      prize_amount: parseFloat(data.prize_amount) || 0,
      registrations: parseInt(data.registrations) || 0,
      url: data.url || '#',
      category: data.category || 'both'
    };
    
    hackathons.push(hackathon);
  })
  .on('end', async () => {
    try {
      // Clear existing data (optional)
      await Hackathon.deleteMany({});
      console.log('Cleared existing hackathons');
      
      // Insert all hackathons
      if (hackathons.length > 0) {
        await Hackathon.insertMany(hackathons);
        console.log(`Successfully imported ${hackathons.length} hackathons`);
      } else {
        console.log('No hackathons found in CSV file');
      }
      
      // Disconnect from MongoDB
      mongoose.disconnect();
    } catch (error) {
      console.error('Error importing hackathons:', error);
      mongoose.disconnect();
    }
  });