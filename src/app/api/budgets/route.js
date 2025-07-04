import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("personal-finance");
    const budgets = await db.collection("budgets").find().toArray();
    return Response.json({ budgets });
  } catch (error) {
    return Response.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { category, amount } = await req.json();
    if (!category || !amount) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("personal-finance");

    // Update if exists
    await db
      .collection("budgets")
      .updateOne(
        { category },
        { $set: { amount: parseFloat(amount) } },
        { upsert: true }
      );

    return Response.json({ message: "Budget set" });
  } catch (error) {
    return Response.json({ error: "Failed to set budget" }, { status: 500 });
  }
}
