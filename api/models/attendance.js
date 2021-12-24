const mongoose = require('mongoose');

//Attendance Schema student id and home room
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
