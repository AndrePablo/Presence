const express = require('express');
const router = express.Router();
const attendance = require('../models/attendance');

//POST to add attendace entry for student
//Request comes here; can access data from POST through req object
//Save req body information into schema obj then into MongoDB database
router.post('/', (req, res) => {
    attendance_entry = new attendance({
        student_id:req.body.id,
        home_room:req.body.home_room,
        absent_dates:req.body.absences
    });
    attendance_entry.save().then(attendance_entry => {
        res.send(attendance_entry);
    }).catch(error => {
        res.status(500).send("Attendance entry error; not recorded to database");
    });
});

//GET to fetch all attendance records
router.get("/", (req, res) => {
    attendance.find().then((attendance_records) => res.send(attendance_records)).catch((error) => {
        res.status(500).send("Cannot fetch attendance records");
    });
});

//GET to fetch attendance records by student ID
//Find all matching records, send back response message if successful 
//Use async to send promise for route then if data successfully gathered, find matching record 
router.get("/:studentID", async (req, res) => {
    const Attendance = await attendance.find({student_id: req.params.studentID});
    if(!Attendance) res.status(404).send("Attendance record not found");
    res.send(Attendance);
});

//POST to update existing student record; planned for use by Alexa 
router.post("/:studentID", async (req, res) => {
    const updatedRecord = await attendance.findOneAndUpdate({student_id: req.params.studentID},
        {
            student_id: req.body.studentID,
            home_room: req.body.homeroom,
            absent_dates: req.body.absences
        },
        {new: true});
        if(!updatedRecord) res.status(404).send("Attendance record not found");
        res.send(updatedRecord);
});

module.exports = router;