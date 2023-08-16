
import { useState } from 'react';
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';

import * as React from 'react';
import { updateGovernorate ,getAllGovernorates} from '../features/redux/governorateSlice';
import { absolutePaths } from '../navigation';

const types = [
  'type 1',
  'type 2',
  'type 3',
  
];
const EditGovernorate = () => {
const governorateToEdit = useSelector((state)=>state.governorate.governorateToEdit)
const [governorateName, setGovernorateName] = useState(governorateToEdit.name)

const dispatch = useDispatch();
 const navigate = useNavigate()

  const handleSubmit = () =>{
const governorate = { "id": governorateToEdit.id,"name": governorateName }
    
     dispatch(updateGovernorate(governorate))
     dispatch(getAllGovernorates())
     navigate(absolutePaths.governorateList)

  }
  

 
  return (
    <>
      <Head>
        <title>
        Edit governorate
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
                Edit governorate
              </Typography>
            
            </Box>
            <TextField
              required
              fullWidth
              
              label="Governorate Name"
              
              name="governorateName"
             
              style={{marginBottom: 15 }}
              onChange={(e) => setGovernorateName(e.target.value)}
      
              defaultValue={governorateToEdit.name}
              variant="outlined"
            />
           
           
       
            <Box sx={{ py: 2 }}>
              <Button
              
                color="primary"
              
                fullWidth
                size="large"
               
               onClick={()=>handleSubmit()}
                variant="contained"
              >
                Edit Governorate
              </Button>
            </Box>
            
          </form>
        </Container>
      </Box>
    </>
  );
};

export default EditGovernorate;
