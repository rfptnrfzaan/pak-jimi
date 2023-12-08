/** @format */

import express from "express";

import {
  getStudents,
  getStudentsById,
  RegisterStudent,
  LoginStudent,
  LogOutStudent,
  deleteStudents,
} from "../controllers/Student/studentsController.js";
import { verifyTokenStudent } from "../controllers/middleware/VerifyToken.js";
import { refreshTokenStudent } from "../controllers/Student/RefreshTokenStudent.js";

const router = express.Router();

router.get("/student", verifyTokenStudent, getStudents);
router.get("/student/:nomor_induk", getStudentsById);
router.post("/register/student", RegisterStudent);
router.post("/login/student", LoginStudent);
router.get("/student/token", refreshTokenStudent);
router.delete("/logout/student", LogOutStudent);
// router.delete("/student/:nomor_induk", deleteStudents);

export default router;
