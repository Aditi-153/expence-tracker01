import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ExpenseProvider } from "./context/ExpenseProvider";
createRoot(document.getElementById("root")).render(
  <ExpenseProvider>
    <App />
  </ExpenseProvider>,
);
