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

//* 1. get all input parameters from body
//* 2. try and parse numeric values, throw err if non-numeric
//* 3. get input type and input target
//* 4. transform input value into the desired target
//* 5. compare with studentResponse
//* 6. set grade and post to DB.
const postQuestion = (req, res) => {
    //1 
    //required to assign question to a worksheet
    const worksheetId = req.params.worksheetId;
    const temperatureIn = req.body.temperatureIn;
    const typeIn = req.body.typeIn;
    const typeTarget = req.body.typeTarget;
    const studentResponse = req.body.studentResponse;

    //check for empty values
    if(!temperatureIn || !typeIn || !typeTarget || !studentResponse){
        res.status(400).json({"error": "All 4 parameters are required"});
        return;
    }

    //2
    var temperature = parseFloat(temperatureIn)
    var stdResponse = parseFloat(studentResponse);

    if(isNaN(temperature) || isNaN(stdResponse)){
        res.status(400).json({"error": "Either Input Temperature or Students\' response isn\'t a numeric value"});
        return;
    }
    //3 
    

    res.status(200).json({"data": [temperature.toFixed(1), stdResponse.toFixed(1)]});
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


