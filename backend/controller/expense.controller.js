import Expense from "../models/expense.model.js";


export const addExpense = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const expense = await Expense.create({
      title,
      amount,
      type,
      category,
      date,
    });

    res.status(201).json({
      message: "Transaction added successfully",
      expense,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add transaction",
    });
  }
};


export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({
      createdAt: -1,
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
};