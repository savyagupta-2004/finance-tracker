"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function BudgetForm({ categories, onSuccess }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) {
      alert("Please select a category and enter an amount.");
      return;
    }

    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, amount }),
    });

    setAmount("");
    setCategory("");
    onSuccess();
  };

  return (
    <form id="budget" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="category" className="mb-2">
          Category
        </Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.length === 0 ? (
              <SelectItem value="none" disabled>
                No categories yet
              </SelectItem>
            ) : (
              categories
                .map((cat) => cat?.trim())
                .filter((cat) => cat && cat !== "")
                .map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="amount" className="mb-2">
          Budget Amount
        </Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter budget amount"
        />
      </div>

      <Button type="submit" className="mb-2">
        Set Budget
      </Button>
    </form>
  );
}
