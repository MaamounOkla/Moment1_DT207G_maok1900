/**
 * Databas install 
 * Av Maamoun Okla
 */
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/cv.db");


//Skapa tabell för kurser 
//( id | coursecode | coursename | syllabus | progression | posted)

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS courses;");
    db.run(`
    CREATE TABLE courses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coursecode INTEGER NOT NULL,
        coursename TEXT NOT NULL,
        syllabus TEXT NOT NULL,
        progression TEXT NOT NULL,
        posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );    
    `);
})

db.close();