var db = require("../database.js");

// get all students listed in the Db
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

    }catch(error){
        res.status(400).json({error: error.message});
    }
}
// get student by single Id
const getStudentById = async (req, res) => {
    try {

        var query = 'SELECT * FROM student WHERE id = ?';
        var params = [req.params.id];
        
        db.get(query, params, (err, row)=> {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "message":"success",
                "data":row
            })
        });
    
    } catch (error) {
        res.status(400).json({error: error.message});   
    }
}

// create a stundet record
const createStudent = async (req, res) => {
    try {

        const name = req.body.name;
        const createdAt = Date();

        if(!name){
            res.status(400).json({"error": "A name for the student must be provided"});
            return;
        }

        var query = 'INSERT INTO student (name, createdAt ) VALUES (?,?)';
        var params = [name, createdAt];

        db.run(query, params, function(err, result){
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "id" : this.lastID
            })
        });  
    } catch (error) {
        res.status(400).json({error: error.message});      
    }
};

// edit a student name record
const editStudent = async (req, res) => {
    try {

        const id = req.params.id;
        const name = req.body.name;
        const updatedAt = Date();
        
        if(!name){
            res.status(400).json({"error": "A name for the student must be provided"});
            return;
        }
        
        var query = 'UPDATE student set \
        name = COALESCE(?,name),\
        updatedAt = COALESCE(?, updatedAt)\
        WHERE id = ?';
        var params = [name, updatedAt, id];

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
};


const deleteStudent = async (req, res) => {
    try {

        const id = req.params.id;

        const query= 'DELETE FROM student WHERE id = ?';
        const params = [id];

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
};
// function closeDb(){
//     db.close((err) => {
//         if (err) {
//           return console.error(err.message);
//         }
//         console.log('Close the database connection.');
//       });
// }

exports.getAllStudents = getAllStudents;
exports.getStudentById = getStudentById;
exports.createStudent = createStudent;
exports.editStudent = editStudent;
exports.deleteStudent = deleteStudent;