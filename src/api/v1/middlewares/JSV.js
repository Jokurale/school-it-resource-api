// *** Middleware ensures that invalid JSON requst won't crash whole app
const {
  errors: { JSON_INVALID },
} = require("../config");

const {
  ErrorHelper: { PrettyError },
} = require("../helpers");

module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("[JSON Failsafe] Invalid JSON recieved.");
    return PrettyError(res, JSON_INVALID);
  }

  next();
};
