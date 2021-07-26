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
                    console.log("Insert Data");
                    // Table created just now. Adding some random values
                    var insert = 'INSERT INTO student (name, createdAt ) VALUES (?,?)';

                    var today = Date();
                    db.run(insert, ['Jose', today ]);
                    db.run(insert, ['Daniel', today ]);
                    db.run(insert, ['Camila', today ]);
                }
             });

        //create Table Worksheet

        //create Table Question
    }
});

module.exports = db;