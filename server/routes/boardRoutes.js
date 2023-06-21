// boardRoutes.js
const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const authenticateJWT = require('../utils/authenticateJWT');

router.get('/random', boardController.getRandomBoard);
router.post('/save', authenticateJWT, boardController.saveBoard);
router.get('/load', authenticateJWT, boardController.loadBoards);
router.post('/addComment', authenticateJWT, boardController.addComment);
router.delete('/delete/:id', authenticateJWT, boardController.deleteBoard);


module.exports = router;






