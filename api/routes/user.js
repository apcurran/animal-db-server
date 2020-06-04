"use strict";

const express = require("express");
const router = express.Router();
// User model
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation/validate");

router.post("/register", async (req, res) => {
    // Validate incoming data
    try {

    } catch (err) {
        console.error(err);
    }
});

router.post("/login", async (req, res) => {

});

module.exports = router;