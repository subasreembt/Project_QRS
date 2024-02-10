const express = require("express");
const app = express.Router();
const course = require("../controller/course"); 

app.get("/courses",course.getAllCourses);
app.get("/course/:uid",course.getCourseById);

app.post("/course",course.createCourse);
app.put("/course/:uid",course.updateCourse);
app.delete("/course/:uid",course.deleteCourse);



module.exports = app;
