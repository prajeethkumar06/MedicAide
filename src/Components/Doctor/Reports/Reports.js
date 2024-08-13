import axios from 'axios';
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AppBar1 from '../../AppBar1'
import './Reports.css';
import { useNavigate } from 'react-router-dom';


export default function Reports() {
    const [report, setReport] = React.useState(null);
    React.useEffect(()=>{
        async function getData() {
            const res = await axios.get("http://localhost:8080/api/consultation/consul004"); /*axios to handle HTTP requests*/
            setReport(res.data);
        }
        getData();
    },[])

    const Navigate=useNavigate();
    const back = () =>{
        Navigate('/PatientDetails')
    }

  return (
    <div>
    <AppBar1 />
        <div class="report">
            <h1>Report</h1>
            <h3>Consultation Number</h3>
            {report && 
                <p><i>
                {report.consultation_number}
                </i>
                </p>
            }                               {/*Data stored in the backend is being displayed using get mapping*/}
            <h3>Presenting Complaint</h3>
            {report && 
                <p>
                {report.Presenting_Complaint}
                </p>
            }                               {/*Data stored in the backend is being displayed using get mapping*/}
            <h3>History Of Presenting Complaint</h3>
            {report && 
                <p>
                {report.History_PC}
                </p>
            }                               {/*Data stored in the backend is being displayed using get mapping*/}
            <h3>Past Medical History</h3>
            {report && 
                <p>
                {report.Pm_History}
                </p>
            }                              {/*Data stored in the backend is being displayed using get mapping*/}
            <h3>Past Surgeries</h3>
            {report && 
                <p>
                {report.Past_surgeries}
                </p>
            }                               {/*Data stored in the backend is being displayed using get mapping*/}
            <Button className='moveback' variant="contained" color="success" onClick={back}>
                Move Back
              </Button>
        </div>
    </div>
  )
}
