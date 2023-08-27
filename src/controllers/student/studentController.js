const AttendanceRecord = require("../../models/AttendanceRecord");
const ClassAllotment = require("../../models/ClassAllotment");

const getStudentAttendance = async (req, res) => {
  const allotments = await ClassAllotment.find({ class: req.user.class }).populate('course');
  // const attendanceRecords = await AttendanceRecord.find({allotment: allotments[0].})
  const responseData = [];
  for (let allotment of allotments) {
    const heldCount = await AttendanceRecord.find({ allotment: allotment._id }).count();
    const attendedCount = await AttendanceRecord.find({ allotment: allotment._id, attendanceStatus: { $elemMatch: { student: req.user._id, isPresent: true } } }).count();
    responseData.push({
      allotment: allotment._id,
      course: allotment.course.courseName,
      held: heldCount,
      attended: attendedCount
    });
  }
  res.send({ msg: "Attendance will be fetched", data: responseData });
}

module.exports = { getStudentAttendance }