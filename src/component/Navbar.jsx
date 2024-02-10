import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../assets/education.png";

const Navbar = () => {
  return (
    <AppBar position="sticky" style={{ backgroundColor: "#211C6A", zIndex: "9999999999999999" }}>
      <Toolbar>
        <NavLink to="/">
          <img src={logo} alt="Logo" style={{ marginRight: "1rem" ,height:"35px"}} />
        </NavLink>
        <Typography variant="h6"component={NavLink} to="/" sx={{ flexGrow: 1,color:"aqua", textDecoration:"none" }}>
          Careers
        </Typography>
        <Button color="inherit" sx={{ color:"aqua" }} component={NavLink} to="/">
          HOME
        </Button>
       
        <Button color="inherit" sx={{ color:"aqua" }} component={NavLink} to="/course">
          COURSES
        </Button>
        <Button color="inherit" sx={{ color:"aqua" }} component={NavLink} to="/student">
          STUDENT
        </Button>
        <Button color="inherit" sx={{ color:"aqua" }} component={NavLink} to="/training">
          TRAINING 
        </Button>
        <Button color="inherit" sx={{ color:"aqua" }} component={NavLink} to="/schedule">
          TRAINING SCHEDULDE
        </Button>
       
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
