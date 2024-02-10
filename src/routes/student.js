const express = require("express");
const app = express.Router();
const student = require("../controller/student");



 
app.get("/students", student.getstudent);
app.post("/student", student.createstudent);
app.put("/student/:uid", student.updatestudent);
app.delete("/student/:uid", student.deletestudent);
 
 
module.exports = app;