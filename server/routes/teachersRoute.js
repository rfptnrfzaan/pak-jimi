/** @format */

import express from "express";

import {
  getTeachers,
  getTeachersById,
  saveTeachers,
  deleteTeachers,
} from "../controllers/Teacher/teacherController.js";

import {
  RegisterTeacher,
  LoginTeacher,
  LogOutTeacher,
} from "../controllers/Teacher/teacherController.js";

import { verifyTokenTeacher } from "../controllers/middleware/VerifyToken.js";
import { refreshTokenTeacher } from "../controllers/Teacher/RefreshTokenTeacher.js";

const router = express.Router();

router.get("/teacher", verifyTokenTeacher, getTeachers);
router.get("/teacher/:id", getTeachersById);
router.post("/teacher", saveTeachers);
router.delete("/teacher/:id", deleteTeachers);

router.post("/register/teacher", RegisterTeacher);
router.post("/login/teacher", LoginTeacher);
router.get("/token/teacher", refreshTokenTeacher);
router.delete("/logout/teacher", LogOutTeacher);

export default router;
