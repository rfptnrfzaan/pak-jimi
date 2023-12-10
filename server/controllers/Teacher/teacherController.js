/** @format */

import Teachers from "../../models/modelTeachers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getTeachers = async (req, res) => {
  try {
    const response = await Teachers.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getTeachersById = async (req, res) => {
  try {
    const response = await Teachers.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTeachers = async (req, res) => {
  const teacher = await Teachers.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!teacher) return res.status(404).json({ msg: "No Data Found" });

  try {
    await Teachers.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Teachers Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const saveTeachers = async (req, res) => {
  const id = req.body.id;
  const nomor_unik = req.body.nomor_unik;
  const nama = req.body.nama;
  const alamat = req.body.alamat;
  const tanggal_lahir = req.body.tanggal_lahir;

  try {
    await Teachers.create({
      id: id,
      nomor_unik: nomor_unik,
      nama: nama,
      alamat: alamat,
      tanggal_lahir: tanggal_lahir,
    });
    res.status(201).json({ msg: "Account Created Succesfully!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const RegisterTeacher = async (req, res) => {
  const { nomor_unik, nama, alamat, tanggal_lahir, password, confirmPassword } =
    req.body;
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Teachers.create({
      nomor_unik: nomor_unik,
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

export const LoginTeacher = async (req, res) => {
  try {
    const teacher = await Teachers.findAll({
      where: {
        nomor_unik: req.body.nomor_unik,
      },
    });

    if (!teacher[0]) {
      return res.status(404).json({ msg: "Teacher not found" });
    }

    const match = await bcrypt.compare(req.body.password, teacher[0].password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    const teacherId = teacher[0].id;
    const nama = teacher[0].nama;
    const nomor_induk = teacher[0].nomor_induk;

    const accessTokenTeacher = jwt.sign(
      { teacherId, nama, nomor_induk },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshTokenTeacher = jwt.sign(
      { teacherId, nama, nomor_induk },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await res.cookie("refreshToken", refreshTokenTeacher, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const [updatedRows] = await Teachers.update(
      { refresh_token: refreshTokenTeacher },
      {
        where: {
          Id: teacherId,
        },
      }
    );

    if (updatedRows !== 1) {
      console.log("Error updating refresh_token");
      // Handle the case where the update didn't affect exactly one row
    }

    res.cookie("refreshToken", refreshTokenTeacher, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessTokenTeacher });
  } catch (error) {
    console.log("Error:", error);
    res.status(404).json({ msg: "NIK Tidak Ditemukan" });
  }
};

export const LogOutTeacher = async (req, res) => {
  try {
    const refreshTokenTeacher = req.cookies.refreshToken;

    if (!refreshTokenTeacher) {
      return res.sendStatus(204); // No refresh token, consider sending 204 or another appropriate status
    }

    const teacher = await Teachers.findAll({
      where: {
        refresh_token: refreshTokenTeacher,
      },
    });

    if (!teacher[0]) {
      return res
        .sendStatus(404)
        .json({ error: "Teacher not found with the provided refresh token" });
    }

    const teacherId = teacher[0].id;

    await Teachers.update(
      { refresh_token: null },
      {
        where: {
          id: teacherId,
        },
      }
    );

    res.clearCookie("refreshToken");
    return res.sendStatus(200); // Successfully logged out
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
