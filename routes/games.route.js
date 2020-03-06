const express = require('express');
const router = express.Router();

const games_controller = require('../controllers/games.controller');

// test URL 
router.get('/test', games_controller.test);
module.exports = router;

// search URL
router.post('/search', games_controller.search);
module.exports = router;