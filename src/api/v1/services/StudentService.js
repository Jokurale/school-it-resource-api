const { prisma } = require("../database");

const { validateGroup } = require("../validators");

const { IDMapperHelper } = require("../helpers");

const getAllStudents = async () => {
  const students = await prisma.student.findMany({});

  return students;
};

const getStudentById = async (studentId) => {
  const student = await prisma.student.findFirst({
    where: {
      id: studentId,
    },
  });

  return student;
};

const getHomeworks = async (studentId) => {
  const homeworks = await prisma.student.findFirst({
    where: {
      id: studentId,
    },
    select: {
      homework: true,
    },
  });

  return homeworks;
};

const getMarks = async (studentId) => {
  const marks = await prisma.student.findFirst({
    where: {
      id: studentId,
    },
    select: {
      mark: true,
    },
  });

  return marks;
};

const getPersonalInfo = async (studentId) => {
  const personalInfo = await prisma.student.findFirst({
    where: {
      id: studentId,
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

const getAddresses = async (studentId) => {
  const addresses = await prisma.student.findFirst({
    where: {
      id: studentId,
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

const getGroup = async (studentId) => {
  const group = await prisma.student.findFirst({
    where: {
      id: studentId,
    },
    select: {
      group: true,
    },
  });

  return group;
};

const getAttendance = async (studentId) => {
  const attendance = await prisma.student.findFirst({
    where: {
      id: studentId,
    },
    include: {
      attendance: true,
    },
  });

  return attendance;
};

const assignToGroup = async (studentId, groupId) => {
  const result = await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      group: {
        connect: {
          id: groupId,
        },
      },
    },
  });

  return result;
};

const removeFromGroup = async (studentId, groupId) => {
  const result = await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      group: {
        disconnect: {
          id: groupId,
        },
      },
    },
  });

  return result;
};

module.exports = {
  getHomeworks,
  getMarks,
  getAllStudents,
  getStudentById,
  getPersonalInfo,
  getAddresses,
  getGroup,
  assignToGroup,
  removeFromGroup,
  getAttendance,
};
