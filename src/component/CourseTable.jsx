import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "http://localhost:5000";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Course Title is required")
    .max(30, "Title must be at most 30 characters")
    .matches(/^[\w\s\S]*$/, "Title can contain any Characters including Special characters"),
  description: Yup.string()
    .required("Description of Course is required")
    .max(50, "Description must be at most 50 characters")
    .matches(/^[a-zA-Z ]*$/, "Only Alphabets and Spaces are allowed"),
  duration: Yup.mixed()
    .transform((value, originalValue) => {
      // If the original value is a string, attempt to parse it to a number
      if (typeof originalValue === 'string') {
        // Regular expression to extract the number part from the string
        const numberValue = parseFloat(originalValue);
        // Check if the parsed number is valid
        if (!isNaN(numberValue)) {
          return numberValue;
        }
      }
      // Otherwise, return the original value
      return value;
    })
    .required("Duration of the course is required")
    .test('is-positive', 'Duration of the course must be a positive number', value => {
        // Check if the value is positive
        return value > 0 || typeof value === 'string';
    })
    .test('is-max', 'Duration of the course must be at most 30', value => {
        // Check if the value is less than or equal to 30
        return value <= 30 || typeof value === 'string';
    }),
});



const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});


  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleEditModalOpen = (course) => {
    setSelectedCourse(course);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setOpenAddModal(false);
  };

  const handleDeleteConfirmationOpen = (course) => {
    setSelectedCourse(course);
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteConfirmationClose = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleAddModalOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
  };

  const handleEditCourse = async (values) => {
    try {
      await axios.put(`${API_URL}/course/${selectedCourse.uid}`, values);
      fetchCourses();
      handleEditModalClose();
    } catch (error) {
      console.error("Error editing course:", error);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      await axios.delete(`${API_URL}/course/${selectedCourse.uid}`);
      fetchCourses();
      handleDeleteConfirmationClose();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleAddCourse = async (values) => {
    try {
      const durationString = `${values.duration} ${values.durationUnit}`;
      await axios.post(`${API_URL}/course`, {
        title: values.title,
        description: values.description,
        duration: durationString,
      });
      fetchCourses();
      handleAddModalClose();
    } catch (error) {
      console.error("Error adding course:", error);
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

<Button
        variant="contained"
        onClick={handleAddModalOpen}
        sx={{ marginTop: "20px", marginLeft:"80%" ,background:"#211C6A", color:"aqua" }}
      >
        Add New Course
      </Button>
      <TableContainer sx={{marginTop:'30px'}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{background:"#211C6A"}}>
              <TableCell sx={{color:"aqua"}}>ID</TableCell>
              <TableCell  sx={{color:"aqua"}}>Title</TableCell>
              <TableCell  sx={{color:"aqua"}}>Description</TableCell>
              <TableCell  sx={{color:"aqua"}} >Duration</TableCell>
              <TableCell  sx={{color:"aqua"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell >{course.title}</TableCell>
                <TableCell >{course.description}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditModalOpen(course)}>
                    <EditIcon  sx={{color:"blue"}}/>
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteConfirmationOpen(course)}
                  >
                    <DeleteIcon sx={{color:"red"}} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openEditModal} onClose={handleEditModalClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h2 style={{ marginBottom: "30px",color: "#211C6A"}}>Edit Course</h2>
          <Formik
  initialValues={{
    title: selectedCourse.title,
    description: selectedCourse.description,
    duration: selectedCourse.duration,
    durationUnit: selectedCourse.durationUnit,
  }}
  validationSchema={validationSchema}
  onSubmit={handleEditCourse}
>
  {({ errors, touched }) => (
    <Form>
      <Field
        as={TextField}
        label="Title"
        name="title"
        fullWidth
        error={errors.title && touched.title}
        helperText={errors.title && touched.title && errors.title}
        style={{ marginBottom: "10px" }}
      />
      <Field
        as={TextField}
        label="Description"
        name="description"
        fullWidth
        error={errors.description && touched.description}
        helperText={
          errors.description &&
          touched.description &&
          errors.description
        }
        style={{ marginBottom: "10px" }}
      />
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <Field
          as={TextField}
          label="Duration"
          name="duration"
          fullWidth
          error={errors.duration && touched.duration}
          helperText={errors.duration && touched.duration && errors.duration}
          style={{ marginRight: "10px" }}
        />
        
          
      </div>
      <div >
        <Button type="submit" variant="contained" color="primary" style={{ marginRight: "10px" }}>
          Save
        </Button>
        <Button type="button" variant="contained" color="error" onClick={handleEditModalClose}>
          Cancel
        </Button>
      </div>
    </Form>
  )}
</Formik>

        </Box>
      </Modal>

      <Dialog
        open={openDeleteConfirmation}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle sx={{color:"#211C6A", fontWeight:"700"}}>Delete Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} variant="contained" color="info"> Cancel</Button>
          <Button onClick={handleDeleteCourse} variant="contained" color="error">Delete
</Button>
        </DialogActions>
      </Dialog>

      <Modal open={openAddModal} onClose={handleAddModalClose}>
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
      
           
           
          }}
        >
          <h2 style={{color:"#211C6A"}}>Add Course</h2>
          <Formik
  initialValues={{
    title: "",
    description: "",
    duration: "",
    
  }}
  validationSchema={validationSchema}
  onSubmit={handleAddCourse}
>
  {({ errors, touched }) => (
    <Form>
      <Field
        as={TextField}
        label="Title"
        name="title"
        fullWidth
        error={errors.title && touched.title}
        helperText={errors.title && touched.title && errors.title}
        style={{ marginBottom: "10px" }}
      />
      <Field
        as={TextField}
        label="Description"
        name="description"
        fullWidth
        error={errors.description && touched.description}
        helperText={
          errors.description &&
          touched.description &&
          errors.description
        }
        style={{ marginBottom: "10px" }}
      />
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <Field
          as={TextField}
          label="Duration"
          name="duration"
          fullWidth
          error={errors.duration && touched.duration}
          helperText={errors.duration && touched.duration && errors.duration}
          style={{ marginRight: "10px" }}
        />
       
      </div>
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

export default CourseTable;
