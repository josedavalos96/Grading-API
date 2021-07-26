var sqlite3 = require('sqlite3').verbose();


const DBSOURCE = "src/db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        return console.error(err.message);
    }else{

        console.log('DB connected');
        // create Table student
        db.run('CREATE TABLE student (\
            id INTEGER PRIMARY KEY AUTOINCREMENT,\
            name text,\
            createdAt TIMESTAMP DEFAULT TIMESTAMP,\
            updatedAt TIMESTAMP DEFAULT TIMESTAMP,\
            deletedAt TIMESTAMP DEFAULT TIMESTAMP\
             )',
             (err) => {                
                if(err){
                    /// table already created
                }else{
                    console.log("Insert Data: student");
                    // Table created just now. Adding some random values
                    var insert = 'INSERT INTO student (name, createdAt ) VALUES (?,?)';

                    var today = Date();
                    db.run(insert, ['Jose', today ]);
                    db.run(insert, ['Daniel', today ]);
                    db.run(insert, ['Camila', today ]);
                }
             }
        );

        //create Table Worksheet
        db.run('CREATE TABLE worksheet (\
            id INTEGER PRIMARY KEY AUTOINCREMENT,\
            studentId INTEGET,\
            createdAt TIMESTAMP DEFAULT TIMESTAMP,\
            updatedAt TIMESTAMP DEFAULT TIMESTAMP,\
            deletedAt TIMESTAMP DEFAULT TIMESTAMP\
            )',
            (err) => {
                if(err){
                    /// table already created
                }else{
                    console.log("Insert Data: worksheet");
                    var insert = 'INSERT INTO worksheet (studentId, createdAt) VALUES (?,?)';
                    var today = Date();

                    db.run(insert, [1,today]);
                    db.run(insert, [2,today]);
                    db.run(insert, [3,today]);
                }
            }
        );
        //create Table Question
    }
});

module.exports = db;