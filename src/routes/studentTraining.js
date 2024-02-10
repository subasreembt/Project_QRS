const express = require("express");
const app = express.Router();
const studenttrainings = require("../controller/studentTraining");

app.get("/studtrainings",studenttrainings.getStdTraining );
app.post("/studtraining", studenttrainings.createsStdTraining);
app.put("/studtraining/:uid", studenttrainings.updateStdTraining);
app.delete("/studtraining/:uid", studenttrainings.deleteStdTraining);
 
 
module.exports = app;