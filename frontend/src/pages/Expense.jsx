import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Expense = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, amount, type, category } = formData;

    if (!title || !amount || !type || !category) {
      alert("fields are empty");
      return;
    }

    setLoading(true);

    try {
      await axios.post(import.meta.env.VITE_EXPENSE_DATA, formData, {
        withCredentials: true,
      });

      alert("Successfully added!");
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("failedddddd");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-black text-white rounded-2xl shadow-lg mb-4">
            <span className="text-2xl">₹</span>
          </div>

          <h1 className="text-3xl font-bold text-white">Add Transaction</h1>

          <p className="text-white mt-2">
            Keep track of your income and expenses
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Transaction Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Grocery shopping"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  ₹
                </span>

                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Transaction Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 cursor-pointer"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Food, Travel, Salary"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3.5 rounded-xl font-semibold transition hover:bg-gray-800 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Transaction"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Expense;
