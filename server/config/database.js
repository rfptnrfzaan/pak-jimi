/** @format */

import { Sequelize } from "sequelize";

const db = new Sequelize("nilai_siswa", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
