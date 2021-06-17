const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const faker = require("faker");

const randomAddress = () => ({
  address1: faker.address.streetAddress(),
  city: faker.address.city(),
  country: faker.address.country(),
  state: faker.address.state(),
  postalCode: faker.address.zipCode(),
});

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const randomStudentId = async () => {
  const students = await prisma.student.findMany({
    select: {
      id: true,
    },
  });

  const student = students[Math.floor(Math.random() * students.length)];

  return student.id;
};

const randomTeacherId = async () => {
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
    },
  });

  const teacher = teachers[Math.floor(Math.random() * teachers.length)];

  return teacher.id;
};

const randomSubjectId = async () => {
  const subjects = await prisma.subject.findMany({
    select: {
      id: true,
    },
  });

  const subject = subjects[Math.floor(Math.random() * subjects.length)];

  return subject.id;
};

const randomGroupId = async () => {
  const groups = await prisma.group.findMany({
    select: {
      id: true,
    },
  });

  const group = groups[Math.floor(Math.random() * groups.length)];

  return group.id;
};

const randomRoomId = async () => {
  const rooms = await prisma.room.findMany({
    select: {
      id: true,
    },
  });

  const room = rooms[Math.floor(Math.random() * rooms.length)];

  return room.id;
};

const randomHourId = async () => {
  const hours = await prisma.hour.findMany({
    select: {
      id: true,
    },
  });

  const hour = hours[Math.floor(Math.random() * hours.length)];

  return hour.id;
};

const randomDayName = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const day = days[Math.floor(Math.random() * days.length)];

  return day;
};

const randomLessonId = async () => {
  const lessons = await prisma.lesson.findMany({
    select: {
      id: true,
    },
  });

  const lesson = lessons[Math.floor(Math.random() * lessons.length)];

  return lesson.id;
};

module.exports = {
  randomAddress,
  randomInt,
  randomStudentId,
  randomSubjectId,
  randomTeacherId,
  randomRoomId,
  randomGroupId,
  randomHourId,
  randomDayName,
  randomLessonId,
};
