/** @format */

import express from "express";
import db from "./config/database.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import { Sequelize } from "sequelize";

import Account from "./models/modelAccount.js";
import Students from "./models/modelStudents.js";
import Report from "./models/modelReport.js";
import Teachers from "./models/modelTeachers.js";
import Grades from "./models/modelGrades.js";
import Subjects from "./models/modelSubjects.js";

import accountRoute from "./routes/accountRoute.js";
import gradeRoute from "./routes/gradeRoute.js";
import reportRoute from "./routes/reportRoute.js";
import studentsRoute from "./routes/studentsRoute.js";
import subjectRoute from "./routes/subjectRoute.js";
import teachersRoute from "./routes/teachersRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

app.use(accountRoute);
app.use(gradeRoute);
app.use(reportRoute);
app.use(studentsRoute);
app.use(subjectRoute);
app.use(teachersRoute);

try {
  await db.authenticate();
  console.log("Database Connected");
  Account.sync();
  Report.sync();
  Students.sync();
  Grades.sync();
  Teachers.sync();
  Subjects.sync();
  try {
    await { Sequelize }.sync({ force: true });
    console.log("Database synced.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
} catch (error) {
  console.log(error);
}

app.listen(5000, () => console.log("Server Up and Running..."));
