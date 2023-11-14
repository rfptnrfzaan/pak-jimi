/** @format */

import db from "../config/database.js";
import { Sequelize } from "sequelize";
import Subjects from "./modelSubjects.js";
import Students from "./modelStudents.js";

const { DataTypes } = Sequelize;

const Grades = db.define(
  "grades",
  {
    grade: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Grades;
