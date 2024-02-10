import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";

import Home from "./component/Home";
import CourseTable from "./component/CourseTable";
import StudentTable from "./component/StudentTable";
import StudentTrainingTable from "./component/TrainingTable";
import TrainingSchedule from "./component/Schedule";



const MasterHome = () => {
  return (
    <>
      <title>Home</title>
      <Navbar/>
      <Home/>
 
   
    </>
  );
};
const MasterCourse = () => {
  return (
    <>
      <title>course</title>
      <Navbar/>
   <CourseTable/>
    </>
  );
};

const MasterStudent = () => {
  return (
    <>
      <title>student</title>
      <Navbar/>
   <StudentTable/>
    </>
  );
};

const MasterTraning = () => {
  return (
    <>
      <title>TrainingTable</title>
      <Navbar/>
   <StudentTrainingTable/>
    </>
  );
};

const MasterTrainingSchedule = () => {
  return (
    <>
      <title>TrainingSchedule</title>
      <Navbar/>
   <TrainingSchedule/>
    </>
  );
};






const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<MasterHome />} />
        <Route exact path="/course" element={<MasterCourse />} />
        <Route exact path="/student" element={<MasterStudent />} />
        <Route exact path="/training" element={<MasterTraning />} />
        <Route exact path="/schedule" element={<MasterTrainingSchedule />} />
      </Routes>
    </>
  );
};

export default App;
