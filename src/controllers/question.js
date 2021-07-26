var db = require("../database.js");


const getAllQuestions = (req, res) => {

    try {
        var query = 'SELECT * FROM question';
        var params = [];

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


const getQuestionsByWorksheetId = (req, res) => {
    try {
        const worksheetId = req.params.worksheetId;

        var query = 'SELECt * FROM question WHERE id = ?'
        var params = [worksheetId];

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

const editQuestion = (req, res) => {

    try {
        const questionId = req.params.questionId;
        const worksheetId = req.body.worksheetId;
        const temperatureIn = req.body.temperatureIn;
        const typeIn = req.body.typeIn;
        const typeTarget = req.body.typeTarget;
        const updatedAt = Date();

        res.status(200).json({"data": "yess"});


        //TODO: recalculate values and set new one in table.
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const postQuestion = (req, res) => {
    //TODO: implement post question
}

const deleteQuestion = (req, res) => {
    try {
        const questionId = req.params.questionId;

        var query = 'DELETE FROM question WHERE id = ?';
        var params = [questionId];

        db.run(query, params, function(err, result){
            if (err) {
                res.status(400).json({"error":err.message});
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

exports.getAllQuestions = getAllQuestions;
exports.getQuestionsByWorksheetId = getQuestionsByWorksheetId;
exports.editQuestion = editQuestion;
exports.postQuestion = postQuestion;
exports.deleteQuestion = deleteQuestion;


