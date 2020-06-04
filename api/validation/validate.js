"use strict";

const Joi = require("@hapi/joi");

function registerValidation(data) {
    const schema = Joi.object({
        name: Joi
                .string()
                .min(1)
                .required(),
        email: Joi
                .string()
                .min(4)
                .email()
                .required(),
        password: Joi
                .string()
                .min(6)
                .required()
    });

    return schema.validateAsync(data);
}

function loginValidation(data) {
    const schema = Joi.object({
        email: Joi
                .string()
                .min(4)
                .email()
                .required(),
        password: Joi
                .string()
                .min(6)
                .required()
    });

    return schema.validateAsync(data);
}

module.exports = {
    registerValidation,
    loginValidation
};