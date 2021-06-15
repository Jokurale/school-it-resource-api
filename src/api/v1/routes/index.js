// This files will be used for gathering all new routes-controllers correlations in one place
const express = require("express");

const router = express.Router();

// const Permissions = require("../guards/Permission.guard");
const { TokenMiddleware } = require("../middlewares");

// ** All needed routes
const SpecialRoute = require("./SpecialRoute");
const SubjectRoute = require("./SubjectRoute");
const HomeworkRoute = require("./HomeworkRoute");
const AddressRoute = require("./AddressRoute");
const RoomRoute = require("./RoomRoute");
const MarkRoute = require("./MarkRoute");
const PersonalInfoRoute = require("./PersonalInfoRoute");
const UserRoute = require("./UserRoute");
const StudentRoute = require("./StudentRoute");
const GroupRoute = require("./GroupRoute");
const TeacherRoute = require("./TeacherRoute");
const LessonRoute = require("./LessonRoute");

// ! Route setup
router.use("/auth", SpecialRoute);

// router.use("*", Permissions);
// router.use(TokenMiddleware.TokenInRequest);
// router.use(TokenMiddleware.TokenIsValid);
// router.use(TokenMiddleware.AttachTokenData);

router.use("/subjects", SubjectRoute);
router.use("/homeworks", HomeworkRoute);
router.use("/addresses", AddressRoute);
router.use("/rooms", RoomRoute);
router.use("/marks", MarkRoute);
router.use("/personalinfos", PersonalInfoRoute);
router.use("/users", UserRoute);
router.use("/students", StudentRoute);
router.use("/groups", GroupRoute);
router.use("/teachers", TeacherRoute);
router.use("/lessons", LessonRoute);

module.exports = router;
