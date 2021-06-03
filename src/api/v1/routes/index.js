// This files will be used for gathering all new routes-controllers correlations in one place
const express = require("express");

const router = express.Router();

// const Permissions = require("../guards/Permission.guard");

// ** All needed routes
const SpecialRoute = require("./SpecialRoute");
const SubjectRoute = require("./SubjectRoute");
const HomeworkRoute = require("./HomeworkRoute");
const AddressRoute = require("./AddressRoute");
const RoomRoute = require("./RoomRoute");

// ! Route setup
router.use("/auth", SpecialRoute);

// router.use("*", Permissions);

router.use("/subjects", SubjectRoute);
router.use("/homeworks", HomeworkRoute);
router.use("/addresses", AddressRoute);
router.use("/rooms", RoomRoute);

module.exports = router;
