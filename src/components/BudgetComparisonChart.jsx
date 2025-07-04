"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BudgetComparisonChart({ budgets, transactions }) {
  // Build comparison data
  const comparisonData = budgets.map((b) => {
    const spent = transactions
      .filter((t) => t.category === b.category)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    return {
      category: b.category,
      Budget: parseFloat(b.amount),
      Actual: spent,
    };
  });

  if (comparisonData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src="/assets/four.png"
          alt="No data"
          className="max-w-[200px] w-full object-contain mb-4"
        />
        <p className="text-muted-foreground text-center">
          No budget data to display
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Budget vs Actual Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={comparisonData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#8884d8" />
          <Bar dataKey="Actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
