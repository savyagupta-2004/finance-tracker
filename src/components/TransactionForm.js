"use client";

import { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description) {
      setError("All fields are required");
      return;
    }
    setError("");
    await onAdd({ amount, date, description });
    setAmount("");
    setDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
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
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Transaction
      </button>
    </form>
  );
}
