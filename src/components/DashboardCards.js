"use client";

export default function DashboardCards({ transactions, categoryData }) {
  const totalExpenses = transactions.reduce(
    (sum, tx) => sum + parseFloat(tx.amount),
    0
  );

  const topCategories = categoryData
    .slice()
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const recentTransactions = transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Expenses Card */}
      <div className="bg-white dark:bg-black border rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
        <p className="text-3xl font-bold text-primary">
          ₹ {totalExpenses.toFixed(2)}
        </p>
      </div>

      {/* Top Categories Card */}
      <div className="bg-white dark:bg-black border rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Top Categories</h3>
        {topCategories.length === 0 ? (
          <p className="text-muted-foreground">No data</p>
        ) : (
          <ul className="space-y-1">
            {topCategories.map((cat) => (
              <li key={cat.category} className="flex justify-between">
                <span>{cat.category}</span>
                <span>₹ {cat.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Transactions Card */}
      <div className="bg-white dark:bg-black border rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
        {recentTransactions.length === 0 ? (
          <p className="text-muted-foreground">No recent transactions</p>
        ) : (
          <ul className="space-y-1">
            {recentTransactions.map((tx) => (
              <li
                key={tx._id}
                className="flex justify-between text-sm text-muted-foreground"
              >
                <span>{tx.description}</span>
                <span>₹ {parseFloat(tx.amount).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
