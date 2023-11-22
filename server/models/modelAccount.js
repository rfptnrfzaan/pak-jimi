/** @format */

import db from "../config/database.js";
import { Sequelize } from "sequelize";
import Students from "./modelStudents.js";
import Teachers from "./modelTeachers.js";

const { DataTypes } = Sequelize;

const Account = db.define(
  "account",
  {
    jenis_akun: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Students.hasOne(Account, { foreignKey: "accountId" });
Account.belongsTo(Students, { foreignKey: "accountId" });

Teachers.hasOne(Account, { foreignKey: "accountId" });
Account.belongsTo(Teachers, { foreignKey: "accountId" });

export default Account;
