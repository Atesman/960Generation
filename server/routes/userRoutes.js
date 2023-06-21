// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../utils/authenticateJWT');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/username', authenticateJWT, userController.getUsername);


module.exports = router;
