const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose connected to database");
});

db.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected from database");
});

module.exports = db;
