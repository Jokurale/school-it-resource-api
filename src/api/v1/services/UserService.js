const { prisma } = require("../database");

const {
  DateHelper: { toMySQLDate },
} = require("../helpers");

const {
  constants: { PROTECTED_ROLES },
} = require("../config");

const {
  PasswordHelper: { hash },
} = require("../helpers");

const { validateUser } = require("../validators");

// One-time helper function
const extractIds = (arr) => arr.map((obj) => obj.id);

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      personalInfo: {
        include: {
          address: true,
        },
      },
      credential: {
        select: {
          login: true,
          role: true,
        },
      },
      student: {
        include: {
          homework: true,
          mark: true,
          group: true,
        },
      },
      teacher: true,
    },
  });

  return users;
};

const getUserById = async (id) => {
  const user = await prisma.user.findMany({
    where: {
      id,
    },
    include: {
      personalInfo: {
        include: {
          address: true,
        },
      },
      credential: {
        select: {
          login: true,
          role: true,
        },
      },
      student: {
        include: {
          homework: true,
          mark: true,
          group: true,
        },
      },
      teacher: true,
    },
  });

  return user;
};

const addUser = async (user) => {
  const validUserData = await validateUser(user);

  const { personalInfo, credential, address } = validUserData;

  const hashedPassword = await hash(credential.password);
  const sqlDateOfBirth = toMySQLDate(personalInfo.dateOfBirth);

  const databaseReadyUser = {
    data: {
      credential: {
        create: {
          ...credential,
          password: hashedPassword,
        },
      },
      personalInfo: {
        create: {
          ...personalInfo,
          dateOfBirth: sqlDateOfBirth,
          address: {
            create: address,
          },
        },
      },
    },
  };

  if (credential.role === "student")
    databaseReadyUser.data.student = { create: {} };

  if (credential.role === "teacher")
    databaseReadyUser.data.teacher = { create: {} };

  const result = await prisma.user.create(databaseReadyUser);

  return result;
};

const removeUser = async (id) => {
  // Prevent from removal one of protected roles
  const orFilter = PROTECTED_ROLES.map((role) => ({
    credential: {
      role: {
        equals: role,
      },
    },
  }));

  const users = await prisma.user.findMany({
    where: {
      OR: orFilter,
    },
    select: {
      id: true,
    },
  });

  const protected_ids = users.map((user) => user.id);

  if (protected_ids.some((protected_ids) => protected_ids === id))
    throw Error("Unable to remove proteced user.");

  const cleanUpOps = [];

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      personalInfo: {
        include: {
          address: true,
        },
      },
      credential: true,
      student: {
        include: {
          homework: true,
          mark: true,
          group: true,
        },
      },
      teacher: true,
    },
  });

  // If no user was found, return default query result aka []
  if (!user) throw Error("User with given ID does not exists.");

  //Extract entity's id's to remove
  const { id: cid } = user.credential;
  const { id: pid } = user.personalInfo;

  const aids = extractIds(user.personalInfo.address);

  aids.forEach((aid) =>
    cleanUpOps.push(
      prisma.address.delete({
        where: {
          id: aid,
        },
      })
    )
  );

  cleanUpOps.push(
    prisma.personalInfo.delete({
      where: {
        id: pid,
      },
    })
  );

  cleanUpOps.push(
    prisma.credential.delete({
      where: {
        id: cid,
      },
    })
  );

  if (user.student) {
    const { id: sid } = user.student;

    const { homework, mark } = user.student;

    const hids = extractIds(homework);
    const mids = extractIds(mark);

    hids.forEach((hid) =>
      cleanUpOps.push(
        prisma.homework.delete({
          where: {
            id: hid,
          },
        })
      )
    );

    mids.forEach((mid) =>
      cleanUpOps.push(
        prisma.mark.delete({
          where: {
            id: mid,
          },
        })
      )
    );

    cleanUpOps.push(
      prisma.student.delete({
        where: {
          id: sid,
        },
      })
    );
  }

  if (user.teacher) {
    const { id: tid } = user.teacher;

    cleanUpOps.push(
      prisma.teacher.delete({
        where: {
          id: tid,
        },
      })
    );
  }

  cleanUpOps.push(
    prisma.user.delete({
      where: {
        id,
      },
    })
  );

  const transactionResults = await prisma.$transaction(cleanUpOps);

  return transactionResults;
};

const getPersonalInfo = async (userId) => {
  const personalInfo = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      personalInfo: true,
    },
  });

  return personalInfo;
};

const getAddresses = async (userId) => {
  const addresses = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      personalInfo: {
        select: {
          address: true,
        },
      },
    },
  });

  return addresses;
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  removeUser,
  getAddresses,
  getPersonalInfo,
};
