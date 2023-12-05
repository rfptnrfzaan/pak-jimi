/** @format */

import db from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const Grades = db.define(
  "grades",
  {
    jenis_nilai: DataTypes.STRING,
    nilai: DataTypes.STRING,
    semester: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Grades;
