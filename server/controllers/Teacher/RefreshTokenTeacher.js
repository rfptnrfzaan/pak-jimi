/** @format */

import Teachers from "../../models/modelTeachers.js";
import jwt from "jsonwebtoken";

export const refreshTokenTeacher = async (req, res) => {
  try {
    const refreshTokenTeacher = req.cookies.refreshToken;

    console.log("Received refreshToken cookie:", refreshTokenTeacher);

    if (!refreshTokenTeacher) {
      return res.sendStatus(401);
    }

    const teachers = await Teachers.findAll({
      where: {
        refresh_token: refreshTokenTeacher,
      },
    });

    console.log("Teacher found:", teachers);

    if (!teachers[0]) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshTokenTeacher,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        console.log("Decoded refreshToken:", decoded);

        if (err) {
          console.error("Error verifying refresh token:", err);
          return res.sendStatus(403);
        }

        const teacherId = teachers[0].id;
        const nama = teachers[0].nama;
        const nomor_unik = teachers[0].nomor_unik;

        const accessTokenTeacher = jwt.sign(
          { teacherId, nama, nomor_unik },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m", // Adjust the expiration time as needed
          }
        );

        res.json({ accessTokenTeacher });
        // res.clearCookie("refreshToken");
      }
    );
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.sendStatus(500); // Internal Server Error
  }
};
