// This files will be used for gathering all new routes-controllers correlations in one place
const express = require("express");

const router = express.Router();

// const PermissionGuard = require("../guards/PermissionGuard");

// ** All needed routes
const StudentRoute = require("../routes/Student.route");
const SpecialRoute = require("../routes/Special.route");
const SubjectRoute = require("../routes/Subject.route");
const HomeworkRoute = require("../routes/Homework.route");
const AddressRoute = require("../routes/Address.route");
const RoomRoute = require("../routes/Room.route");

// ! Route setup
router.use("/auth", SpecialRoute);
router.use("/subjects", SubjectRoute);
router.use("/students", StudentRoute);
router.use("/homeworks", HomeworkRoute);
router.use("/addresses", AddressRoute);
router.use("/rooms", RoomRoute);

module.exports = router;
