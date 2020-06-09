"use strict";

const express = require("express");
const router = express.Router();
// User model
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation/validate-user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    // Validate incoming data
    try {
        await registerValidation(req.body);

    } catch (err) {
        return res.status(400).json({
            error: err.details[0].message
        });
    }

    // Check if user is already in the db
    try {
        const emailExists = await User.findOne({ email: req.body.email });
        
        if (emailExists) {
            return res.status(400).json({
                error: "Email already exists."
            });
        }

        if (req.body.secret !== process.env.ADMIN_SECRET) {
            return res.status(401).json({
                error: "You have not provided the correct secret."
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Create a new user
        const { name, email, password } = req.body;
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        const savedUser = await user.save();

        res.status(201).json({
            message: "New admin registered.",
            user: user._id
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err
        });
    }

});

router.post("/login", async (req, res) => {
    try {
        await loginValidation(req.body);

    } catch (err) {
        return res.status(400).json({
            error: err.details[0].message
        });
    }

    try {
        // Check if email exists
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({
                error: "Email is not found"
            });
        }

        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                error: "Invalid password"
            });
        }

        // Create and assign token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        res.header("Authorization", `Bearer ${token}`).json(token);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;