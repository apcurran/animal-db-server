"use strict";

const Joi = require("@hapi/joi");

function addAnimalValidation(data) {
    const schema = Joi.object({
        animal_common_name: Joi
                            .string()
                            .min(1)
                            .required(),
        animal_scientific_name: Joi
                            .string()
                            .min(1)
                            .required(),
        animal_type: Joi
                            .string()
                            .min(1)
                            .required(),
        animal_diet: Joi
                            .string()
                            .min(1)
                            .required(),
        animal_lifespan: Joi
                            .string()
                            .min(1)
                            .required(),
        animal_size: Joi
                            .string()
                            .min(1)
                            .required(),
        animal_weight: Joi
                            .string()
                            .min(1)
                            .required(),
        animal_fact: Joi
                            .string()
                            .min(1),
        animal_desc: Joi
                            .string()
                            .min(1)
                            .required(),
        main_img_url: Joi
                            .string()
                            .min(1)
                            .required()
    });

    return schema.validateAsync(data);
}

function editAnimalValidation(data) {
    const schema = Joi.object().keys({
        animal_common_name: Joi
                            .string()
                            .min(1),
        animal_scientific_name: Joi
                            .string()
                            .min(1),
        animal_type: Joi
                            .string()
                            .min(1),
        animal_diet: Joi
                            .string()
                            .min(1),
        animal_lifespan: Joi
                            .string()
                            .min(1),
        animal_size: Joi
                            .string()
                            .min(1),
        animal_weight: Joi
                            .string()
                            .min(1),
        animal_fact: Joi
                            .string()
                            .min(1),
        animal_desc: Joi
                            .string()
                            .min(1),
        main_img_url: Joi
                            .string()
                            .min(1)
    }).min(1);

    return schema.validateAsync(data);
}

module.exports = {
    addAnimalValidation,
    editAnimalValidation
};