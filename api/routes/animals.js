"use strict";

const express = require("express");
const router = express.Router();
// Animal model
const Animal = require("../models/Animal");
const verifyAuth = require("../middleware/verifyAuth");

router.get("/", async (req, res) => {
    try {
        const animals = await Animal.find();

        res.status(200).json(animals);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.post("/animal", verifyAuth, async (req, res) => {
    // Destructure values from req.body obj
    const {
        animal_common_name,
        animal_scientific_name,
        animal_type,
        animal_diet,
        animal_lifespan,
        animal_size,
        animal_weight,
        animal_fact,
        main_img_url
    } = req.body;

    const animal = new Animal({
        animal_common_name,
        animal_scientific_name,
        animal_type,
        animal_diet,
        animal_lifespan,
        animal_size,
        animal_weight,
        animal_fact,
        main_img_url 
    });

    try {
        await animal.save();
        
        res.status(201).json({
            message: "New animal added!"
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

// PATCH an existing animal's data
router.patch("/animal/:search_term", verifyAuth, async (req, res) => {
    const { search_term } = req.params;
    const regexSearch = new RegExp(search_term, "i");
    const query = { animal_common_name: regexSearch }; // Search for animal case-insensitive

    try {
        await Animal.findOneAndUpdate(query, { $set: req.body });
    
        res.status(201).json({
            message: "Animal data updated!"
        });
        
    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err
        });
    }
});

router.delete("/animal/:id", verifyAuth, async (req, res) => {
    const { id } = req.params;

    try {
        await Animal.findByIdAndDelete(id);

        res.status(200).json({
            message: "Animal successfully deleted."
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;