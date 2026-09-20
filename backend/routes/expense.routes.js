import express from "express";
import { addExpense, deleteExpense, getExpense, getExpenses, updateExpense } from "../controller/expense.controller.js";

const router = express.Router();

router.post("/", addExpense);
router.get("/", getExpenses);
router.get("/:id" , getExpense);
router.patch("/:id" , updateExpense);
router.delete("/:id",deleteExpense);


export default router;