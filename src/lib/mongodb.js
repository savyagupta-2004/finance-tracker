import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

// Make sure we use a global variable for reuse in development
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to your .env.local file");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

/**
 * Optionally, do one-time setup to ensure the target database exists
 * by inserting a dummy document in a "testCollection".
 */
async function ensureFinanceCheckInitialized() {
  try {
    const client = await clientPromise;
    const db = client.db("financeCheck");

    // Check if the collection already exists
    const collections = await db.listCollections().toArray();
    const hasTestCollection = collections.some(
      (col) => col.name === "testCollection"
    );

    if (!hasTestCollection) {
      console.log("Creating 'testCollection' in financeCheck database...");
      await db.collection("testCollection").insertOne({
        initializedAt: new Date(),
        message: "Hello from financeCheck!",
      });
      console.log(
        "Dummy document inserted. Database should now appear in Atlas."
      );
    } else {
      console.log("'testCollection' already exists in financeCheck.");
    }
  } catch (error) {
    console.error("Error initializing financeCheck database:", error);
  }
}

// Immediately ensure it's created
ensureFinanceCheckInitialized();

export default clientPromise;
