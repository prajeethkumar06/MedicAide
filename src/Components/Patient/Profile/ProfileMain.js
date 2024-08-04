import React from 'react';
import './ProfileMain.css';
import PatientProfile from './PatientProfile';


function ProfileMain() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Patient Profile</h1>
      </header>
      <PatientProfile />
    </div>
  );
}

export default ProfileMain;
