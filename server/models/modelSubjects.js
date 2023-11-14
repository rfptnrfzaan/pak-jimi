/** @format */

import db from "../config/database.js";
import { Sequelize } from "sequelize";
import Students from "./modelStudents.js";
import Grades from "./modelGrades.js";

const { DataTypes } = Sequelize;

const Subjects = db.define(
  "subjects",
  {
    mata_pelajaran: DataTypes.STRING,
    bobot_pelajaran: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Subjects.hasMany(Students, { foreignKey: "subjectId" });

Grades.belongsTo(Subjects, { foreignKey: "subjectId" });
Students.belongsTo(Subjects, { foreignKey: "subjectId" });

export default Subjects;
