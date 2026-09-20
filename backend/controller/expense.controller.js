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

export const getExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense fetched successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expense",
      error: error.message,
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update expense",
      error: error.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
      error: error.message,
    });
  }
};
