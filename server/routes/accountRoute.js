/** @format */

import express from "express";

import {
  getAccount,
  getAccountById,
  saveAccount,
  deleteAccount,
} from "../controllers/accountController.js";

const router = express.Router();

router.get("/account", getAccount);
router.get("/account/:id", getAccountById);
router.post("/account", saveAccount);
router.delete("/account/:id", deleteAccount);

export default router;
