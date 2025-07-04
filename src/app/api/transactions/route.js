import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("personal-finance");
    const transactions = await db.collection("transactions").find().toArray();

    return Response.json({ transactions });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.amount || !body.date || !body.description) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("personal-finance");
    await db.collection("transactions").insertOne(body);

    return Response.json({ message: "Added" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to add" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return Response.json({ error: "Missing id" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("personal-finance");

    const result = await db
      .collection("transactions")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json(
        { error: "No transaction found with that ID" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete" }, { status: 500 });
  }
}
export async function PUT(req) {
  try {
    const { id, amount, date, description } = await req.json();
    if (!id || !amount || !date || !description) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("personal-finance");

    await db.collection("transactions").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          amount,
          date,
          description,
        },
      }
    );

    return Response.json({ message: "Updated" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update" }, { status: 500 });
  }
}
