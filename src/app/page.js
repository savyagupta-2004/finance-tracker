"use client";

import BudgetComparisonChart from "@/components/BudgetComparisonChart";
import BudgetForm from "@/components/BudgetForm";
import CategoryPieChart from "@/components/CategoryPieChart";
import DashboardCards from "@/components/DashboardCards";
import ExpenseChart from "@/components/ExpenseChart";
import SpendingInsights from "@/components/SpendingInsights";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { useEffect, useState } from "react";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data.transactions);
  };
  const fetchBudgets = async () => {
    const res = await fetch("/api/budgets");
    const data = await res.json();
    setBudgets(data.budgets);
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (tx) => {
    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tx),
    });
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchTransactions();
  };

  const editTransaction = async (id, updatedTx) => {
    await fetch("/api/transactions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updatedTx }),
    });
    await fetchTransactions();
  };

  const chartData = Array.isArray(transactions)
    ? transactions.reduce((acc, tx) => {
        const month = tx.date.slice(0, 7);
        const existing = acc.find((item) => item.month === month);
        if (existing) {
          existing.amount += parseFloat(tx.amount);
        } else {
          acc.push({ month, amount: parseFloat(tx.amount) });
        }
        return acc;
      }, [])
    : [];

  const categoryData = Array.isArray(transactions)
    ? transactions.reduce((acc, tx) => {
        const existing = acc.find((c) => c.category === tx.category);
        if (existing) {
          existing.amount += parseFloat(tx.amount);
        } else {
          acc.push({ category: tx.category, amount: parseFloat(tx.amount) });
        }
        return acc;
      }, [])
    : [];

  const uniqueCategories = Array.from(
    new Set(
      transactions
        .map((tx) => (tx.category ? tx.category.trim() : ""))
        .filter((cat) => cat !== "")
    )
  );

  return (
    <main className="max-w-6xl overflow-x-hidden mx-auto px-4 pt-16 pb-8 space-y-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        Personal Finance Visualizer
      </h1>
      <DashboardCards transactions={transactions} categoryData={categoryData} />
      <div className="bg-white dark:bg-black border rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Set Category Budgets</h2>

        <BudgetForm categories={uniqueCategories} onSuccess={fetchBudgets} />
        {budgets.map((b) => (
          <p key={b.category} className="text-sm">
            {b.category}: ₹{b.amount}
          </p>
        ))}
        <BudgetComparisonChart budgets={budgets} transactions={transactions} />
        <SpendingInsights budgets={budgets} transactions={transactions} />
      </div>
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-6 
          auto-rows-[300px] 
          md:auto-rows-[400px]
        "
      >
        {/* Add Transaction */}
        <div className="bg-white overflow-y-auto dark:bg-black border rounded-2xl shadow-md p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Add Transaction
          </h2>
          <TransactionForm
            categories={uniqueCategories}
            onAdd={addTransaction}
            className="flex-1"
          />
        </div>

        {/* Transaction List */}
        <div className="bg-white overflow-y-auto dark:bg-black border rounded-2xl shadow-md p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Transactions
          </h2>
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
            onEdit={editTransaction}
            className="flex-1 overflow-auto"
          />
        </div>

        {/* Expense Chart - spans both columns on desktop */}
        <div
          className="
          dark:bg-black 
          border 
          rounded-2xl
          overflow-y-auto 
          shadow-md 
          p-6 
          md:col-span-2 
          flex flex-col
        "
        >
          <ExpenseChart data={chartData} className="flex-1" />
        </div>
        <div
          className="
          border 
          overflow-y-auto
          rounded-2xl 
          shadow-md 
          p-6 
          md:col-span-2 
          flex flex-col
        "
        >
          <CategoryPieChart data={categoryData} />
        </div>
      </div>
    </main>
  );
}
