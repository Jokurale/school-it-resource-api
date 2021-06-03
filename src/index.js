// *** Bolier-plate code
const express = require("express");
const app = express();
const cors = require("cors");

const {
  ErrorHelper: { UnifyError },
} = require("./api/v1/helpers");

const { JSV } = require("./api/v1/middlewares");
const routes = require("./api/v1/routes");

// *** .ENV
require("dotenv").config();

// *** CORS
app.options(cors());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
  })
);

// *** Addons
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("body-parser").json());
if (process.env.NODE_ENV !== "testing") app.use(require("morgan")("dev"));
app.use(require("helmet")());

// *** Invalid JSON prevention
app.use(JSV);

// *** Routes
app.use(routes);

// *** 404
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// *** Sync/Async error resolver
app.use((error, req, res, next) => {
  return UnifyError(res, error);
});

// *** App Starter
app.listen(process.env.DEV_PORT || 5000, () => {
  if (process.env.NODE_ENV !== "testing")
    console.log(
      `[API] School managment API is up and running on port ${
        process.env.DEV_PORT || 5000
      }.`
    );
});

// App purposes
module.exports = app;
