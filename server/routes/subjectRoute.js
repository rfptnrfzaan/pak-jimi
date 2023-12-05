/** @format */

import express from "express";

import {
  getSubject,
  getSubjectById,
  saveSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

const router = express.Router();

router.get("/subject", getSubject);
router.get("/subject/:id", getSubjectById);
router.post("/subject", saveSubject);
router.delete("/subject/:id", deleteSubject);

export default router;
