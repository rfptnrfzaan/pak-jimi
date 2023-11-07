/** @format */

import express from "express";
import db from "./config/database.js";
import cors from "cors";
import fileUpload from "express-fileupload";

import Subjects from "./models/modelSubjects.js";
import Students from "./models/modelStudents.js";
import Grades from "./models/modelGrades.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

try {
  await db.authenticate();
  console.log("Database Connected");
  Subjects.sync();
  Students.sync();
  Grades.sync();
} catch (error) {
  console.log(error);
}

app.listen(5000, () => console.log("Server Up and Running..."));
