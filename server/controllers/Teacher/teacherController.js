/** @format */

import Teachers from "../../models/modelTeachers.js";

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
