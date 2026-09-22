import { useEffect, useState, useMemo } from "react";
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
      await axios.delete(`${import.meta.env.VITE_EXPENSE_DATA}/${id}`, {
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

      setEditExpense(null);
    } catch (error) {
      alert("failed to update !", error);
    }
  };

  const totalIncome = useMemo(() => {
    return expenses
      .filter((expense) => expense.type === "income")
      .reduce((total, expense) => total + Number(expense.amount), 0);
  }, [expenses]);

  const totalExpense = useMemo(() => {
    return expenses
      .filter((expense) => expense.type === "expense")
      .reduce((total, expense) => total + Number(expense.amount), 0);
  }, [expenses]);

  const balance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalIncome, totalExpense]);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Total Income</p>

            <p className="text-3xl font-bold text-green-600 mt-2">
              ₹{totalIncome}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Total Expense</p>

            <p className="text-3xl font-bold text-red-600 mt-2">
              ₹{totalExpense}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Balance</p>

            <p className="text-3xl font-bold text-blue-600 mt-2">₹{balance}</p>
          </div>
        </div>
        <hr />
        <hr />
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-5">
              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-lg transition"
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
                      onClick={() => setEditExpense(expense)}
                      className="bg-green-500 text-white px-2 py-1 rounded-lg mt-3 ml-3"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {editExpense && (
              <div className="fixed inset-0 bg-blue-900 flex items-center justify-center p-6 z-50 overflow-y-auto">
                <div className="w-full max-w-lg">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-black text-white rounded-2xl shadow-lg mb-4">
                      <span className="text-2xl">₹</span>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                      Edit Transaction
                    </h1>

                    <p className="text-white mt-2">
                      Update your income and expenses
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7">
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Transaction Title
                      </label>

                      <input
                        type="text"
                        value={editExpense.title}
                        onChange={(e) =>
                          setEditExpense({
                            ...editExpense,
                            title: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Amount
                      </label>

                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                          ₹
                        </span>

                        <input
                          type="number"
                          value={editExpense.amount}
                          onChange={(e) =>
                            setEditExpense({
                              ...editExpense,
                              amount: e.target.value,
                            })
                          }
                          className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Transaction Type
                      </label>

                      <select
                        value={editExpense.type}
                        onChange={(e) =>
                          setEditExpense({
                            ...editExpense,
                            type: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 cursor-pointer"
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>

                      <input
                        type="text"
                        value={editExpense.category}
                        onChange={(e) =>
                          setEditExpense({
                            ...editExpense,
                            category: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleUpdate(editExpense._id, editExpense)
                        }
                        className="flex-1 bg-black text-white py-3.5 rounded-xl font-semibold transition hover:bg-gray-800 active:scale-[0.98]"
                      >
                        Save Changes
                      </button>

                      <button
                        onClick={() => setEditExpense(null)}
                        className="flex-1 bg-gray-200 text-gray-800 py-3.5 rounded-xl font-semibold transition hover:bg-gray-300 active:scale-[0.98]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
