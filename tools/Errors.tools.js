const chalk = require("chalk");

module.exports.PrettyError = (res, { code, message }) => {
  res.status(code).json({ error: message });
  return;
};

module.exports.UnifyError = (res, err) => {
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
    if (err.code === "P2003")
      res.json({
        error: "Invalid relation field's value, foregin keys must exist.",
      });
    console.log(chalk.redBright("Prisma database error has been thrown."));
    res.json({ error: err.meta.cause });
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
