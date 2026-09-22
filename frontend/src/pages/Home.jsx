import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editExpense, setEditExpense] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_DELETE_EXPENSE}/${id}`, {
        withCredentials: true,
      });
      setExpenses((preExpenses) =>
        preExpenses.filter((expense) => expense._id !== id),
      );
    } catch (error) {
      alert("failed to delete !", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE.UPDATE_EXPENSE}/${id}`,
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

      setEditExpense(null);
    } catch (error) {
      alert("failed to update !", error);
    }
  };

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
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg mt-3"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(expense._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded-lg mt-3 ml-3"
                  >
                    Update
                  </button>
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
