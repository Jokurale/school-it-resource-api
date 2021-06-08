const chalk = require("chalk");

const PrettyError = (res, { code, message }) => {
  res.status(code).json({ error: message });
  return;
};

require("dotenv").config();

const consoleOutput = process.env.NODE_ENV !== "testing";

const UnifyError = (res, err) => {
  // *** Define error source (JOI schema validation, prisma database)
  res.status(err.status || 400);

  if (consoleOutput) console.log(err);

  if (err.hasOwnProperty("message") && !err.hasOwnProperty("meta")) {
    if (consoleOutput)
      console.log(chalk.redBright("Generic error has been thrown."));

    return res.json({ error: err.message });
  }

  // Prisma database
  if (err.hasOwnProperty("meta")) {
    let message;

    // Handle various database errors
    switch (err.code) {
      case "P2003":
        message = "Invalid relation field's value, foregin keys must exist.";
        break;
      case "P2002":
        message = "Already exists.";
        break;

      case "P2014":
        message = "Action would violate table's relations.";
        break;

      default:
        message = err.meta.cause;
    }

    if (consoleOutput)
      console.log(chalk.redBright("Prisma database error has been thrown."));

    return res.json({ error: message });
  }

  // JOI schema
  if (err.hasOwnProperty("details")) {
    if (consoleOutput)
      console.log(chalk.redBright("JOI schema error has been thrown."));

    return res.json({ error: err.details.message });
  }

  return res.json({ error: err });
};

module.exports = {
  PrettyError,
  UnifyError,
};
