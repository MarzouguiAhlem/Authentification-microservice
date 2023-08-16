import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { SeverityPill } from './enabledComponent';
import Button from '@mui/material/Button';
import {updateGateway , deleteGateway, getAllGateways, setGatewayToEdit} from "../features/redux/gatewaySlice"
import {useSelector, useDispatch} from "react-redux"
import {setGateway} from "../features/redux/chartsLayoutSlice"
import { UilTrashAlt , UilEdit , UilDashboard } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom';
import { absolutePaths } from '../navigation';
//import EditGateway from './editGateway';
import { getSensorValues } from '../features/redux/sensorValueSlice';
import SensorValue from './SensorValue';


// function createData(id, name, userFullName, address) {
//   return {
//     id,
//     name,
//     userFullName,
//     address,
//     sensors: [
//       {
//         id : 1,
//         name : 'sensor1',
//         ipAddress: '11091700',
//         value: '37',
//       },
//       {
//         id : 2,
//         name: 'sensor2',
//         ipAddress: '11091700',
//         value: '20',
//       },
//     ],
//   };
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleEditGateway = (row) =>{
    dispatch(setGatewayToEdit(row))
    navigate(absolutePaths.editGateway)
    dispatch(updateGateway(row.gateway_id))
  } 
 
    const handledeleteGateway=(id)=>{
    if(window.confirm("Are you sure wanted to delete the gateway ?")){
      dispatch(deleteGateway(id))
  
    }
  }
  const displayDashboard=(id)=>{
    dispatch(getSensorValues(id))
    // SensorValue.socket.emit('update_sensor_data', id);
    navigate(absolutePaths.sensorValue)
  }

  return (
    
    <React.Fragment>
      <TableRow scope="row" >
      
        <TableCell component="th" >
          {row.gateway_name}
        </TableCell>
        {/* <TableCell align="center">{row.user.name}</TableCell> */}
        <TableCell align="center">{row.mac_address}</TableCell>
        <TableCell align="center">{row.address}</TableCell>
        <TableCell align="center">{row.sensors.join(",\n")}</TableCell>      
        <TableCell align="center">{row.cropType}</TableCell>
        <TableCell align="center">{row.climateType}</TableCell>
        <TableCell align="center">
      
      <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2 rounded h-15 m-1 " variant="contained" color="success" onClick={()=>handleEditGateway(row)} >
        <UilEdit/>
      </button>
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded h-15 m-1 " variant="contained" color="error" onClick={()=>handledeleteGateway(row.gateway_id)}>
        <UilTrashAlt/>
      </button>
      <button className="bg-sky-600  hover:bg-sky-700 text-white font-bold py-2 px-2 rounded h-15 m-1 " variant="contained" color="primary" onClick={()=>displayDashboard(row.gateway_id)}>
        <UilDashboard/>
      </button>

      
    </TableCell>
      </TableRow>
     {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sensors
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" >{row.sensors}</TableCell>
                    <TableCell>ip address</TableCell>
                    <TableCell align="right">Value</TableCell>
                   
                  </TableRow> 
                </TableHead>
                
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}
export default function GatewayList() {
    const data = useSelector((state)=>state.gateway)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(getAllGateways()) 
    },[dispatch])
    // dispatch
    React.useEffect(()=>{ 
    },[data])
    
   
    // console.log(data)
    // console.log(data.gateways.gateways)

    const rows = data.gateways.gateways
    // console.log(rows);
    //Object.keys(myObj)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
        <TableRow>
            <TableCell align="right" colSpan={8}><button variant="contained"  className="bg-sky-600  hover:bg-sky-700 text-white font-medium py-2 px-4 rounded h-15 " onClick={()=>navigate(absolutePaths.addGateway)}>Add Gateway</button></TableCell>
            
            
          </TableRow>
          <TableRow>
            <TableCell >Gateway Name</TableCell>
            <TableCell align="center">MAC Address</TableCell>
            <TableCell align="center">Gateway Address</TableCell>
            <TableCell align="center">Sensors</TableCell>
            <TableCell align="center">Crop Type</TableCell>
            <TableCell align="center">Climate Type</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && Array.isArray(rows) && rows.map((row) => (
            <Row key={row.gateway_id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
