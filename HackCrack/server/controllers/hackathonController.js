// server/controllers/hackathonController.js
const Hackathon = require('../models/Hackathon');

// Get all hackathons
exports.getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get hackathons by category
exports.getHackathonsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    let query = {};
    if (category !== 'all') {
      query = { category };
    }
    
    const hackathons = await Hackathon.find(query);
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top hackathons (by registration count)
exports.getTopHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
                                      .sort({ registrations: -1 })
                                      .limit(6);
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};