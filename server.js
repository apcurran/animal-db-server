"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
// Import Routes


const app = express();

// DB Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo connection error"));

// Middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cors()); // Enable cors for all routes
app.use(express.json());



// Routes

app.listen(PORT, () => console.log(`Server running on port, ${PORT}.`));