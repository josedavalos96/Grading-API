const woksheetController = require('../controllers/worksheet');
const express = require('express');
const router = express.Router();

// Handles incoming GET requests to /worksheet
// Returns all students
router.get("/", woksheetController.getAllWorksheets);

// Handles incoming GET requests to /worksheet/:studentId
// Returns all worksheets from a single student
router.get("/:studentId", woksheetController.getWorksheetsByStudentId);

// Handles incoming POST requests to /worksheet/:studentId
// Returns the id of the newly created worksheet for a specific student
router.post("/:studentId", woksheetController.createWorksheetforStudent);

// Handles incoming PATCH  requests to /worksheet/:worksheetId
// Returns a message of succes and the amount of changes made
router.patch("/:worksheetId", woksheetController.editWorksheetByStudentId);

// Handles incoming DELETE  requests to /worksheet/:worksheetId
// Returns a message of succes and the amount of changes made
router.delete("/:worksheetId", woksheetController.deleteWorksheet);

module.exports = router;