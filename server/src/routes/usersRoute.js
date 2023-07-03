const express = require('express');
const usersControllers = require('../controllers/usersControllers');

const router = express.Router();

router.post('/signup', usersControllers.register);

router.post('/login', usersControllers.authenticate);

module.exports = router;