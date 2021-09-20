# Welcome to Using Presence
![alt text](https://github.com/Ashwins9001/Presence-App/blob/main/img/front-end.PNG)
Are you running late to work while waiting to call your kid in sick to school? With Presence you can mark your child's absence easily and hands-free! Presence is an Amazon Alexa application that uses a voice-activated system to record your child's sick days. Never be late or annoyed again with Presence. 

For school administration staff, Presence offers an automated solution to recording absences that minimizes school resources by streamlining the attendance process. We all know how important it is to make sure every child is safe and missing school for a good reason. But we also know how great it feels to have less work to do. School staff can relax, sit back and let Presence handle the busy work.

<p align="center">
  <img src="https://github.com/Ashwins9001/Presence-App/blob/main/img/parent-kid.png" width="280" />
  <img src="https://github.com/Ashwins9001/Presence-App/blob/main/img/school.jpg" width="350" /> 
</p>


# Application Overview
Presence uses a heroku-deployed API and MongoDB Atlas Cluster to create a mock student records system. Changes are made to the student records system through the Alexa Skills Develpoment Kit (SDK). The Alexa SDK is configured by VoiceFlow for easier development and involves retrieving student information from voice commands to execute HTTP POST requests to update the database. 

The API is built using Express and Node, and the front-end displayed to school administrators is created with React.

![alt text](https://github.com/Ashwins9001/Presence-App/blob/main/img/VF-process.PNG)
Shown above is the VoiceFlow configuration


![alt text](https://github.com/Ashwins9001/Presence-App/blob/main/img/Alexa-workflow.PNG)
Shown above is a demonstration on the Alexa SDK test suite. If an Alexa-powered device such as an Amazon Echo is available, the application can run on that as well. 

## Security
Credentials used to access back-end MongoDB cluster stored as configuration variables in Heroku deployment settings to ensure access to cluster limited to administrators only. JSON Web-Token (JWT) login authorization added to ensure users (school administration staff) do not have to re-login upon subsequent page access for convenience.

# API Overview

API deployed on Heroku, used to access and modify student attendance records in MongoDB Atlas cluster. Part of Presence application made for Hack the North 2021. API deployed at: https://attendance-api-22222.herokuapp.com/

## Data Format
Each student attendance record of the form:
- student_id: Unique student ID
- home_room: Student's home room teacher
- absent_dates: String array of absent days for student 

## Routes
GET https://attendance-api-22222.herokuapp.com/api/attendance/
- Return all student attendance records.

GET https://attendance-api-22222.herokuapp.com/api/attendance/{student-id}
- Return attendance records for student with {student-id}

POST https://attendance-api-22222.herokuapp.com/api/attendance/
- Create new student entry in database

POST https://attendance-api-22222.herokuapp.com/api/attendance/{student-id}
- Modify existing student entry with {student-id} 
