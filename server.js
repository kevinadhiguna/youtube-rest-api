const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/subscribers", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("🔌 Successfully connected to MongoDB"));

app.listen(6000, () => console.log("🚀 Server is running on port 6000"));
