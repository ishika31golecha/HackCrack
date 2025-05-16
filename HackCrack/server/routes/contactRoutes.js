// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST api/contact
// @desc    Submit a contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email and message' });
    }
    
    // Create new contact submission
    const newContact = new Contact({
      name,
      email,
      message
    });
    
    // Save to database
    const savedContact = await newContact.save();
    
    res.status(201).json({ 
      success: true,
      data: savedContact 
    });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while processing your contact submission' 
    });
  }
});

// @route   GET api/contact
// @desc    Get all contact submissions (admin only)
// @access  Private/Admin (you can add authentication middleware later)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;