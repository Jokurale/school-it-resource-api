const addressSchema = require("../schemas/Address.schema");
const credentialSchema = require("../schemas/Credential.schema");
const {
  createSchema: createPersonalInfoSchema,
  updateSchema: updatePersonalInfoSchema,
} = require("../schemas/PersonalInfo.schema");
const {
  createSchema: createUserSchema,
  updateSchema: updateUserSchema,
} = require("../schemas/User.schema");

const { toMySQLDate } = require("../tools/Date.tools");
const { hash } = require("../tools/Password.tools");

const userPreparator = async (user, mode = "create", role = "student") => {
  const VALID_ROLES = [null, "student", "teacher"];
  const VALID_MODES = ["create", "update"];

  if (!VALID_ROLES.includes(role))
    throw TypeError(
      "Invalid role supplied to preparator. Provide NULL to preparate data with no role."
    );

  if (!VALID_MODES.includes(mode))
    throw TypeError(
      `Invalid mode supplied to preparator. Expected 'create' or 'update', '${mode}' given.`
    );

  // Validate incoming data from controller

  if (mode == "create") {
    // Begin valdation
    let valid = {
      credential: null,
      personalInfo: null,
      addresses: [],
    };

    await createUserSchema.validateAsync(user);

    const { credential, personalInfo, address } = user;

    valid.credential = await credentialSchema.validateAsync(credential);
    valid.personalInfo = await createPersonalInfoSchema.validateAsync(
      personalInfo
    );

    for (const singleAddress of address) {
      valid.addresses.push(await addressSchema.validateAsync(singleAddress));
    }
    // End of validation

    // Hash password
    valid.credential = {
      ...valid.credential,
      password: await hash(valid.credential.password),
    };

    // Pretype personalInfo
    valid.personalInfo = {
      ...valid.personalInfo,
      dateOfBirth: toMySQLDate(valid.personalInfo.dateOfBirth),
      address: {
        create: valid.addresses,
      },
    };

    // Prepare Prisma-ready object
    const databaseReadyUser = {
      data: {
        credential: {
          create: {
            ...valid.credential,
          },
        },

        personalInfo: {
          create: {
            ...valid.personalInfo,
          },
        },
      },
    };

    if (role) databaseReadyUser.data[role] = { create: {} };

    return databaseReadyUser;
  } else {
    // Begin valdation
    let valid = {
      personalInfo: {},
      addresses: [],
    };

    await updateUserSchema.validateAsync(user);

    const { personalInfo, address } = user;

    if (personalInfo)
      valid.personalInfo = await createPersonalInfoSchema.validateAsync(
        personalInfo
      );

    if (address)
      for (const singleAddress of address) {
        valid.addresses.push(await addressSchema.validateAsync(singleAddress));
      }
    // End of validation

    let dateOfBirth =
      valid.personalInfo.dateOfBirth &&
      toMySQLDate(valid.personalInfo.dateOfBirth);

    // Pretype personalInfo
    valid.personalInfo = {
      ...valid.personalInfo,
      ...dateOfBirth,
      address: {
        data: valid.addresses,
      },
    };

    // Prepare Prisma-ready object
    const databaseReadyUser = {
      data: {
        personalInfo: {
          data: {
            ...valid.personalInfo,
          },
        },
      },
    };

    return databaseReadyUser;
  }
};

module.exports = userPreparator;
