import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/Medic aide.png';
import './LoginDoctor.css';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Medic Aide
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
});

export default function LoginDoctor() {
  
  const Navigate=useNavigate();
  const [loginData, setLoginData] = useState({
    doctor_id: '',
    password: '',
  }); //used declare and manage state variables directly within a function component
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
      setLoginData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      const { doctor_id, password } = loginData;
      if (doctor_id && password) {
        try {
          const response = await axios.get('http://localhost:8080/api/signup');
          const userExist = response.data.some(
            (data) => data.doctor_id === doctor_id && data.password === password 
            /*The Doctor Id and Password in the database is pulled using get and being compared with the input field entries*/ 
          );
          if (userExist) {
            alert('Login successful');
            Navigate('/Doctor');
          } else {
            alert('User Not Found');
          }
        } catch (error) {
          console.error('Error fetching users', error);
          alert('Error logging in');
        }
      } else {
        alert('Please fill all the fields');
      }
    }                                     //The Above code is to establish connection with the API useing axios
    
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <div className="logo">
            <img src={logo} width={100} height={100} alt="Medic Aide Logo" />
          </div>
          <div className='lg'>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main',ml:20 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ml:19}}>
            Doctor
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="doctorid"
              label="doctorid"
              name="doctor_id"
              autoComplete="doctorid"
              autoFocus
              onChange={handleLoginChange}
            />{/*Input fieldfor  the Doctor Id which will be used for Login*/ }
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleLoginChange}
            />{/*Input fieldfor  the Doctor Id which will be used for Login*/ }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLoginSubmit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUpDoc" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          </div>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
