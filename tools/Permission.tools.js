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
