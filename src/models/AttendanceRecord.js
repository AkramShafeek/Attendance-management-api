const mongoose = require('mongoose');
const AttendanceStatus = require('./AttendanceStatus');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const Class = require('../models/Class');
const Course = require('../models/Course');
const attendanceStatusSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    isPresent: {
        type: Boolean,
        required: true,
        default: true
    }
})
const attendanceRecordSchema = mongoose.Schema({
    allotment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classAllotments',
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    attendanceStatus: [attendanceStatusSchema],

}, { timestamps: true });

attendanceRecordSchema.pre('deleteOne', async function (next) {
    const referenceError = 'Attendance record is referenced and cannot be deleted';
    const doc = AttendanceRecord.findOne(this.getFilter());

    if (!doc)
        throw new Error("Dept doesn't exist");

    const exitstingStatus = await AttendanceStatus.findOne({ attendanceRecord: doc._id });
    if (exitstingStatus)
        throw new Error(referenceError);

})

// attendanceRecordSchema.pre('save', async function (next) {
//     if (!this.isModified)
//         return next();

//     // validate faculty existence
//     const existingFaculty = await Faculty.findById({ _id: this.faculty });
//     if (!existingFaculty)
//         throw new Error("Given Faculty doesn't exist for this attendance record");

//     // validate student existence
//     const existingStudent = await Student.findOne({ _id: this.student });
//     if (!existingStudent)
//         throw new Error("Given Student doesn't exist for this attendance record");


//     // validate course existence
//     const existingCourse = await Course.findOne({ _id: this.course });
//     if (!existingCourse)
//         throw new Error("Given Course doesn't exist for this attendance record");

//     // validate class existence
//     const existingClass = await Class.findOne({ _id: this.class });
//     if (!existingClass)
//         throw new Error("Given Class doesn't exist for this attendance record");

// })

const AttendanceRecord = mongoose.model('attendancerecords', attendanceRecordSchema);

module.exports = AttendanceRecord;