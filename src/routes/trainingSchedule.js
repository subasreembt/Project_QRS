const express = require("express");
const app = express.Router();
const TrainingSchedule = require("../controller/trainingSchedule");

 
app.get("/trainingSchedules", TrainingSchedule.getTrainingSchedule);
app.post("/trainSchedule", TrainingSchedule.createTrainingSchedule);
app.put("/trainingSchedule/:uid", TrainingSchedule.updateTrainingschedule);
app.delete("/trainingSchedule/:uid", TrainingSchedule.deleteTrainingSchedule);
 
 
module.exports = app;



