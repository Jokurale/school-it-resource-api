const chalk = require("chalk");

const PrettyError = (res, { code, message }) => {
  res.status(code).json({ error: message });
  return;
};

const UnifyError = (res, err) => {
  // *** Define error source (JOI schema validation, prisma database)
  res.status(err.status || 400);

  console.log(err);

  if (err.hasOwnProperty("message") && !err.hasOwnProperty("meta")) {
    console.log(chalk.redBright("Generic error has been thrown."));
    res.json({ error: err.message });
    return;
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
        message = "Already exists";
        break;

      default:
        message = err.meta.cause;
    }

    console.log(chalk.redBright("Prisma database error has been thrown."));

    res.json({ error: message });

    return;
  }

  // JOI schema
  if (err.hasOwnProperty("details")) {
    console.log(chalk.redBright("JOI schema error has been thrown."));
    res.json({ error: err.details.message });
    return;
  }

  res.json({ error: err });
  return;
};

module.exports = {
  PrettyError,
  UnifyError,
};
