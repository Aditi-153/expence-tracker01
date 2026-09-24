import { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  return (
    <ExpenseContext.provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.provider>
  );
};
