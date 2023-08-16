
import { useState } from 'react';
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';

import * as React from 'react';

import { Navigate } from 'react-router-dom';
import { addGovernorate } from '../features/redux/governorateSlice';
import { absolutePaths } from '../navigation';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const types = [
  'type 1',
  'type 2',
  'type 3',
  
];
const AddGovernorate = () => {
 
const [governorateName, setGovernorateName] = useState()



  
const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = () =>{
    const governorate = { "name": governorateName }
    
    
    dispatch(addGovernorate(governorate))
    // navigate(absolutePaths.governorateList)
 
  }
  

 
  return (
    <>
      <Head>
        <title>
        Add a new governorate
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
                Add a new governorate
              </Typography>
            
            </Box>
            <TextField
              required
              fullWidth
              
              label="Governorate Name"
              
              name="governorateName"
              
              style={{marginBottom: 15 }}
              onChange={(e) => setGovernorateName(e.target.value)}
              
              variant="outlined"
            />
           
         
           
   
            
  
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
                Add Governorate
              </Button>
            </Box>
            
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddGovernorate;
