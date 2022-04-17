// Load all configuration from '.env' file
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const { createHttpTerminator } = require("http-terminator");

app.use(compression());
app.use(helmet());

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
const HOSTNAME = process.env.HOSTNAME || "localhost";

// App will run on port 6000 and it will log a message
const server = app.listen(PORT, HOSTNAME, () => {
  console.log(`🚀 Server is running on ${HOSTNAME}:${PORT}`);
});

const httpTerminator = createHttpTerminator({ server });

async function shutdown(signalOrEvent) {
  console.log(`\n${signalOrEvent} occured, shutting down...`);
  try {
    await httpTerminator.terminate();
    console.log("Terminated the server successfully !");
    process.exit(0);
  } catch(errorShuttingdown) {
    console.error(`Error shutting down the server : ${errorShuttingdown}`)
    process.exit(1);
  }
}

// Signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Events
process.on("uncaughtException", shutdown);
process.on("unhandledRejection", shutdown);
