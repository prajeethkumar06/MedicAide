import React, { useState } from 'react';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import logo from '../../../assets/Medic aide.png';
import {useNavigate} from 'react-router-dom';
import './Consultation.css'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function Consultation() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    id={menuId}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
    >
    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      >
      <MenuItem>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
      <Badge badgeContent={4} color="error">
      <MailIcon />
      </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
        <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
        </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="primary-search-account-menu"
      aria-haspopup="true"
      color="inherit"
      >
      <AccountCircle />
      </IconButton>
      <p>Profile</p>
      </MenuItem>
      </Menu>
    );
    
    const Navigate=useNavigate();
    const next = () =>{
        Navigate('/PatientDetails');
    }
    const [consultationData, setconsultationData] = useState({
        consultationNumber: '',
        presentingComplaint: '',
        historyPC: '',
        pmhistory: '',
        pastsurgery: '',
      });
          
      const handleConsultationChange = (e) => {
        const { name, value } = e.target;
        setconsultationData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      const handleConsultationSubmit = async (e) => {
        e.preventDefault();
        const { consultation_number ,Presenting_Complaint ,History_PC ,Pm_History ,Past_surgeries } = consultationData;
        if ( consultation_number ,Presenting_Complaint ,History_PC ,Pm_History ,Past_surgeries) {
          try {
            await axios.post('http://localhost:8080/api/consultation', consultationData);
            alert('User Created');
            next();
          } catch (error) {
            alert('Error creating user');
          }
        } else {
          alert('Please fill all the fields');
        }
      };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#c21807' }}>
        <Toolbar>
          <img src={logo} class='shall' width={60} height={60} alt="logo" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            ml={2}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Medic Aide
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div>
        <Box>
        <div class='con'>
          <h2>Consultation</h2>
          <p>Consultation No: <input type="text" required name="consultation_number" placeholder='Consultation Number' onChange={handleConsultationChange}></input></p>
          <p>Presenting Complaint: </p>
          <textarea rows="10" cols="90" id="pc" name="Presenting_Complaint" onChange={handleConsultationChange}></textarea>
          <p>History Of Presenting Complaint:</p>
          <textarea rows="10" cols="90" id="hpc" name="History_PC" onChange={handleConsultationChange}></textarea>
          <p>Past Medical History(PMH):</p>
          <textarea rows="10" cols="90" id="pmh" name="Pm_History" onChange={handleConsultationChange}></textarea>
          <p>Past Admission,Surgeries or Diseases:</p>
          <textarea rows="10" cols="90" id="past" name="Past_surgeries" onChange={handleConsultationChange}></textarea><br></br><br></br>
          <Button variant="contained" color="success" sx={{ml:7 ,mb:5}} onClick={handleConsultationSubmit}>
            Submit
          </Button>
        </div>
        </Box>
      </div>
    </Box>
  );
}
