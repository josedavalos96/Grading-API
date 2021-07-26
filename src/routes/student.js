const studentsController = require('../controllers/student');
const express = require('express');
const router = express.Router();


// Handles incoming GET requests to /students
// Returns all students
router.get("/", studentsController.getAllStudents);

// Handles incoming GET requests to /students/:id
// Returns a single student information and worksheet ids
router.get("/:id", studentsController.getStudentById);

// Handles incoming POST requests to /students/
// Returns the id of the newly created student
router.post("/", studentsController.createStudent);

// Handles incoming PATCH requests to /students/:id
// Returns a message and the number of changes performed
router.patch("/:id", studentsController.editStudent);

// Handles incoming DELETE requests to /students/:id
// returns a message and the number of changes performed
router.delete("/:id", studentsController.deleteStundet);

module.exports = router;