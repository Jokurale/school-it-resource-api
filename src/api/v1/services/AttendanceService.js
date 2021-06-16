const { prisma } = require("../database");

const { validateAttendance } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateAttendance, "attendance");

const { getAll, getById, update, remove } = factory.getServiceFunctions();

const addAttendance = async (attendace) => {
  const validAttendace = await validateAttendance(attendace);

  // Check if exact same attendance record is present in database
  const {
    data: { date, studentId, hourId },
  } = validAttendace;

  const attendanceRecord = await prisma.attendance.findFirst({
    where: {
      date,
      studentId,
      hourId,
    },
  });

  if (attendanceRecord)
    throw Error(
      "Attendance record for given time and student is already present. Please update existing one if needed."
    );

  // Procced if everything's ok
  const result = await prisma.attendance.create(validAttendace);

  return result;
};

module.exports = {
  getAllAttendances: getAll,
  getAttendanceById: getById,
  addAttendance,
  updateAttendance: update,
  removeAttendance: remove,
};
