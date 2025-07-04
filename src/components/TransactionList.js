"use client";

import { useState } from "react";

export default function TransactionList({
  transactions = [],
  onDelete,
  onEdit,
}) {
  const [editId, setEditId] = useState(null);
  const [editedTx, setEditedTx] = useState({});

  const startEdit = (tx) => {
    setEditId(tx._id);
    setEditedTx(tx);
  };

  const handleChange = (e) => {
    setEditedTx({ ...editedTx, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(editId, editedTx);
    setEditId(null);
    setEditedTx({});
  };

  return (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-2">Transactions</h2> */}
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src="assets/noTrans.jpg"
            alt="No transactions"
            className="max-w-[200px] w-full object-contain mb-4"
          />
          <p className="text-muted-foreground text-center">
            No transactions yet
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {transactions.map((tx) => (
            <li
              key={tx._id}
              className="border p-2 rounded flex flex-col sm:flex-row sm:justify-between gap-2"
            >
              {editId === tx._id ? (
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full">
                  <input
                    name="amount"
                    value={editedTx.amount}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    name="date"
                    value={editedTx.date}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    name="description"
                    value={editedTx.description}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="border px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between w-full items-center">
                  <div>
                    <p>Amount: {tx.amount}</p>
                    <p>Date: {tx.date}</p>
                    <p>Description: {tx.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(tx)}
                      className="text-blue-500 border border-blue-500 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(tx._id)}
                      className="text-red-500 border border-red-500 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
