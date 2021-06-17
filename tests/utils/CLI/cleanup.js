const fs = require("fs");
const chalk = require("chalk");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Import services to avoid repetitive code sections
const { UserService, SubjectService } = require("../../../src/api/v1/services");

const readFile = () => {
  let mock = JSON.parse(fs.readFileSync("../../mock.json", "utf8"));

  log("Reading mock.json...");

  return mock;
};

const deleteFile = () => {
  log("Removing mock.json...");

  fs.unlinkSync("../../mock.json");
};

// Handy functions to unify messages colors
const log = (msg) => console.log(chalk.cyan(msg));

const check = chalk.green("✔");
const cross = chalk.red("❌");

cleanup = async () => {
  const cleanupTimeStart = Date.now();

  log("Cleaning up...");

  const mock = readFile();

  log("Mock data has been parsed...");

  await Promise.all([
    removeStudent(mock.student.id),
    removeTeacher(mock.teacher.id),
    removeSubject(mock.subject.id),
    removeHour(mock.hour.id),
  ]);

  deleteFile();

  const cleanupTimeStop = Date.now();

  log(
    `Clean up done in ${chalk.bold(
      (cleanupTimeStop - cleanupTimeStart) / 1000
    )}s`
  );
};

const removeStudent = async (id) => {
  try {
    await UserService.removeUser(id);

    log(`${check} Mock student has been removed.`);
  } catch {
    log(`${cross} Mock student removal failed.`);
  }
};

const removeSubject = async (id) => {
  try {
    await SubjectService.removeSubject(id);

    log(`${check} Mock subject has been removed.`);
  } catch {
    log(`${cross} Mock subject removal failed.`);
  }
};

const removeHour = async (id) => {
  try {
    await prisma.hour.delete({
      where: {
        id,
      },
    });

    log(`${check} Mock hour has been removed.`);
  } catch {
    log(`${cross} Mock hour removal failed.`);
  }
};

const removeTeacher = async (id) => {
  try {
    await UserService.removeUser(id);

    log(`${check} Mock teacher has been removed.`);
  } catch (e) {
    log(`${cross} Mock teacher removal failed.`);
  }
};

cleanup().then(() => process.exit());
