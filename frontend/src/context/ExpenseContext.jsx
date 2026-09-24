import { createContext, useState } from "react";
import axios from "axios";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const response = await axios.get(import.meta.env.VITE_EXPENSE_DATA, {
        withCredentials: true,
      });

      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_EXPENSE_DATA}/${id}`);

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_EXPENSE_DATA}/${id}`,
        updatedData,
        {
          withCredentials: true,
        },
      );

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense._id === id ? response.data.expense : expense,
        ),
      );
    } catch (error) {
      alert("failed to update !", error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        handleDelete,
        handleUpdate,
        fetchExpenses,
        loading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
