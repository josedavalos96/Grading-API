var db = require("../database.js");
const converter = require("../utils/converter");

const decimalPlaces = 1;

const units = {
	KELVIN: "K",
	CELSIUS: "C",
	FAHRENHEIT: "F",
	RANKIE: "R",
}

const grades = {
    CORRECT: "correct",
    INCORRECT: "incorrect",
    INVALID: "invalid"
}


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

        var query = 'SELECT * FROM question WHERE worksheetId = ?'
        var params = [ worksheetId ];

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
        const studentResponse = req.body.studentResponse;
        const updatedAt = Date();

        if(!questionId || !worksheetId){
            res.status(400).json({"error": "worksheetId and questionId requried"});
            return;
        }

        var query = 'UPDATE question SET\
                    worksheetId = COALESCE(?,worksheetId),\
                    temperatureIn = COALESCE(?,temperatureIn),\
                    typeIn = COALESCE(?,typeIn),\
                    typeTarget = COALESCE(?,typeTarget),\
                    studentResponse = COALESCE(?,studentResponse),\
                    updatedAt = COALESCE(?,updatedAt)\
                    WHERE id = ?';
        var params = [
            worksheetId,
            temperatureIn,
            typeIn,
            typeTarget,
            studentResponse,
            updatedAt,
            questionId,
        ];

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
    const today = Date();

    //check for empty values
    if(!temperatureIn || !typeIn || !typeTarget || !studentResponse){
        res.status(400).json({"error": "All 4 parameters are required"});
        return;
    }

    //2
    var temperature = parseFloat(temperatureIn)
    var stdResponse = parseFloat(studentResponse).toFixed(decimalPlaces);

    if(isNaN(temperature) || isNaN(stdResponse)){

        var grade = grades.INVALID;
        

        var query = 'INSERT INTO question (\
            worksheetId,\
            temperatureIn,\
            typeIn,\
            typeTarget,\
            studentResponse,\
            grade,\
            createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
        var params = [
            worksheetId,
            temperatureIn,
            typeIn,
            typeTarget,
            studentResponse,
            grade,
            today
        ];

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

        return;
    }
    //3 

    var fromTemp = typeIn.charAt(0).toUpperCase();
    var toTemp =  typeTarget.charAt(0).toUpperCase();
    var answer;
    // 4
    if( fromTemp == units.KELVIN && toTemp == units.CELSIUS ){
        answer = converter.kelvinToCelsius(temperature).toFixed(decimalPlaces);

    }else if( fromTemp == units.KELVIN && toTemp == units.FAHRENHEIT ){
        answer = converter.kelvinToFahrenheit(temperature).toFixed(decimalPlaces);

    }else if( fromTemp == units.KELVIN && toTemp == units.RANKIE ){
        answer = converter.kelvinToRankie(temperature).toFixed(decimalPlaces);

    }else if(fromTemp == units.CELSIUS && toTemp == units.KELVIN){
        answer = converter.celsiusToKelvin(temperature).toFixed(decimalPlaces);

    }else if(fromTemp == units.CELSIUS && toTemp == units.FAHRENHEIT){
        answer = converter.celsiusToFahrenheit(temperature).toFixed(decimalPlaces);

    }else if(fromTemp == units.CELSIUS && toTemp == units.RANKIE){
        answer = converter.celsiusToRankie(temperature).toFixed(decimalPlaces);
        
    }else if(fromTemp == units.FAHRENHEIT && toTemp == units.CELSIUS){
        answer = converter.fahrenheitToCelsius(temperature).toFixed(decimalPlaces);

    }else if(fromTemp == units.FAHRENHEIT && toTemp == units.KELVIN){
        answer = converter.fahrenheitToKelvin(temperature).toFixed(decimalPlaces);

    }else if(fromTemp == units.FAHRENHEIT && toTemp == units.RANKIE){
        answer = converter.fahrenheitToRankie(temperature).toFixed(decimalPlaces);

    }else if(fromTemp == units.RANKIE && toTemp == units.KELVIN){
        answer = converter.rankieToKelvin(temperature).toFixed(decimalPlaces);

    }else if(fromTemp == units.RANKIE && toTemp == units.CELSIUS){
        answer = converter.rankieToCelsius(temperature).toFixed(decimalPlaces);

    }else if(fromTemp == units.RANKIE && toTemp == units.FAHRENHEIT){
        answer = converter.rankieToFahrenheit(temperature).toFixed(decimalPlaces);
    }else{
        // invalid unit of conversions
        answer = null;
    }
    //5
    var grade = grades.INVALID;

    if(answer == null){
        grade = grades.INVALID;
    }else if(answer == stdResponse){
        grade = grades.CORRECT;
    }else{
        grade = grades.INCORRECT;
    }

    // 6 
    var query = 'INSERT INTO question (\
        worksheetId,\
        temperatureIn,\
        typeIn,\
        typeTarget,\
        studentResponse,\
        grade,\
        createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)';

    var params = [
        worksheetId,
        temperatureIn,
        typeIn,
        typeTarget,
        studentResponse,
        grade,
        today
    ];
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


