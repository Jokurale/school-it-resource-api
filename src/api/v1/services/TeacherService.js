const { prisma } = require("../database");

const getAllTeachers = async () => {
  const teachers = await prisma.teacher.findMany({});

  return teachers;
};

const getTeacherById = async (teacherId) => {
  const teacher = await prisma.teacher.findFirst({
    where: {
      id: teacherId,
    },
  });

  return teacher;
};

const getHomeworks = async (teacherId) => {
  const homeworks = await prisma.teacher.findFirst({
    where: {
      id: teacherId,
    },
    select: {
      homework: true,
    },
  });

  return homeworks;
};

const getMarks = async (teacherId) => {
  const marks = await prisma.teacher.findFirst({
    where: {
      id: teacherId,
    },
    select: {
      mark: true,
    },
  });

  return marks;
};

const getPersonalInfo = async (teacherId) => {
  const personalInfo = await prisma.teacher.findFirst({
    where: {
      id: teacherId,
    },
    select: {
      user: {
        select: {
          personalInfo: true,
        },
      },
    },
  });

  return personalInfo;
};

const getAddresses = async (teacherId) => {
  const addresses = await prisma.teacher.findFirst({
    where: {
      id: teacherId,
    },
    select: {
      user: {
        select: {
          personalInfo: {
            select: {
              address: true,
            },
          },
        },
      },
    },
  });

  return addresses;
};

module.exports = {
  getHomeworks,
  getMarks,
  getAllTeachers,
  getTeacherById,
  getPersonalInfo,
  getAddresses,
};
