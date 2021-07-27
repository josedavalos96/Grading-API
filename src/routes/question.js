const questionController = require('../controllers/question');
const express = require('express');
const router = express.Router();

// Handles incoming GET requests to /question
// Returns all questions
router.get("/", questionController.getAllQuestions);

// Handles incoming GET requests to /question/:worksheetId
// Returns all questions from a single worksheet
router.get("/:worksheetId", questionController.getQuestionsByWorksheetId);

// Handles incoming PATCH requests to /question/:questionId
// Returns a success message and the amount of changes performed
router.patch("/:questionId", questionController.editQuestion);

// Handles incoming POST requests to /question/:worksheet
// Returns the id of the last item added
router.post("/:worksheetId", questionController.postQuestion);

// Handles incoming DELETE requests to /question/:questionId
// Returns a success message and the amount of changes performed
router.delete("/:questionId", questionController.deleteQuestion);

module.exports = router;