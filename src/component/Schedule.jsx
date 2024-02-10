import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  InputLabel, // Import InputLabel
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "http://localhost:5000";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  courseId: Yup.string().required("Course Title is required"),
  startDate: Yup.date()
    .required("Start Date is required")
    .min(new Date(), "Start Date cannot be before today"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after start date"),
    mentor: Yup.string().required("Mentor Name is required"),
});

const TrainingSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [newschedules, setnewSchedules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  useEffect(() => {
    fetchSchedules();
    fetchCourses();
  }, []);

  useEffect(() => {
    if (schedules.length > 0) {
      fetchCourseNames();
    }
  }, [schedules]);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API_URL}/trainingSchedules`);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const fetchCourseNames = async () => {
    const updatedSchedules = [];
    for (const schedule of schedules) {
      try {
        const uid = schedule.course_id;
        const response = await axios.get(`${API_URL}/course/${uid}`);
        const courseName = response.data.coursename;
        const updatedSchedule = { ...schedule, courseName };
        updatedSchedules.push(updatedSchedule);
      } catch (error) {
        console.error("Error fetching course name:", error);
      }
    }
    setnewSchedules(updatedSchedules);
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const handleEditModalOpen = (schedule) => {
    setSelectedSchedule(schedule);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setSelectedSchedule({});
  };

  const handleDeleteConfirmationOpen = (schedule) => {
    setSelectedSchedule(schedule);
    setOpenDeleteConfirmation(true);
  };


  const handleAddModalOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
  };

  const handleDeleteConfirmationClose = () => {
    fetchSchedules();
    setOpenDeleteConfirmation(false);
  };


  const handleEditSchedule = async (values) => {
    try {
      await axios.put(
        `${API_URL}/trainingSchedule/${selectedSchedule.uid}`,
        values
      );
      fetchSchedules();
      handleEditModalClose();
    } catch (error) {
      console.error("Error editing schedule:", error);
    }
  };

  const handleAddSchedule = async (values) => {
    try {
      await axios.post(`${API_URL}/trainSchedule`, values);
      fetchSchedules();
      handleAddModalClose();
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  const handleDeleteSchedule = async () => {
    try {
      await axios.delete(`${API_URL}/trainingSchedule/${selectedSchedule.uid}`);
      fetchSchedules();
      handleDeleteConfirmationClose();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        padding: "20px",
      }}
    >

       <Button variant="contained" onClick={handleAddModalOpen}
        sx={{ marginTop: "20px", marginLeft:"80%" ,background:"#211C6A", color:"aqua" }}
       >
          Add New Schedule
        </Button>
      <TableContainer sx={{marginTop:'30px'}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{background:"#211C6A"}}>
            <TableCell sx={{color:"aqua"}}>ID</TableCell>
              <TableCell sx={{color:"aqua"}}>Title</TableCell>
              <TableCell sx={{color:"aqua"}}>Start Date</TableCell>
              <TableCell sx={{color:"aqua"}}>End Date</TableCell>
              <TableCell sx={{color:"aqua"}}>Mentor</TableCell>
              <TableCell sx={{color:"aqua"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newschedules.map((schedule,index) => (
              <TableRow key={index}>
                 <TableCell >{index + 1}</TableCell>
                <TableCell >{schedule.courseName}</TableCell>
                <TableCell >{schedule.start_date}</TableCell>
                <TableCell >{schedule.end_date}</TableCell>
                <TableCell >{schedule.mentor}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditModalOpen(schedule)}>
                    <EditIcon  sx={{color:"blue"}}/>
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteConfirmationOpen(schedule)}
                  >
                    <DeleteIcon sx={{color:"red"}} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openEditModal} onClose={handleEditModalClose} sx={{marginTop:"60px"}}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            width:400,
          }}
        >
          <h2 style={{ marginBottom: "30px",color: "#211C6A"}}>Edit Schedule</h2>
          <Formik
            initialValues={{
              courseId: selectedSchedule.course_id || "",
              startDate: selectedSchedule.start_date || "",
              endDate: selectedSchedule.end_date || "",
              mentor: selectedSchedule.mentor || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleEditSchedule}
          >
            {({ errors, touched }) => (
              <Form>
                <Box mb={2} sx={{width:"380px"}}>
                  <InputLabel htmlFor="courseId">Course</InputLabel>
                  <Field
                    as={Select}
                    name="courseId"
                    fullWidth
                    error={errors.courseId && touched.courseId}
                  >
                    {courses.map((course) => (
                      <MenuItem key={course._id} value={course.uid}>
                        {course.title}
                      </MenuItem>
                    ))}
                  </Field>
                  {errors.courseId && touched.courseId && (
                    <div style={{ color: "red" }}>{errors.courseId}</div>
                  )}
                </Box>
                <Box mb={2}>
                  <InputLabel htmlFor="startDate">Start Date</InputLabel>
                  <Field
                    as={TextField}
                    type="date"
                    name="startDate"
                    fullWidth
                    error={errors.startDate && touched.startDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.startDate && touched.startDate && (
                    <div style={{ color: "red" }}>{errors.startDate}</div>
                  )}
                </Box>
                <Box mb={2}>
                  <InputLabel htmlFor="endDate">End Date</InputLabel>
                  <Field
                    as={TextField}
                    type="date"
                    name="endDate"
                    fullWidth
                    error={errors.endDate && touched.endDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.endDate && touched.endDate && (
                    <div style={{ color: "red" }}>{errors.endDate}</div>
                  )}
                </Box>
                <Box mb={2}>
                  <InputLabel htmlFor="mentor">Mentor</InputLabel>
                  <Field
                    as={TextField}
                    name="mentor"
                    fullWidth
                    error={errors.mentor && touched.mentor}
                  />
                  {errors.mentor && touched.mentor && (
                    <div style={{ color: "red" }}>{errors.mentor}</div>
                  )}
                </Box>
                <Button type="submit" variant="contained" color="primary" style={{ marginRight: "10px" }}>
                  Save
                </Button>
                <Button type="button" variant="contained" color="error" onClick={handleEditModalClose}>
          Cancel
        </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <Dialog
        open={openDeleteConfirmation}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle sx={{color:"#211C6A", fontWeight:"700"}}>Delete Training Schedule</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Training Schedule?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose}variant="contained" color="info">Cancel</Button>
          <Button onClick={handleDeleteSchedule} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      
      <Modal open={openAddModal} onClose={handleAddModalClose} sx={{marginTop:"60px"}}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            width:400,
            
      
          }}
        >
          <h2 style={{color:"#211C6A"}}>Add Schedule</h2>
          <Formik
            initialValues={{
              courseId: "",
              startDate: "",
              endDate: "",
              mentor: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddSchedule}
          >
            {({ errors, touched }) => (
              <Form>
                <Box mb={2} sx={{width:"380px"}}>
                  <InputLabel htmlFor="courseId">Course</InputLabel>
                  <Field
                    as={Select}
                    name="courseId"
                    fullWidth
                    error={errors.courseId && touched.courseId}
                  >
                    {courses.map((course) => (
                      <MenuItem key={course._id} value={course.uid}>
                        {course.title}
                      </MenuItem>
                    ))}
                  </Field>
                  {errors.courseId && touched.courseId && (
                    <div style={{ color: "red" }}>{errors.courseId}</div>
                  )}
                </Box>
                <Box mb={2}>
                  <InputLabel htmlFor="startDate">Start Date</InputLabel>
                  <Field
                    as={TextField}
                    type="date"
                    name="startDate"
                    fullWidth
                    error={errors.startDate && touched.startDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.startDate && touched.startDate && (
                    <div style={{ color: "red" }}>{errors.startDate}</div>
                  )}
                </Box>
                <Box mb={2}>
                  <InputLabel htmlFor="endDate">End Date</InputLabel>
                  <Field
                    as={TextField}
                    type="date"
                    name="endDate"
                    fullWidth
                    error={errors.endDate && touched.endDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.endDate && touched.endDate && (
                    <div style={{ color: "red" }}>{errors.endDate}</div>
                  )}
                </Box>
                <Box mb={2}>
                  <InputLabel htmlFor="mentor">Mentor</InputLabel>
                  <Field
                    as={TextField}
                    name="mentor"
                    fullWidth
                    error={errors.mentor && touched.mentor}
                  />
                  {errors.mentor && touched.mentor && (
                    <div style={{ color: "red" }}>{errors.mentor}</div>
                  )}
                </Box>
                <Button type="submit" variant="contained" color="primary" style={{ marginRight: "10px" }}>
                  Add
                </Button>

                <Button type="button" variant="contained" color="error" onClick={handleEditModalClose}>
          Cancel
        </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      </Box>
  );
};

export default TrainingSchedule;
