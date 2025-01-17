const express = require('express');
const { registerStudent } = require('../controllers/regController');
const router = express.Router();

router.post('/register', registerStudent);

module.exports = router;