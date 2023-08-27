const AttendanceRecord = require("../../models/AttendanceRecord");
const Class = require("../../models/Class");
const Course = require("../../models/Course");
const Dept = require("../../models/Department");
const Student = require("../../models/Student");

const submitAttendance = async (req, res) => {
  console.log(req.body);
  // if attendance for the current date is already present throw error
  if(req.body.attendanceStatus.length === 0)
    throw new Error("No students in the attendance");
    
  let startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  let endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const existingAttendance = await AttendanceRecord.findOne({
    createdAt: {
      $gte: startOfToday,
      $lte: endOfToday
    },
    period: req.body.period,
    allotment: req.body.allotment
  });
  if (existingAttendance)
    throw new Error("Attendance already exists for the day");
  
  // store it in attendance records collection
  const attendanceRecord = await AttendanceRecord.create(req.body);

  res.status(200).send("Submitted successfully");
}

const getAttendance = async (req, res) => {
  const attendanceStatus = await AttendanceRecord.findOne()
    .populate('allotment');

  await Class.populate(attendanceStatus, { path: 'allotment.class' });
  await Course.populate(attendanceStatus, { path: 'allotment.course' });
  await Dept.populate(attendanceStatus, { path: 'allotment.class.dept' });
  await Student.populate(attendanceStatus, { path: 'attendanceStatus.student', select: '-password' });
  res.status(200).send(attendanceStatus);
}

const editAttendance = async (req, res) => {
  res.status(200).send("Attendance will be edited wait");
}


module.exports = { submitAttendance, getAttendance, editAttendance };