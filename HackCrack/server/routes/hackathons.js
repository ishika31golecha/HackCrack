// server/routes/hackathons.js
const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');

router.get('/', hackathonController.getAllHackathons);
router.get('/top', hackathonController.getTopHackathons);
router.get('/category/:category', hackathonController.getHackathonsByCategory);

module.exports = router;