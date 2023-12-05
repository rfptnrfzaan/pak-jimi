/** @format */

import Report from "../models/modelReport.js";

export const getReport = async (req, res) => {
  try {
    const response = await Report.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getReportById = async (req, res) => {
  try {
    const response = await Report.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteReport = async (req, res) => {
  const report = await Report.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!report) return res.status(404).json({ msg: "No Data Found" });

  try {
    await Report.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Report Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const saveReport = async (req, res) => {
  const id = req.body.id;

  try {
    await Report.create({
      id: id,
    });
    res.status(201).json({ msg: "Report Created Succesfully!" });
  } catch (error) {
    console.log(error.message);
  }
};
