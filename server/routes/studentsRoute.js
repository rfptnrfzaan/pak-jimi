/** @format */

import express from "express";

import {
  getStudents,
  getStudentsById,
  saveStudents,
  deleteStudents,
} from "../controllers/Student/studentsController.js";

import {
  RegisterStudent,
  LoginStudent,
  LogOutStudent,
} from "../controllers/Student/studentsController.js";

import { verifyTokenStudent } from "../controllers/middleware/VerifyToken.js";
import { refreshTokenStudent } from "../controllers/Student/RefreshTokenStudent.js";

const router = express.Router();

router.get("/student", verifyTokenStudent, getStudents);
router.get("/student/:nomor_induk", getStudentsById);
router.post("/student", saveStudents);
router.delete("/student/:nomor_induk", deleteStudents);

router.post("/register/student", RegisterStudent);
router.post("/login/student", LoginStudent);
router.get("/token/student", refreshTokenStudent);
router.delete("/logout/student", LogOutStudent);

export default router;
