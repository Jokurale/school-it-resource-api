const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ash = require("express-async-handler");

const userPreparator = require("../preparators/User.preparator");

// ~> All users
module.exports.getAllStudents = ash(async (req, res) => {
  const users = await prisma.student.findMany();
  res.json(users);

  await prisma.$disconnect();
});

// ~> Student by ID
module.exports.getStudentById = ash(async (req, res) => {
  let { id } = req.params;

  const user = await prisma.student.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      user: {
        select: {
          personalInfo: {
            select: {
              dateOfBirth: true,
              email: true,
              firstname: true,
              lastname: true,
              middlename: true,
              id: true,
              address: true,
            },
          },
        },
      },
      homework: {
        select: {
          id: true,
          createdAt: true,
          deadline: true,
          description: true,
          teacher: {
            select: {
              user: {
                select: {
                  personalInfo: {
                    select: {
                      firstname: true,
                      lastname: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      group: {
        select: {
          symbol: true,
        },
      },
      mark: {
        select: {
          id: true,
          createdAt: true,
          description: true,
          mark: true,
          weight: true,
          teacher: {
            select: {
              user: {
                select: {
                  personalInfo: {
                    select: {
                      firstname: true,
                      lastname: true,
                    },
                  },
                },
              },
            },
          },
          subject: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  res.json(user);
  await prisma.$disconnect();
});

// ~> Add student
module.exports.addStudent = ash(async (req, res) => {
  const preparedUser = await userPreparator(req.body);

  // Insert new user to database
  const result = await prisma.user.create(preparedUser);

  // No errors have been thrown, proceed with response
  res.status(201).json(result);

  await prisma.$disconnect();
});

// ~> Update student
module.exports.updateStudent = ash(async (req, res) => {
  // TODO: Student update will be handle via distributed path handlers

  // const { id } = req.params;

  // const preparedUser = await userPreparator(req.body, "update");

  // console.log(preparedUser);

  // // // Insert new user to database
  // // const result = await prisma.user.update({
  // //   where: {
  // //     id,
  // //   },
  // //   ...preparedUser,
  // // });

  // // No errors have been thrown, proceed with response
  // res.status(200).json({ress: "XD"});

  await prisma.$disconnect();
});
