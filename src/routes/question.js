const questionController = require('../controllers/question');
const express = require('express');
const router = express.Router();



router.get("/", questionController.getAllQuestions);

router.get("/:worksheetId", questionController.getQuestionsByWorksheetId);

router.patch("/:questionId", questionController.editQuestion);

router.post("/:worksheetId", questionController.postQuestion);

router.delete("/:questionId", questionController.deleteQuestion);

module.exports = router;