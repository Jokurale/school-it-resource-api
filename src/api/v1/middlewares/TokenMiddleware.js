const {
  ErrorHelper: { UnifyError },
  TokenHelper: { verify },
} = require("../helpers");
const { TOKEN_MISSING } = require("../../../config/errors");

class TokenMiddleware {
  // Ensures request contains access token
  static TokenInRequest = (req, res, next) => {
    if ("authorization" in req.headers) {
      req.token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      return next();
    } else {
      return UnifyError(res, TOKEN_MISSING);
    }
  };

  // Validates token within auth header
  static TokenIsValid = (req, res, next) => {
    const token = req?.token;

    if (token) {
      const result = verify(token);

      if (result) {
        req.result = result;

        return next();
      }
    }
  };

  static AttachTokenData = (req, res, next) => {
    const { payload } = req.result;

    req.user = { ...payload };

    console.log("Attached: ", req.user);

    return next();
  };
}

module.exports = TokenMiddleware;
