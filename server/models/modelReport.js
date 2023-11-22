/** @format */

import db from "../config/database.js";
import { Sequelize } from "sequelize";
import Grades from "./modelGrades.js";
import Students from "./modelStudents.js";

const Report = db.define(
  "report",
  {},
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Grades.hasMany(Report, { foreignKey: "gradesId" });
Report.belongsTo(Grades, { foreignKey: "gradesId" });

export default Report;
