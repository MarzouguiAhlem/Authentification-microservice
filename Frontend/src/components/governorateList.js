import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { deleteGovernorate,getAllGovernorates,setGovernorateToEdit } from '../features/redux/governorateSlice';
import {useSelector, useDispatch} from "react-redux"

import { useNavigate } from 'react-router-dom';
import { absolutePaths } from '../navigation';



export default function GovernorateList() {
  const rows = useSelector((state)=>state.governorate.governorates)  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
   
    React.useEffect(()=>{
        dispatch(getAllGovernorates())

    },[])

  
  
    const handleEditGovernorate = (row) =>{
    dispatch(setGovernorateToEdit(row))
    navigate(absolutePaths.editGovernorate)
  } 
 
    const handleDeleteGovernorate=(id)=>{
   
    if(window.confirm("Are you sure wanted to delete the governorate ?")){
      dispatch(deleteGovernorate(id))
  
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell align="right" colSpan={2}><Button variant="contained" onClick={()=>navigate(absolutePaths.addGovernorate)}>Add Governorate</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">governorate name</TableCell>
            <TableCell align="center">Actions</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center"><Button style={{marginRight: 10 }} variant="contained" color="success" onClick={()=>handleEditGovernorate(row)} >
        Edit
      </Button>
      <Button variant="contained" color="error" onClick={()=>handleDeleteGovernorate(row.id)}>
        Delete
      </Button></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
