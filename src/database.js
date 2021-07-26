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
            worksheetId INTEGER,\
            name text,\
            createdAt TIMESTAMP DEFAULT TIMESTAMP,\
            updatedAt TIMESTAMP DEFAULT TIMESTAMP,\
            deletedAt TIMESTAMP DEFAULT TIMESTAMP\
             )',
             (err) => {                
                if(err){
                    /// table already created
                    console.log("Table already created");
                    console.error(err);
                }else{
                    console.log("Insert Data");
                    // Table created just now. Adding some random values
                    var insert = 'INSERT INTO student (worksheetId, name, createdAt ) VALUES (?,?,?)';

                    var today = Date();
                    db.run(insert, [1,'Jose', today ]);
                    db.run(insert, [2,'Daniel', today ]);
                    db.run(insert, [3,'Camila', today ]);
                }
             });

        //create Table Worksheet

        //create Table Question
    }
});

module.exports = db;