// Load all configuration from '.env' file
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Create a connection to MongoDB using mongoose
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

// Prompts an error message on error
db.on("error", (error) => console.error(error));

// Prompts a message if successfully connected to MongoDB
db.once("open", () => console.log("🔌 Successfully connected to MongoDB"));

app.use(express.json());
const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "localhost";

// App will run on port 6000 and it will log a message
app.listen(PORT, () => console.log("🚀 Server is running on port 4000"));
