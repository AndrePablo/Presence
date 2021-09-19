const mongoose = require('mongoose');

//Attendance Schema
const attendanceSchema = new mongoose.Schema({
    student_id:{
        type:Number,
        required:true
    },
    home_room:{
        type:String,
        required:true
    },
    absent_dates: [{type: String}]
});

module.exports = new mongoose.model('Attendance', attendanceSchema);