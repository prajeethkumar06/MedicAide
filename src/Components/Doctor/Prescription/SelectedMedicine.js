import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './SelectedMedicine.css'; // Ensure correct import path
import AppBar1 from '../../AppBar1';

export default function SelectedMedicines() {
  const location = useLocation();
  const { selectedMedicines } = location.state || { selectedMedicines: [] };

  const Navigate=useNavigate();
  const back = () =>{
    Navigate('/PatientDetails')
  }

  return (
    <div>
      <AppBar1 />
    <div className="bill-container">
      <div className="bill-header">
        <h1>Prescription</h1>
        <p>Invoice Date: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="bill-content">
        {selectedMedicines.length === 0 ? (
          <p className="no-items">No medicines selected</p>
        ) : (
          <ul>
            {selectedMedicines.map((med, index) => (
              <li key={index}>
                <span className="item-name">{med}</span>
                <span className="item-quantity">10</span> {/* Placeholder for quantity */}
              </li>
            ))}
          </ul>
        )}
        <Button variant="contained" color="success" sx={{ mt: 4 }} onClick={back}>
          Complete
        </Button>
      </div>
    </div>
    </div>
  );
}
