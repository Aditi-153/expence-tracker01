import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expense from "./pages/Expense.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
