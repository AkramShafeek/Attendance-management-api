const express = require('express');
const router = express.Router();
const emptyReqBodyValidator = require('../middlewares/emptyReqBodyValidator');
const { facultyAuthMiddleware } = require('../middlewares/auth');
const { facultyLogin, testController } = require('../controllers/faculty/authController');
const { getClassAllotments, getTodayClasses, getStudentsFromClass } = require('../controllers/faculty/facultyController');
const { submitAttendance, getAttendance, editAttendance } = require('../controllers/faculty/attendanceController');

router.route('/login').post(emptyReqBodyValidator, facultyLogin);
router.route('/test').get(facultyAuthMiddleware, testController);

router.route('/classallotments').get(facultyAuthMiddleware, getClassAllotments);
router.route('/todayclasses').get(facultyAuthMiddleware, getTodayClasses);
router.route('/getstudentsfromclass/:class').get(facultyAuthMiddleware, getStudentsFromClass);

router.route('/submitattendance').post(facultyAuthMiddleware, submitAttendance);
router.route('/getattendance').get(facultyAuthMiddleware, getAttendance);
router.route('/editattendance').put(facultyAuthMiddleware, editAttendance);

module.exports = router;