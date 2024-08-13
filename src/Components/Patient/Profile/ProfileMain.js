import React from 'react';
import './ProfileMain.css';
import PatientProfile from './PatientProfile';


function ProfileMain() {
  return (
    <div className="App">
        <h1>Patient Profile</h1>
      <PatientProfile />
    </div>
  );
}

export default ProfileMain;
