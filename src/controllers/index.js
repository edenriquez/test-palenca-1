const constants = require("../constants");
const jwt = require("jsonwebtoken");
const { emailValidation, passValidation } = require("./validations");
console.log("🚀 ~ file: index.js ~ line 4 ~ emailValidation", emailValidation);

const hello = async (req, res, next) => {
  res.send(constants.responses.hello);
};

const uber = {
  /**
   * email validation is executed in /login route level
   * emailValidation ->
   *                    is email valid ?
   *                                     (NO)  -> response 401
   *                                     (YES) -> login  -> response 200
   */
  emailValidation: async (req, res, next) => {
    const isValidEmail = await emailValidation.validateAsync(req.body.email);
    const isValidPass = await passValidation.validateAsync(req.body.password);
    console.log(
      "🚀 ~ file: index.js ~ line 20 ~ emailValidation: ~ isValidPass",
      isValidPass
    );
    if (isValidPass || isValidEmail) {
      res.status(401).json({
        message: constants.responses.errors.invalid,
        details: constants.responses.errors.details,
      });
      return;
    }
    if (req.body.email !== process.env.EMAIL) {
      res.status(401).json({
        message: constants.responses.errors.invalid,
        details: constants.responses.errors.details,
      });
      return;
    }
    next();
  },
  /**
   * response is as follows:
   * email: (taken from environment variables)
   * password: (taken from environment variables)
   * platform: (adding to jwt token platform information, this is a mock)
   * profile: (adding to jwt token profile information, this is a mock )
   */
  login: async (req, res, next) => {
    const token = jwt.sign(
      {
        email: process.env.EMAIL,
        password: process.env.PASS,
        platform: constants.mockData.platform,
        profile: constants.mockData.profile,
      },
      process.env.TOKEN_SECRET
    );

    //  Add token to header if frontend client uses this way
    res.header("auth-token", token).json({
      message: constants.responses.success,
      access_token: token,
    });
  },
  /**
   * Uses sync verify function to validate both error while decoding token and
   * decoded success value
   */
  profile: async (req, res, next) => {
    jwt.verify(
      req.params.access_token,
      process.env.TOKEN_SECRET,
      (errorDecoding, decodedSuccess) => {
        if (errorDecoding) {
          res.status(401).json({
            message: constants.responses.errors.invalid,
            details: constants.responses.errors.details,
          });
        }
        if (decodedSuccess) {
          res.json({
            message: constants.responses.success,
            platform: decodedSuccess.platform,
            profile: decodedSuccess.profile,
          });
        }
      }
    );
  },
};

module.exports = {
  hello,
  uber,
};
