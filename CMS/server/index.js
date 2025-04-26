import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "2100000kb" }));

let roomsCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("rooms");
    roomsCollection = db.collection("rooms");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ DB connection error:", error);
  }
}
connectDB();

// Routes

// GET /rooms - Fetch all rooms
app.get("/rooms", async (req, res) => {
  try {
    const posts = await roomsCollection.find({}).toArray();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// GET /rooms/:id - Fetch room by ID
app.get("/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await roomsCollection.findOne({ _id: new ObjectId(id) });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error("Failed to fetch room:", error);
    res.status(500).json({ error: "Failed to fetch room detail" });
  }
});

// POST /rooms - Add a new room to MongoDB
app.post("/rooms", async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: "Missing post content" });
    }
    const result = await roomsCollection.insertOne(data);
    if (!result.insertedId) {
      return res.status(500).json({ error: "Failed to insert room" });
    }
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error("Failed to insert room:", error);
    res.status(500).json({ error: "Failed to insert room" });
  }
});

// DELETE /rooms - Delete room
app.delete("/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await roomsCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Failed to delete room:", error);
    res.status(500).json({ error: "Failed to delete room" });
  }
});

// PUT /rooms - Update room
app.put("/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: "Missing post content" });
    }
    const result = await roomsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    console.error("Failed to update room:", error);
    res.status(500).json({ error: "Failed to update room" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
