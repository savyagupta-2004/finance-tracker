"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseChart({ data }) {
  return (
    <>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src="assets/four.png"
            alt="No data"
            className="max-w-md w-full object-contain mb-4"
          />
          <p className="text-muted-foreground text-center">
            No data to display
          </p>
        </div>
      ) : (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Monthly Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
