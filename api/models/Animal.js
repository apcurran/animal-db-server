"use strict";

const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
    animal_common_name: { type: String, required: true },
    animal_scientific_name: { type: String, required: true },
    animal_type: { type: String, required: true },
    animal_diet: { type: String, required: true },
    animal_lifespan: { type: String, required: true },
    animal_size: { type: String, required: true },
    animal_weight: { type: String, required: true },
    animal_fact: { type: String },
    animal_desc: { type: String, required: true },
    main_img_url: { type: String, required: true }
});

module.exports = mongoose.model("Animal", AnimalSchema);