/** @format */

import Students from "../../models/modelStudents.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getStudents = async (req, res) => {
  try {
    const response = await Students.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getStudentsById = async (req, res) => {
  try {
    const response = await Students.findOne({
      where: {
        nomor_induk: req.params.nomor_induk,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudents = async (req, res) => {
  const students = await Students.findOne({
    where: {
      nomor_induk: req.params.nomor_induk,
    },
  });

  if (!students) return res.status(404).json({ msg: "No Data Found" });

  try {
    await Students.destroy({
      where: {
        nomor_induk: req.params.nomor_induk,
      },
    });
    res.status(200).json({ msg: "Students Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const saveStudents = async (req, res) => {
  const nomor_induk = req.body.nomor_induk;
  const nama = req.body.nama;
  const alamat = req.body.alamat;
  const tanggal_lahir = req.body.tanggal_lahir;

  try {
    await Students.create({
      nomor_induk: nomor_induk,
      nama: nama,
      alamat: alamat,
      tanggal_lahir: tanggal_lahir,
    });
    res.status(201).json({ msg: "Student Created Succesfully!" });
  } catch (error) {
    console.log(error.message);
  }
};


export const RegisterStudent = async (req, res) => {
  const {
    nomor_induk,
    nama,
    alamat,
    tanggal_lahir,
    password,
    confirmPassword,
  } = req.body;
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Students.create({
      nomor_induk: nomor_induk,
      nama: nama,
      alamat: alamat,
      tanggal_lahir: tanggal_lahir,
      password: hashPassword,
    });
    res.json({ msg: "Register Berhasil!" });
  } catch (error) {
    console.log(error);
  }
};

export const LoginStudent = async (req, res) => {
  try {
    const student = await Students.findAll({
      where: {
        nomor_induk: req.body.nomor_induk,
      },
    });

    if (!student[0]) {
      return res.status(404).json({ msg: "Student not found" });
    }

    const match = await bcrypt.compare(req.body.password, student[0].password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    const studentId = student[0].id;
    const nama = student[0].nama;
    const nomor_induk = student[0].nomor_induk;

    const accessTokenStudent = jwt.sign(
      { studentId, nama, nomor_induk },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshTokenStudent = jwt.sign(
      { studentId, nama, nomor_induk },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await res.cookie("refreshToken", refreshTokenStudent, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const [updatedRows] = await Students.update(
      { refresh_token: refreshTokenStudent },
      {
        where: {
          Id: studentId,
        },
      }
    );

    if (updatedRows !== 1) {
      console.log("Error updating refresh_token");
      // Handle the case where the update didn't affect exactly one row
    }

    res.cookie("refreshToken", refreshTokenStudent, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessTokenStudent });
  } catch (error) {
    console.log("Error:", error);
    res.status(404).json({ msg: "NIK Tidak Ditemukan" });
  }
};

export const LogOutStudent = async (req, res) => {
  try {
    const refreshTokenStudent = req.cookies.refreshToken;

    if (!refreshTokenStudent) {
      return res.sendStatus(204); // No refresh token, consider sending 204 or another appropriate status
    }

    const student = await Students.findAll({
      where: {
        refresh_token: refreshTokenStudent,
      },
    });

    if (!student[0]) {
      return res.sendStatus(404); // No student found with the provided refresh token
    }

    const studentId = student[0].id;

    await Students.update(
      { refresh_token: null },
      {
        where: {
          id: studentId,
        },
      }
    );

    res.clearCookie("refreshToken");
    return res.sendStatus(200); // Successfully logged out
  } catch (error) {
    console.log("Error:", error);
    return res.sendStatus(500); // Internal Server Error
  }
};
