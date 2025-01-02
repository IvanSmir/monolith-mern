import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "";

mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB => Monolith");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB => Monolith", err);
    process.exit(1);
  });
