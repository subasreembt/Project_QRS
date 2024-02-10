//ExpressJS Requirments
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();


app.use(cors());
app.use(express.json({ limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10000mb" }));



const config = require("./config/dbDependencies");
const serverConfig = require("./config/serverconfig");
const port = process.env.PORT || serverConfig.ServerPort;


const course = require("./src/routes/course");
const student = require("./src/routes/student");
const studentTraining =require("./src/routes/studentTraining");
const trainingSchedule = require("./src/routes/trainingSchedule");

mongoose
.connect(config.dbURL)
.then(() => {console.log("Connected to MongoDB");})
.catch((err) => {console.error("MongoDB connection error:", err);});




//MiddleWares
app.use(course);
app.use(student);
app.use(studentTraining);
app.use(trainingSchedule);


//Middleware for health check
app.use("/api/v1/health", async (req, res) => {
  try {await mongoose.connection.db.command({ ping: 1 });res.json({status: "Database is healthy",health: "API Server is up & running",});
  } catch (error) {console.error("Database is not healthy:", error);res.status(500).json({ status: "Database is not healthy", error: error.message });}
});



app.listen(port, () => {
  console.log("CONNECT Server is running on http://localhost: " + port);
});



