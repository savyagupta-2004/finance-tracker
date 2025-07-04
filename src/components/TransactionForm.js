"use client";

import { useState } from "react";

export default function TransactionForm({ onAdd, categories = [] }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) {
      setError("All fields are required");
      return;
    }
    setError("");
    await onAdd({ amount, date, description, category });
    setAmount("");
    setDate("");
    setDescription("");
    setCategory("");
  };

  return (
    <form
      id="transaction"
      onSubmit={handleSubmit}
      className="space-y-2 p-4 border rounded"
    >
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />

      <label className="block mb-2 font-medium">Category</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No categories yet
          </option>
        )}
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Transaction
      </button>
    </form>
  );
}
