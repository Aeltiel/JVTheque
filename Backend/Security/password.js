const passwordValidator = require("password-validator");

let passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()
  .oneOf([
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "[",
    "]",
    "{",
    "}",
    "\\|", // Échappez le caractère |
    ";",
    ":",
    '\\"', // Échappez le caractère "
    ",",
    ".",
    "?",
    "/",
    "`",
    "~",
  ]);

//console.log(passwordSchema.validate("T3st4ListJV!"));
module.exports = passwordSchema;
