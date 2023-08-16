
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate  ,  useEffect} from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux"
import Select from '@mui/material/Select';
import { HeadProvider as Head } from 'react-head';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material';
import {addGateway,getAllGateways} from "../features/redux/gatewaySlice"
import {
  Box,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  Container,
  TextField,
  Typography,
} from '@mui/material';

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';



import ListItemText from '@mui/material/ListItemText';
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
   'Soil Moisture',
   'Temp and humidity',
];
const cropTypes = [
   'Tomato'
];
const climateTypes = [
  'Dry (Low precipitation, High evaporation) ',
   'Moderate (Moderate temperatures and precipitation levels)',
   'Tropical (high temperatures year-round and high levels of precipitation)'
];
const farmingTypes = [
   'Soil Based',
   'Hydroponic'
]
const AddGateway = () => {
 
const [gateway_name, setGateway_name] = useState()
const [userId, setUserId] = useState('')
const [address, setAddress] = useState()
const [cropType, setCropType] = useState([])
const [mac_address, setMac_address] = useState('')
const [climateType, setClimateType] = useState([])
const [farmingType, setFarmingType] = useState([])
const dispatch = useDispatch();

  const [sensors, setSensors] = React.useState([]);
  const navigate = useNavigate()
  const handleSubmit = () =>{
    const gateway = { "gateway_name": gateway_name, "mac_address" : mac_address,"address" : address,"climateType" : climateType ,"sensors" : sensors ,"cropType": cropType , "farmingType": farmingType }
    
    
    dispatch(addGateway(gateway))
    dispatch(getAllGateways())
    navigate(absolutePaths.gatewayList)
  }
  
  const handleSensorsTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setSensors(
     
      typeof value === 'string' ? value.split(', ') : value,
    );
  };
  
  const handleCropTypeChange = (event) => {
    if (!event || !event.target || !event.target.value) {
      return;
    }
    const { value } = event.target;
    setCropType(typeof value === 'string' ? value.split(', ') : value);
  };

  const handleClimateTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setClimateType(
     
      typeof value === 'string' ? value.split(', ') : value,
    );
  };
  const handleFarmingTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setFarmingType(value);
  };
 
  return (
    <>
      <Head>
        <title>
        Add a new gateway
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
          {/* <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink> */}
          {/* <form onSubmit={handleSubmit} method="post"> */}
          <form >
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
                textAlign={"center"}
              >
                Add a new gateway
              </Typography>
            
            </Box>
            <TextField
              required
              fullWidth
              
              label="Gateway Name"
              
              name="gatewayName"
              
              style={{marginBottom: 15 }}
              onChange={(e) => setGateway_name(e.target.value)}
              
              variant="outlined"
            />
            <TextField
            required
             
              fullWidth
            
              label="Gateway address"
              style={{marginBottom: 15 }}
              name="gatewayAddress"
             
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
            />
            <TextField
            required
            
              fullWidth
            
              label="MAC address"
              style={{marginBottom: 15 }}
              name="macAddress"
            
              onChange={(e) => setMac_address(e.target.value)}
              variant="outlined"
            />
            
        <FormControl required fullWidth  >
            <InputLabel id="demo-multiple-checkbox-label">Farming Type</InputLabel>
            <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          style={{marginBottom: 15 }}
          value={farmingType}
          onChange={handleFarmingTypeChange}
          input={<OutlinedInput label="Farming type" />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
        >
          {farmingTypes.map((farmingType) => (
            <MenuItem key={farmingType} value={farmingType}>
                   <RadioGroup
                      onChange={() => handleFarmingTypeChange(farmingType)}
                      value={farmingType}
                      name="farmingType"
                      inputProps={{ 'aria-label': farmingType }}
                  />

              <ListItemText primary={farmingType} />
            </MenuItem>
          ))}
        </Select>
        </FormControl> 
             {/* <FormControl required fullWidth>
              <InputLabel id="demo-radio-group-label">Farming Type</InputLabel>
              <RadioGroup
                aria-label="farmingType"
                name="farmingType"
                value={farmingType}
                onChange={handleFarmingTypeChange}
              >
                {farmingTypes.map((farmingType) => (
                  <FormControlLabel
                    key={farmingType.id}
                    value={farmingType.name}
                    control={<Radio />}
                    label={farmingType.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>  */}
            
        <FormControl required fullWidth  >
            <InputLabel id="demo-multiple-checkbox-label">Sensors type</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              style={{marginBottom: 15 }}
              value={sensors}
              onChange={handleSensorsTypeChange}
              input={<OutlinedInput label="Sensors type" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              <Radio
                      onChange={() => handleSensorsTypeChange(type)}
                      value={type}
                      name="cropType"
                      inputProps={{ 'aria-label': type }}
                  />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>

        <FormControl required fullWidth  >
            <InputLabel id="demo-multiple-checkbox-label">Crop type</InputLabel>
            <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          style={{marginBottom: 15 }}
          value={cropType}
          onChange={handleCropTypeChange}
          input={<OutlinedInput label="Crop type" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {cropTypes.map((cropType) => (
            <MenuItem key={cropType} value={cropType}>
              {/* <Checkbox checked={cropType.indexOf(cropType) > -1} /> */}
                  <Radio
                      onChange={() => handleCropTypeChange(cropType)}
                      value={cropType}
                      name="cropType"
                      inputProps={{ 'aria-label': cropType }}
                  />

              <ListItemText primary={cropType} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        

        <FormControl required fullWidth  >
            <InputLabel id="demo-multiple-checkbox-label">climate type</InputLabel>
            <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          style={{marginBottom: 15 }}
          value={climateType}
          onChange={handleClimateTypeChange}
          input={<OutlinedInput label="Climate type" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {climateTypes.map((climateType) => (
            <MenuItem key={climateType} value={climateType}>
              {/* <Checkbox checked={cropType.indexOf(cropType) > -1} /> */}
                  <Radio
                      onChange={() => handleCropTypeChange(climateType)}
                      value={climateType}
                      name="cropType"
                      inputProps={{ 'aria-label': climateType }}
                  />

              <ListItemText primary={climateType} />
            </MenuItem>
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
              <button
              
              className="bg-sky-600  hover:bg-sky-700 text-white font-medium py-2 px-2 rounded h-15 m-1 w-full "
               
               onClick={()=>handleSubmit()}
                variant="contained"
              >
                Add Gateway
              </button>
            </Box>
            
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddGateway;
