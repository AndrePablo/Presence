const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const attendances_route = require('./routes/attendance');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use('/api/attendance', attendances_route);

//Connect to MongoDB Atlas Server
//Hide database user information in environment variable for security
mongoose.connect(process.env.MONGO_URL,
{useNewUrlParser:true}).then(()=>{
    console.log('Connected to database');
}).catch(error => {
    console.log("Database connection failed", error);
})

app.listen(PORT, ()=> {
    console.log("Server started at port", PORT);
});

