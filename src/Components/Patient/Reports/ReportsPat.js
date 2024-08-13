import axios from 'axios';
import React from 'react';
import Button from '@mui/material/Button';
import AppBarPat from '../../AppBarPat';
import './ReportsPat.css';
import { useNavigate } from 'react-router-dom';

export default function ReportsPat() {
    const [report, setReport] = React.useState(null);
    
    React.useEffect(()=>{
        async function getData() {
            const res = await axios.get("http://localhost:8080/api/consultation/consul004");
            setReport(res.data);
        }
        getData();
    },[])

    const navigate = useNavigate();
    const back = () =>{
        navigate('/Patient')
    }

    return (
        <div>
            <AppBarPat />
            <div className="report">
                <h1>Report</h1>
                <h4>Consultation Number</h4>
                {report && 
                    <p><i>{report.consultation_number}</i></p>
                }
                <h4>Presenting Complaint</h4>
                {report && <p>{report.Presenting_Complaint}</p>}
                <h4>History Of Presenting Complaint</h4>
                {report && <p>{report.History_PC}</p>}
                <h4>Past Medical History</h4>
                {report && <p>{report.Pm_History}</p>}
                <h4>Past Surgeries</h4>
                {report && <p>{report.Past_surgeries}</p>}
                <Button class="moveback" variant="contained" color="success" onClick={back}>
                    Move Back
                </Button>
            </div>
        </div>
    );
}
