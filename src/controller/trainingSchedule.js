const TrainSchedule = require("../models/model").trainingSchedule;
const crypto = require('crypto');


const getTrainingSchedule = async (req, res) => {
    try {
      const schedule = await TrainSchedule.find({ is_active: true, is_deleted: false });
      res.status(200).json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const createTrainingSchedule = async (req, res) => {
    if (!req.body.courseId) {
        return res.status(400).json({ message: "CourseId is Required." });
    }

    if (!req.body.startDate) {
        return res.status(400).json({ message: "StartDate is Required." });
    }

    if (!req.body.endDate) {
        return res.status(400).json({ message: "EndDate is Required." });
    }
    if (!req.body.mentor) {
        return res.status(400).json({ message: "Mentor is Required." });
    }
    
    const courseId = req.body.courseId;
    const start_date = req.body.startDate;
    const end_date = req.body.endDate;
    const mentors = req.body.mentor;

    const uid = crypto.randomBytes(16).toString("hex");
    const scheduleData = {
      uid: uid,
      course_id: courseId,
      start_date: start_date,
      end_date: end_date,
      mentor: mentors
    };
    try {
    const schedule = new TrainSchedule(scheduleData);
    await schedule.save();
    res.status(201).json({ message: "Schedule Created Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const updateTrainingschedule = async (req, res) => {

  try {
    const scheduleUid = req.params.uid;
    if (!scheduleUid) {
      return res.status(400).json({ message: "Schedule UID is required" });
    }
    if (!req.body.courseId) {
      return res.status(400).json({ message: "CourseId is Required." });
  }

  if (!req.body.startDate) {
      return res.status(400).json({ message: "StartDate is Required." });
  }

  if (!req.body.endDate) {
      return res.status(400).json({ message: "EndDate is Required." });
  }
  if (!req.body.mentor) {
      return res.status(400).json({ message: "Mentor is Required." });
  }
  
  const courseId = req.body.courseId;
  const start_date = req.body.startDate;
  const end_date = req.body.endDate;
  const mentors = req.body.mentor;
    const updatedData = {
      course_id: courseId,
      start_date: start_date,
      end_date: end_date,
      mentor: mentors
    };
    const schedule = await TrainSchedule.findOneAndUpdate({ uid: scheduleUid }, updatedData, { new: true });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule Updated Successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTrainingSchedule = async (req, res) => {
  try {
    const scheduleUid = req.params.uid;
    console.log(scheduleUid)
    if (!scheduleUid) {
      return res.status(400).json({ message: "Schedule UID is required" });
    }
    const schedule = await TrainSchedule.findOneAndUpdate({ uid: scheduleUid }, { is_deleted: true }, { new: true });
    console.log(schedule)
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule Deleted Successfully", schedule: schedule });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
    createTrainingSchedule: createTrainingSchedule,
    getTrainingSchedule:getTrainingSchedule,
    updateTrainingschedule:updateTrainingschedule,
    deleteTrainingSchedule:deleteTrainingSchedule,
  };