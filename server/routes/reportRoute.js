/** @format */

import express from "express";

import {
  getReport,
  getReportById,
  saveReport,
  deleteReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/report", getReport);
router.get("/report/:id", getReportById);
router.post("/report", saveReport);
router.delete("/report/:id", deleteReport);

export default router;
