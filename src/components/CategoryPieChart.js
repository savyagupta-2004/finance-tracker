"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#d0ed57",
  "#a28fd0",
  "#f28ba8",
];

export default function CategoryPieChart({ data }) {
  return (
    <>
      <section id="analysis">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="/assets/four.png"
              alt="No data"
              className="max-w-md w-full object-contain mb-4"
            />
            <p className="text-muted-foreground text-center">
              No category data to display
            </p>
          </div>
        ) : (
          <div className=" dark:bg-black rounded-lg  p-4">
            <h2 className="text-xl font-bold mb-2">Expenses by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </>
  );
}
