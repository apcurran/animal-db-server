"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
// Import Routes
const animalsRouter = require("./api/routes/animals");
const userRouter = require("./api/routes/user");

const app = express();

// DB Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo connection error"));

// Middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use(cors()); // Enable cors for all routes
app.use(express.json());

// Routes
app.use("/api/animals", animalsRouter);
app.use("/api/user", userRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port, ${PORT}.`));