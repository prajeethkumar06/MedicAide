import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';

function createData(medcheck, medname) {
  return { medcheck, medname };
}

const rows = [
  createData(' ', 'Paracetamol'),
  createData(' ', 'Dolo 350'),
  createData(' ', 'Armotraz(125mg)'),
  createData(' ', 'Cephalexin'),
  createData(' ', 'Nurtec'),
  createData(' ', 'Opdivo'),
];

export default function MedicineList() {
  const [selectedMedicines, setSelectedMedicines] = React.useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (medname) => (event) => {
    if (event.target.checked) {
      setSelectedMedicines([...selectedMedicines, medname]);
    } else {
      setSelectedMedicines(selectedMedicines.filter(item => item !== medname));
    }
  };

  const handleButtonClick = () => {
    if (selectedMedicines.length > 0) {
      navigate('/SelectedMedicines', { state: { selectedMedicines } });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Medic Aide©</caption>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Medicine Check</TableCell>
            <TableCell align="left">Medicine Name</TableCell>
            <TableCell align="right">Morning</TableCell>
            <TableCell align="right">Afternoon</TableCell>
            <TableCell align="right">Night</TableCell>
            <TableCell align="right">Before Food</TableCell>
            <TableCell align="right">After Food</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.medname}>
              <TableCell align="left">
                <Checkbox 
                  name="medicine" 
                  onChange={handleCheckboxChange(row.medname)}
                />
              </TableCell>
              <TableCell align="left">{row.medname}</TableCell>
              <TableCell align="right"><Checkbox name="mrng" /></TableCell>
              <TableCell align="right"><Checkbox name="an" /></TableCell>
              <TableCell align="right"><Checkbox name="night" /></TableCell>
              <TableCell align="right"><Checkbox name="before" /></TableCell>
              <TableCell align="right"><Checkbox name="after" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleButtonClick} sx={{ml:3 , mb:2}} variant="contained" color="primary">
        View Selected Medicines
      </Button>
    </TableContainer>
  );
}
