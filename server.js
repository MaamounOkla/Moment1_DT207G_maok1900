/**
 * CV server
 * Av Maamoun Okla
 */
const express = require("express");
const bodyParser = require("body-parser"); //Läsa form-data
const sqlite3 = require("sqlite3").verbose();

//Ansluta till databasen
const db = new sqlite3.Database("./db/cv.db");

//Inställningar
const app = express();
const port = 3001;
app.set("view engine", "ejs"); //View engine: EJS
app.use(express.static("public")); //Statiska filer i katalog "public"
app.use(bodyParser.urlencoded({ extended: true }));

//Routing

app.get("/", (req, res) => {
  //Läs ut befintliga kurser från courses
  db.all("SELECT * FROM courses ORDER BY id DESC;", (err, rows) => {
    if (err) {
      console.error(err.message);
    }

    res.render("index", {
      error: "",
      rows: rows,
    });
  });
});
app.get("/addCourse", (req, res) => {
  res.render("addCourse", {
    error: "",
  });
});
app.post("/addCourse", (req, res) => {
  let courseName = req.body.courseName;
  let courseCode = req.body.courseCode;
  let progression = req.body.progression;
  let syllabus = req.body.syllabus;
  let error = "";
  if (courseName != "" && courseCode != "" && syllabus != "") {
    //korrekt - lagra i db

    const stmt = db.prepare(
      "INSERT INTO courses(courseName, courseCode, progression, syllabus)VALUES(?,?,?,?);"
    );
    stmt.run(courseName, courseCode, progression, syllabus);
    stmt.finalize();
  } else {
    error = "Du måste fylla i alla fält!";
  }

  res.render("addCourse", {
    error: error,
  });
});
//Radera kurs
app.get("/delete/:id", (req, res) => {
  let id = req.params.id;

  //Radera inlägg
  db.run("DELETE FROM courses WHERE id=?;", id, (err) => {
    if (err) {
      console.error(err.message);
    }
    //Redirekt till startsidan
    res.redirect("/");
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});

//Starta applikationen
app.listen(port, () => {
  console.log("Server started from port: " + port);
});
