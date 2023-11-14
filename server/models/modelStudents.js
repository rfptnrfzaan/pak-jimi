/** @format */

import db from "../config/database.js";
import { Sequelize } from "sequelize";
import Grades from "./modelGrades.js";

const { DataTypes } = Sequelize;

const Students = db.define(
  "students",
  {
    nis: DataTypes.STRING,
    nama: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Students.hasOne(Grades, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Students;
