/** @format */

import db from "../config/database.js";
import { Sequelize } from "sequelize";
import Report from "./modelReport.js";
import Subjects from "./modelSubjects.js";
import Grades from "./modelGrades.js";

const { DataTypes } = Sequelize;

const Students = db.define(
  "students",
  {
    nomor_induk: DataTypes.STRING,
    nama: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    password: DataTypes.STRING,
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Students.hasMany(Subjects, { foreignKey: "subjectId" });
Subjects.belongsTo(Students);

Students.hasMany(Grades, { foreignKey: "studentId" });
Grades.belongsTo(Students);

Students.hasOne(Report, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Report.belongsTo(Students);

export default Students;
