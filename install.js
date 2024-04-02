/**
 * Databas install 
 * Av Maamoun Okla
 */
const sqlite3 = require(sqlite3).verbos();

const db = new sqlite3.database("./db/cv.db");
