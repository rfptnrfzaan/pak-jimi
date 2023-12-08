/** @format */

import db from "../config/database.js";
import { Sequelize } from "sequelize";
import Subjects from "./modelSubjects.js";

const { DataTypes } = Sequelize;

const Teachers = db.define(
  "teachers",
  {
    nomor_unik: DataTypes.STRING,
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

Teachers.hasOne(Subjects, { foreignKey: "teacherId" });
Subjects.belongsTo(Teachers, { foreignKey: "subjectId" });

export default Teachers;
