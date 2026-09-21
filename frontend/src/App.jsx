import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expense from "./pages/Expense.jsx";
import Home from "./pages/Home.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/expense" element={<Expense />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
