const questionController = require('../controllers/question');
const express = require('express');
const router = express.Router();



router.get("/", questionController.getAllQuestions);



module.exports = router;