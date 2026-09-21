import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
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

    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Expense Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your income and expenses
            </p>
          </div>

          <button
            onClick={() => navigate("/expense")}
            className="bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            + Add Transaction
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <p className="text-gray-500 text-lg">Loading transactions...</p>
          </div>
        ) : expenses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No transactions yet
            </h2>

            <p className="text-gray-500 mt-2">
              Add your first transaction to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {expenses.map((expense) => (
              <div
                key={expense._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {expense.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {expense.category}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      expense.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {expense.type}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500">Amount</p>

                  <p
                    className={`text-3xl font-bold mt-1 ${
                      expense.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ₹{expense.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
