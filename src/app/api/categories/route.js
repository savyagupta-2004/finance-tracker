// /api/categories/route.js
import connectDB from "@/lib/connectDB";
import Category from "@/models/Category";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return Response.json({ categories });
}

export async function POST(req) {
  await connectDB();
  const { name } = await req.json();
  if (!name || !name.trim()) {
    return new Response("Category name is required", { status: 400 });
  }
  const category = new Category({ name });
  await category.save();
  return Response.json({ category });
}
