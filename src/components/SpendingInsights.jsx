"use client";

export default function SpendingInsights({ budgets, transactions }) {
  if (!budgets || budgets.length === 0) return null;

  const overBudget = [];
  const underBudget = [];
  let totalOverspend = 0;
  let totalUnderspend = 0;

  budgets.forEach((b) => {
    const spent = transactions
      .filter((t) => t.category === b.category)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    if (spent > b.amount) {
      overBudget.push({
        category: b.category,
        overBy: spent - b.amount,
      });
      totalOverspend += spent - b.amount;
    } else {
      underBudget.push({
        category: b.category,
        underBy: b.amount - spent,
      });
      totalUnderspend += b.amount - spent;
    }
  });

  return (
    <div className="bg-white dark:bg-black border rounded-xl shadow p-4 space-y-2">
      <h2 className="text-xl font-semibold mb-2">Spending Insights</h2>

      {overBudget.length === 0 && underBudget.length === 0 && (
        <p className="text-muted-foreground">No budgets set yet.</p>
      )}

      {overBudget.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-red-500 mb-1">
            Over Budget:
          </h3>
          <ul className="list-disc pl-5">
            {overBudget.map((o) => (
              <li key={o.category}>
                {o.category}: Over by ₹{o.overBy.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {underBudget.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-green-500 mb-1">
            Under Budget:
          </h3>
          <ul className="list-disc pl-5">
            {underBudget.map((u) => (
              <li key={u.category}>
                {u.category}: Under by ₹{u.underBy.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-2 text-sm text-muted-foreground">
        Total Overspend: ₹{totalOverspend.toFixed(2)} <br />
        Total Underspend: ₹{totalUnderspend.toFixed(2)}
      </div>
    </div>
  );
}
