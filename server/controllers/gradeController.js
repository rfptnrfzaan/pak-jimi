/** @format */

import Grades from "../models/modelGrades.js";

export const getGrades = async (req, res) => {
  try {
    const response = await Grades.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getGradesById = async (req, res) => {
  try {
    const response = await Grades.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteGrades = async (req, res) => {
  const grades = await Grades.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!grades) return res.status(404).json({ msg: "No Data Found" });

  try {
    await Grades.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Grades Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const saveGrades = async (req, res) => {
  const id = req.body.id;
  const jenis_nilai = req.body.jenis_nilai;
  const nilai = req.body.nilai;
  const semester = req.body.semester;

  try {
    await Grades.create({
      id: id,
      jenis_nilai: jenis_nilai,
      nilai: nilai,
      semester: semester,
    });
    res.status(201).json({ msg: "Grades Created Succesfully!" });
  } catch (error) {
    console.log(error.message);
  }
};
