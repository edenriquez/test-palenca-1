const Joi = require("joi");

const emailValidation = Joi.string().email({
  tlds: { allow: ["com"] },
});
const passValidation = Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,30}$"));

module.exports = {
  emailValidation,
  passValidation,
};
