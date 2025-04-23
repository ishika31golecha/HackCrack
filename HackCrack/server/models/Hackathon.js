// server/models/Hackathon.js
const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization_name: { type: String, required: true },
  location: { type: String },
  themes: { type: String },
  submission_start_date: { type: Date },
  submission_end_date: { type: Date },
  prize_currency: { type: String },
  prize_amount: { type: Number },
  registrations: { type: Number },
  url: { type: String },
  category: { type: String }  // 'both', 'hardware', or 'software'
});

module.exports = mongoose.model('Hackathon', hackathonSchema);