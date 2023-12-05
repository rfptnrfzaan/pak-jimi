/** @format */

import Students from "../models/modelStudents.js";

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
