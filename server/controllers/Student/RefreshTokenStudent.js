/** @format */

import Students from "../../models/modelStudents.js";
import jwt from "jsonwebtoken";

export const refreshTokenStudent = async (req, res) => {
  try {
    const refreshTokenStudent = req.cookies.refreshToken;

    console.log("Received refreshToken cookie:", refreshTokenStudent);

    if (!refreshTokenStudent) {
      return res.sendStatus(401);
    }

    const student = await Students.findAll({
      where: {
        refresh_token: refreshTokenStudent,
      },
    });

    console.log("Student found:", student);

    if (!student[0]) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshTokenStudent,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        console.log("Decoded refreshToken:", decoded);

        if (err) {
          console.error("Error verifying refresh token:", err);
          return res.sendStatus(403);
        }

        const studentId = student[0].id;
        const nama = student[0].nama;
        const nomor_induk = student[0].nomor_induk;

        const accessTokenStudent = jwt.sign(
          { studentId, nama, nomor_induk },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m", // Adjust the expiration time as needed
          }
        );

        res.json({ accessTokenStudent });
        // res.clearCookie("refreshToken");
      }
    );
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.sendStatus(500); // Internal Server Error
  }
};
