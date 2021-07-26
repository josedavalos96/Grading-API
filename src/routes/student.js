const studentsController = require('../controllers/student');
const express = require('express');
const router = express.Router();


// Handles incoming GET requests to /students
// Returns all students
router.get("/", studentsController.getAllStudents);



module.exports = router;