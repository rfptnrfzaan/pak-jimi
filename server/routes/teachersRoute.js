/** @format */

import express from "express";

import {
  getTeachers,
  getTeachersById,
  saveTeachers,
  deleteTeachers,
} from "../controllers/Teacher/teacherController.js";

const router = express.Router();

router.get("/teacher", getTeachers);
router.get("/teacher/:id", getTeachersById);
router.post("/teacher", saveTeachers);
router.delete("/teacher/:id", deleteTeachers);

export default router;
