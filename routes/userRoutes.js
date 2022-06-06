const express = require('express');
const { addUser, login } = require('../controllers/userController');
const router = express.Router();

router.put('/', addUser);
router.post('/login', login);

module.exports = router;
