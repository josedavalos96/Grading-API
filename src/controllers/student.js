var db = require("../database.js");




const getAllStudents = async (req, res) => {
    try{
        var query = 'SELECT * FROM student';
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

        db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
          });
          
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

exports.getAllStudents = getAllStudents;