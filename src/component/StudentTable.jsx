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

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("First Name is required")
    .max(30, "First Name must be at most 30 characters")
    .matches(/^[a-zA-Z ]*$/, "Only Alphabets and Spaces are allowed"),
  lastname: Yup.string()
    .required("Last Name is required")
    .max(30, "Last Name must be at most 30 characters")
    .matches(/^[a-zA-Z ]*$/, "Only alphabets and spaces are allowed"),
  email: Yup.string().email("Type the Email format Correctly").required("Email-Id is required"),
});

const StudentTable = () => {
  const [students, setstudents] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedStudents, setselectedStudents] = useState({});

  useEffect(() => {
    fetchstudents();
  }, []);

  const fetchstudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      setstudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEditModalOpen = (students) => {
    setselectedStudents(students);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setOpenAddModal(false);
  };

  const handleDeleteConfirmationOpen = (students) => {
    setselectedStudents(students);
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

  const handleEditstudents = async (values) => {
    try {
      await axios.put(
        `${API_URL}/student/${selectedStudents.uid}`,
        values
      );
      fetchstudents();
      handleEditModalClose();
    } catch (error) {
      console.error("Error editing students:", error);
    }
  };

  const handleDeletestudents = async () => {
    try {
      await axios.delete(`${API_URL}/student/${selectedStudents.uid}`);
      fetchstudents();
      handleDeleteConfirmationClose();
    } catch (error) {
      console.error("Error deleting students:", error);
    }
  };

  const handleAddstudents = async (values) => {
    try {
      const durationString = `${values.email}`;
      await axios.post(`${API_URL}/student`, {
        firstname: values.firstname,
        lastname: values.lastname,
        email: durationString,
      });
      fetchstudents();
      handleAddModalClose();
    } catch (error) {
      console.error("Error adding students:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white ",
        padding: "20px",
      }}
    >

<Button
        variant="contained"
        onClick={handleAddModalOpen}
        sx={{marginTop:'20px',marginLeft:"80%",background:"#211C6A", color:"aqua" }}
      >
        Add New students
  </Button>
  
      <TableContainer sx={{marginTop:'30px',}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{background:"#211C6A"}}>
              <TableCell sx={{color:"aqua"}}>ID</TableCell>
              <TableCell sx={{color:"aqua"}} >First Name</TableCell>
              <TableCell sx={{color:"aqua"}}>Last Name</TableCell>
              <TableCell sx={{color:"aqua"}}>Email</TableCell>
              <TableCell sx={{color:"aqua"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((students, index) => (
              <TableRow key={index}>
                <TableCell >{index + 1}</TableCell>
                <TableCell >
                  {students.firstname}
                </TableCell>
                <TableCell >
                  {students.lastname}
                </TableCell>
                <TableCell >
                  {students.email}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditModalOpen(students)}>
                    <EditIcon  sx={{color:"blue"}} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteConfirmationOpen(students)}
                  >
                    <DeleteIcon  sx={{color:"red"}}/>
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
          <h2 style={{ marginBottom: "20px",color: "#211C6A" }}>Edit students Information</h2>
          <Formik
            initialValues={{
              firstname: selectedStudents.firstname,
              lastname: selectedStudents.lastname,
              email: selectedStudents.email,
            }}
            validationSchema={validationSchema}
            onSubmit={handleEditstudents}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  label="First Name"
                  name="firstname"
                  fullWidth
                  error={errors.firstname && touched.firstname}
                  helperText={
                    errors.firstname && touched.firstname && errors.firstname
                  }
                  style={{ marginBottom: "10px" }}
                />
                <Field
                  as={TextField}
                  label="Last Name"
                  name="lastname"
                  fullWidth
                  error={errors.lastname && touched.lastname}
                  helperText={
                    errors.lastname && touched.lastname && errors.lastname
                  }
                  style={{ marginBottom: "10px" }}
                />
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    fullWidth
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                    style={{ marginRight: "10px" }}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    onClick={handleEditModalClose}
                  >
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
        <DialogTitle sx={{color:"#211C6A", fontWeight:"700"}} >Delete students</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this students?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} variant="contained" color="info"> Cancel</Button>
          <Button onClick={handleDeletestudents} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={openAddModal} onClose={handleAddModalClose}>
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
          <h2 style={{color:"#211C6A"}}>Add Students Information</h2>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddstudents}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  label="First Name"
                  name="firstname"
                  fullWidth
                  error={errors.firstname && touched.firstname}
                  helperText={
                    errors.firstname && touched.firstname && errors.firstname
                  }
                  style={{ marginBottom: "10px" }}
                />
                <Field
                  as={TextField}
                  label="Last Name"
                  name="lastname"
                  fullWidth
                  error={errors.lastname && touched.lastname}
                  helperText={
                    errors.lastname && touched.lastname && errors.lastname
                  }
                  style={{ marginBottom: "10px" }}
                />
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    fullWidth
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                    style={{ marginRight: "10px" }}
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  Add
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={handleEditModalClose}
                >
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

export default StudentTable;
