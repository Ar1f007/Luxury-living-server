const express = require('express');
const { addUser } = require('../controllers/userController');
const router = express.Router();

router.put('/', addUser);

module.exports = router;
