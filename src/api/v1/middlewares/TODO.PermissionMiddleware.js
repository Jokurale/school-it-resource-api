// *** Request interceptor
/*
 *   This middleware will intercept each request, fetch potential auth token if needed
 */

const ash = require("express-async-handler");

const { verify } = require("../tools/Token.tools");
const {
  generateRestrictions,
  isPermitted,
} = require("../tools/Permission.tools");

const { PrettyError } = require("../tools/Errors.tools");
const {
  TOKEN_MISSING,
  TOKEN_INVALID,
  INSUFFICIENT_PERMISSIONS,
} = require("../tools/Error.messages");

module.exports = ash(async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // *** Token hasn't been supplied
  if (!token) return PrettyError(res, TOKEN_MISSING);

  const result = verify(token);

  // *** Token is expired or invalid
  if (!result) return PrettyError(res, TOKEN_INVALID);

  const { login, role, id } = result.payload;

  // *** Assign payload values for potential further use
  req.id = id;
  req.login = login;
  req.role = role;

  // *** Setup path(s) for which user is permitted to request
  const restrictions = await generateRestrictions(role, id);

  // *** Proceed when everything is fine or throw an error
  if (isPermitted(req, restrictions)) next();
  else return PrettyError(res, INSUFFICIENT_PERMISSIONS);
});

const { userIdtoStudentId } = require("./ID.mapper.tools");

module.exports.generateRestrictions = async (rank, userId) => {
  // *** Nullish/false restrictions means user hasn't been restricted in anyway.

  const id = await userIdtoStudentId(userId);

  let restrictions = {
    isRestricted: true,
  };

  if (rank === "administrator") {
    restrictions = {
      isRestricted: false,
    };
  }

  // ~> Student Restrictions
  if (rank === "student") {
    restrictions = {
      // Inherit default restrictions
      ...restrictions,
      paths: [
        {
          path: `/students/${id}`,
          methods: ["GET"],
        },
        // ? Example usage
        // {
        //   path: `/users`,
        //   methods: ["GET"],
        // },
      ],
    };
  }
  return restrictions;
};

module.exports.isPermitted = (req, restrictions) => {
  const { isRestricted, paths } = restrictions;

  // *** Proceed if no restrictions were issued
  if (!isRestricted) return true;

  const requestedPath = req.originalUrl;
  const requestedMethod = req.method;

  // *** Setup global return result
  let result = false;

  // *** Break exception for foreach purposes (prevent looping through all paths even after matching)
  const Break = {};
  try {
    paths.forEach((pathset) => {
      const { path, methods } = pathset;

      if (methods.includes(requestedMethod) && requestedPath === path) {
        result = true;
        throw Break;
      }
    });
  } catch {}

  // *** Return restrictions check result
  return result;
};
