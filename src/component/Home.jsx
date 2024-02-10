
import React from 'react';
import { Grid, Button ,Typography} from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Grid container>
         <Grid container>
      <Grid xs={12}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img
            src="https://www.vijaytechzone.in/assets/img/page-title/full-stack-web-developer-in-trichy.jpg"
            alt="laptop"
            style={{ width: '100%', height: '100%' }}
          />
          <div style={{ position: 'absolute', top: '40%', left: '30%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
            <h1>Empower yourself with Education..&#128214; </h1>
            <h1>  Let your dreams take Flight...&#128747;</h1>
          </div>
        </div>
      </Grid>
    </Grid>

    <Grid container justifyContent="center">
      <Typography variant='h3' align="center" sx={{color: "#211C6A", fontWeight:"700"}}>
      Your journey to success begins here.
      </Typography>

      <Typography variant='h3' align="center" sx={{color: "#211C6A", fontWeight:"700"}}>
       Start your career with confidence and determination.
      </Typography>
    </Grid>

    <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' , marginTop:"20px   "}}>
        <Link to="/course" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{ background: "#211C6A", color: "aqua", width: "100%" }}
          >
            Join Us
          </Button>
        </Link>
      </Grid>

    </Grid>
  );
}

export default Home;
