const express = require('express');
const router = express.Router();
const emptyReqBodyValidator = require('../middlewares/emptyReqBodyValidator');
const { studentAuthMiddleware } = require('../middlewares/auth');
const { studentLogin, testController } = require('../controllers/faculty/authController');
const { getStudentAttendance } = require('../controllers/student/studentController');

router.route('/login').post(emptyReqBodyValidator, studentLogin);
router.route('/test').get(studentAuthMiddleware, testController);

router.route('/attendance').get(studentAuthMiddleware, getStudentAttendance);

module.exports = router;