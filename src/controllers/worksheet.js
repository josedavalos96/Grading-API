
var db = require("../database.js");


const getAllWorksheets = async (req, res) => {
    try{

        var query = 'SELECT * FROM worksheet';
        var params = [];
        db.all(query, params, (err, rows) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
              }
              res.status(201).json({
                  "message":"success",
                  "data":rows
              });
        });

    }catch(error){
        res.status(400).json({error: error.message});
    }
};

const getWorksheetsByStudentId = async (req, res) => {

    try {

        const studentId = req.params.studentId;

        var query = 'SELECT * FROM worksheet WHERE studentId = ?';
        var params = [studentId];

        db.all(query, params, function(err, rows){
            if (err) {
                res.status(400).json({"error":err.message});
                return;
              }
              res.status(201).json({
                  "message":"success",
                  "data":rows
              });
        });        
    } catch (error) {
        res.status(400).json({error: error.message});
        
    }
}

const createWorksheetforStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const today = Date();

        var query = 'INSERT INTO worksheet (studentId, createdAt) VALUES (?, ?)';
        var params = [ studentId, today];

        db.run(query, params, function(err, result){
            if (err) {
                res.status(400).json({"error":err.message});
                return;
              }
              res.status(201).json({
                  "message":"success",
                  "id": this.lastID
              });
        });
    } catch (error) {
        res.status(400).json({error: error.message});        
    }
}

const editWorksheetByStudentId = async (req, res) => {

    try {
        const worksheetId = req.params.worksheetId;
        const studentId = req.body.studentId;
        const updatedAt = Date();

        if(!studentId){
            res.status(400).json({"error": "The studentId must be provided"});
            return;
        }

        var query = 'UPDATE worksheet set\
                    studentId = COALESCE(?, studentId),\
                    updatedAt = COALESCE(?, updatedAt)\
                    WHERE id = ?';
        var params = [studentId, updatedAt, worksheetId];

        db.run(query, params, function(err, result){
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }

            res.json({
                message: "success",
                changes: this.changes,
            });
        });
    } catch (error) {
        res.status(400).json({error: error.message});        
    }
}


const deleteWorksheet = async (req, res) => {
    try {
        const worksheetId = req.params.worksheetId;

        var query = 'DELETE FROM worksheet WHERE id = ?';
        var params = [worksheetId];


        db.run(query, params, function(err, result){
            if (err){
                res.status(400).json({"error": res.message});
                return;
            }
            res.json({
                "message":"deleted", 
                changes: this.changes,
            });

        });
    } catch (error) {
        res.status(400).json({error: error.message});           
    }
}

exports.getAllWorksheets = getAllWorksheets;
exports.getWorksheetsByStudentId = getWorksheetsByStudentId;
exports.createWorksheetforStudent = createWorksheetforStudent;
exports.editWorksheetByStudentId = editWorksheetByStudentId;
exports.deleteWorksheet = deleteWorksheet;