const mongoose = require('mongoose');



const CourseSchema = mongoose.Schema({
  uid: { type: String, required: true },
  title: {type: String,required: true},
  description: {type: String,required: true },
  duration: {type: String, required: true},
  is_active: {type: Boolean,default: true},
  is_deleted: {type: Boolean,default: false},
  created_at: {type: Date,required: true,default: Date.now,},
  updated_at: {type: Date,required: true,default: Date.now,},
});

CourseSchema.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});


const studentSchema = mongoose.Schema({
  uid: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  is_active: { type: Boolean, default: true, },
  is_deleted: { type: Boolean, default: false, },
  created_by: { type: String, default: null, },
  updated_by: { type: String, default: null, },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

studentSchema.pre('save', function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});


const studentTrainingSchema = mongoose.Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  course_id: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
});

studentTrainingSchema.pre('save', function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const TrainingScheduleSchema = mongoose.Schema({
  uid: { type: String, required: true },
  course_id: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  mentor: { type: String, required: true },
  is_active: { type: Boolean, default: true, },
  is_deleted: { type: Boolean, default: false, },
  created_by: { type: String, default: null, },
  updated_by: { type: String, default: null, },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

TrainingScheduleSchema.pre('save', function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

module.exports = {
  
  course: mongoose.model("course", CourseSchema),
  student: mongoose.model("student", studentSchema),
  studentTraining: mongoose.model("studentTraining", studentTrainingSchema),
  trainingSchedule: mongoose.model("trainingSchedule", TrainingScheduleSchema),
 
};
