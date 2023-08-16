

import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {useSelector, useDispatch} from "react-redux"
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { HeadProvider as Head } from 'react-head';

import FormControl from '@mui/material/FormControl';
import {updateLocality} from "../features/redux/localitySlice"
import { getAllGovernorates } from '../features/redux/governorateSlice';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';
import {useEffect} from 'react';
import { absolutePaths } from '../navigation';

const EditLocality = () => {
const localityToEdit = useSelector((state)=>state.locality.localityToEdit)
const [localityName, setLocalityName] = useState(localityToEdit.name)
const [governorateId, setGovernorateId] = useState(localityToEdit.governorate.id)

const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getAllGovernorates()) 
},[dispatch])
const governorates = useSelector((state)=>state.governorate.governorates)  
 
  const navigate = useNavigate()
  const handleSubmit = () =>{
    const locality = { "id": localityToEdit.id,"name": localityName, "governorate_id": governorateId }
    
     dispatch(updateLocality(locality))
     navigate(absolutePaths.localityList)

  }
 
  return (
    <>
      <Head>
        <title>
        Edit locality
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
      
          <form >
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
                textAlign={"center"}
              >
                Edit locality
              </Typography>
            
            </Box>
            <TextField
              required
              fullWidth
              
              label="Locality Name"
              
              name="localityName"
             
              style={{marginBottom: 15 }}
              onChange={(e) => setLocalityName(e.target.value)}
      
              defaultValue={localityToEdit.name}
              variant="outlined"
            />
           
            <FormControl required fullWidth >
            <InputLabel id="demo-simple-select-helper-label">Governorate Name</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          style={{marginBottom: 15 }}
         
          name="governorateId"
          defaultValue={localityToEdit.governorate.id}
          fullWidth
          label="Governorate Name"
          
          onChange={(e)=>setGovernorateId(e.target.value)}
        >
          
          {governorates.map((governorate) => (
            <MenuItem key={governorate.id} value={governorate.id}>{governorate.name}</MenuItem>
          ))}
          
        </Select>
        </FormControl>
            
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              
            </Box>
       
            <Box sx={{ py: 2 }}>
              <Button
              
                color="primary"
              
                fullWidth
                size="large"
               
               onClick={()=>handleSubmit()}
                variant="contained"
              >
                Edit Locality
              </Button>
            </Box>
            
          </form>
        </Container>
      </Box>
    </>
  );
};

export default EditLocality;
