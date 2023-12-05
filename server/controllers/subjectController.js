/** @format */

import Subject from "../models/modelSubjects.js";

export const getSubject = async (req, res) => {
  try {
    const response = await Subject.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const response = await Subject.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubject = async (req, res) => {
  const subject = await Subject.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!subject) return res.status(404).json({ msg: "No Data Found" });

  try {
    await Subject.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Subject Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const saveSubject = async (req, res) => {
  const id = req.body.id;
  const mata_pelajaran = req.body.mata_pelajaran;
  const bobot_pelajaran = req.body.bobot_pelajaran;

  try {
    await Subject.create({
      id: id,
      mata_pelajaran: mata_pelajaran,
      bobot_pelajaran: bobot_pelajaran,
    });
    res.status(201).json({ msg: "Subject Created Succesfully!" });
  } catch (error) {
    console.log(error.message);
  }
};
