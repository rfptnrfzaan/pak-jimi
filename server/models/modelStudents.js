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
  },
  {
    freezeTableName: true,
  }
);

Students.hasMany(Subjects);
Subjects.belongsTo(Students, { foreignKey: "subjectId" });

Students.hasMany(Grades, { foreignKey: "studentId" });
Grades.belongsTo(Students, { foreignKey: "gradeId" });

Students.hasOne(Report, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Report.belongsTo(Students, { foreignKey: "reportId" });

export default Students;
