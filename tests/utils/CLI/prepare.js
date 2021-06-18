const fs = require("fs");
const chalk = require("chalk");
const faker = require("faker");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  PasswordHelper: { hash },
  DateHelper: { toMySQLDate },
} = require("../../../src/api/v1/helpers");

const {
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
} = require("../MockDataGenerators");

const save = () => {
  const jsonContent = JSON.stringify(mocks, null, 2);

  fs.writeFile("../../mock.json", jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occurred while writing JSON Object to File.");
      return console.log(err);
    }

    log("Mock data has been saved.");

    process.exit();
  });
};

// Handy functions to unify messages colors
const log = (msg) => console.log(chalk.cyan(msg));

const check = chalk.green("✔");
const cross = chalk.red("❌");

const mocks = {};

prepare = async () => {
  log("\n⚡ School-it CLI test-runner");
  log("\nMocking entities...");

  const prepTimeStart = Date.now();

  await Promise.all([
    createStudent(),
    createTeacher(),
    createSubject(),
    createHour(),
    createRoom(),
    createGroups(),
    createLessons(),
  ]);

  // Schedule depends on lessons and group
  await createSchedule();

  const prepTimeStop = Date.now();

  log(
    `Preparation done in ${chalk.bold(
      (prepTimeStop - prepTimeStart) / 1000
    )}s \n`
  );
};

createStudent = async () => {
  const _hash = await hash("P@ssw0rd");
  const _date = toMySQLDate(faker.date.past());
  const login = (
    faker.name.firstName() +
    faker.name.lastName() +
    randomInt(1, 50)
  ).toLowerCase();

  const student = await prisma.user.create({
    data: {
      credential: {
        create: {
          login,
          password: _hash,
        },
      },

      personalInfo: {
        create: {
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          dateOfBirth: _date,
          address: {
            create: {
              ...randomAddress(),
            },
          },
        },
      },
      student: {
        create: {},
      },
    },
    include: {
      student: true,
      personalInfo: {
        include: {
          address: true,
        },
      },
      credential: true,
    },
  });

  mocks.student = student;

  log(`${check} Mock student has been created.`);
};

createHour = async () => {
  const hour = await prisma.hour.create({
    data: {
      from: "23:15",
      to: "00:00",
      no: 20,
    },
  });

  mocks.hour = hour;

  log(`${check} Mock hour has been created.`);
};

createRoom = async () => {
  const room = await prisma.room.create({
    data: {
      number: "100TEST",
      type: "general",
    },
  });

  mocks.room = room;

  log(`${check} Mock room has been created.`);
};

createGroups = async () => {
  const groups = [];

  for (let index = 0; index < 3; index++) {
    const group = await prisma.group.create({
      data: {
        symbol: `10TEST${index + 1}`,
      },
    });

    groups.push(group);
  }

  mocks.groups = groups;

  log(`${check} Mock groups (3) have been created.`);
};

createTeacher = async () => {
  const _hash = await hash("P@ssw0rd");
  const _date = toMySQLDate(faker.date.past());
  const login = (
    faker.name.firstName() +
    faker.name.lastName() +
    randomInt(1, 50)
  ).toLowerCase();

  const teacher = await prisma.user.create({
    data: {
      credential: {
        create: {
          login,
          password: _hash,
        },
      },

      personalInfo: {
        create: {
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          dateOfBirth: _date,
          address: {
            create: {
              ...randomAddress(),
            },
          },
        },
      },
      teacher: {
        create: {},
      },
    },
    include: {
      teacher: true,
      personalInfo: {
        include: {
          address: true,
        },
      },
      credential: true,
    },
  });

  mocks.teacher = teacher;

  log(`${check} Mock teacher has been created.`);
};

createSubject = async () => {
  const subject = await prisma.subject.create({
    data: {
      name: "Subject Test Name",
    },
  });

  mocks.subject = subject;
  log(`${check} Mock subject has been created.`);
};

createLessons = async () => {
  const lessons = [];

  for (let index = 0; index < 5; index++) {
    const lesson = await prisma.lesson.create({
      data: {
        day: randomDayName(),
        subjectId: await randomSubjectId(),
        teacherId: await randomTeacherId(),
        hourId: await randomHourId(),
        roomId: await randomRoomId(),
      },
    });

    lessons.push(lesson);
  }

  mocks.lessons = lessons;
  log(`${check} Mock lessons (${lessons.length}) have been created.`);
};

createSchedule = async () => {
  const schedule = await prisma.schedule.create({
    data: {
      group: {
        connect: { id: mocks.groups[2].id },
      },
    },
  });

  mocks.schedule = schedule;

  log(`${check} Mock schedule has been created.`);
};

prepare().then(() => save());
