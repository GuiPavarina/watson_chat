const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chat');

router.get('/chat', chatController.chat);

router.post('/chat', chatController.chat);

module.exports = router;