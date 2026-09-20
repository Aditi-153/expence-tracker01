import express from "express";
import { addExpense, getExpenses } from "../controller/expense.controller.js";

const router = express.Router();

router.post("/", addExpense);
router.get("/", getExpenses);


export default router;