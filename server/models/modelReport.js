/** @format */

import db from "../config/database.js";
import { Sequelize } from "sequelize";
import Grades from "./modelGrades.js";

const Report = db.define(
  "report",
  {},
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Grades.hasMany(Report);
Report.belongsTo(Grades, { foreignKey: "gradesId" });

export default Report;
