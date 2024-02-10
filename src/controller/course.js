const Course = require('../models/model').course;
const crypto = require('crypto');


const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({is_active: true, is_deleted: false});
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}

const getCourseById = async (req, res) => {
  const uid = req.params.uid; 
  try {
    const course = await Course.findOne({uid, is_active: true, is_deleted: false });
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    } 
    res.status(200).json({coursename:course.title});
  } catch (error) {
   
    res.status(500).json({ error: 'Internal server error.' });
  }
}
const createCourse = async (req, res) => {
  try {
    const { title, description, duration } = req.body;

    
    const missingFields = [];

    
    if (!title) {
      missingFields.push('title');
    }
    if (!description) {
      missingFields.push('description');
    }
    if (!duration) {
      missingFields.push('duration');
    }

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `The following fields are required: ${missingFields.join(', ')}.` });
    }

    const uid = crypto.randomBytes(16).toString("hex");
    const courseData = new Course({
      uid: uid,
      title: title,
      description: description,
      duration: duration,
    });

    
    await courseData.save();

    
    res.status(201).json({ message: "Course created successfully", course: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseUid = req.params.uid;
    if (!courseUid) {
      return res.status(400).json({ message: "Course UID is required" });
    }
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is Required." });
    }

    if (!req.body.description) {
      return res.status(400).json({ message: "Description is Required." });
    }

    if (!req.body.duration) {
      return res.status(400).json({ message: "Duration is Required." });
    }

    const title = req.body.title;
    const description = req.body.description;
    const duration = req.body.duration;
    const updatedData = {
      title: title,
      description: description,
      duration: duration
    };
    const course = await Course.findOneAndUpdate({ uid: courseUid }, updatedData, { new: true });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course Updated Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseUid = req.params.uid;
    if (!courseUid) {
      return res.status(400).json({ message: "Course UID is required" });
    }
    const course = await Course.findOneAndUpdate({ uid: courseUid }, { is_deleted: true }, { new: true });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course Deleted Successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


 
module.exports = {
  getAllCourses:getAllCourses,
  getCourseById:getCourseById,
  createCourse:createCourse,
  updateCourse:updateCourse,
  deleteCourse:deleteCourse,
};
 