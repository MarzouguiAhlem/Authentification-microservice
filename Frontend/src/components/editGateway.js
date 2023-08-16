

import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from "react-redux"
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { HeadProvider as Head } from 'react-head';

import FormControl from '@mui/material/FormControl';
import { updateGateway,getAllGateways } from "../features/redux/gatewaySlice";
import { relativePaths, absolutePaths } from "./../navigation";
import {
  Box,
  Button,
  Checkbox,
  Radio,
  Container,
  TextField,
  Typography
} from '@mui/material';

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';



import ListItemText from '@mui/material/ListItemText';
import { Navigate } from 'react-router-dom';
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
  'Tomato',
];
const climateTypes = [
  'Dry (Low precipitation, High evaporation) ',
  'Moderate (Moderate temperatures and precipitation levels)',
  'Tropical (high temperatures year-round and high levels of precipitation)'
];
const EditGateway = () => {
  const gatewayToEdit = useSelector((state) => state.gateway.gatewayToEdit)
  const [gatewayName, setgatewayName] = useState(gatewayToEdit.gateway_name)
  //const [userId, setUserId] = useState(gatewayToEdit.user.session_id)
  const [gatewayAddress, setGatewayAddress] = useState(gatewayToEdit.address)
  const [cropType, setCropType] = useState(gatewayToEdit.cropType)
  const [macAddress, setMacAddress] = useState(gatewayToEdit.mac_address)
  const [climateType, setClimateType] = useState(gatewayToEdit.climateType)


  const dispatch = useDispatch();
  // const users = [{ id: 1, name: "seif" },
  // { id: 2, name: "ahmed" },
  // { id: 3, name: "oussema" }]



  const [sensors, setSensors] = React.useState([gatewayToEdit.sensors]);
  const navigate = useNavigate()

  const handleSubmit = () => {
    const gateway = { "gateway_id": gatewayToEdit.gateway_id, "gateway_name": gatewayName,"address": gatewayAddress, "mac_address": macAddress, "cropType": cropType, "climateType": climateType, "sensors": sensors }

    dispatch(updateGateway(gateway))
    dispatch(getAllGateways())
    navigate(absolutePaths.gatewayList)

  }

  const handleSensorsTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setSensors(
      value
    );

  };
  const handleCropTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setCropType(
     
      typeof value === 'string' ? value.split(', ') : value,
    );
  };
  const handleClimateTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setClimateType(
     
      typeof value === 'string' ? value.split(', ') : value,
    );
  };

  return (
    <>
      <Head>
        <title>
          Edit gateway
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
                Edit gateway
              </Typography>

            </Box>
            <TextField
              required
              fullWidth

              label="Gateway Name"

              name="gatewayName"

              style={{ marginBottom: 15 }}
              onChange={(e) => setgatewayName(e.target.value)}

              defaultValue={gatewayToEdit.gateway_name}
              variant="outlined"
            />
            <TextField
              required

              fullWidth

              label="Gateway address"
              style={{ marginBottom: 15 }}
              name="gatewayAddress"

              defaultValue={gatewayToEdit.address}
              onChange={(e) => setGatewayAddress(e.target.value)}
              variant="outlined"
            />
            <TextField
              required

              fullWidth

              label="MAC address"
              style={{ marginBottom: 15 }}
              name="macAddress"

              defaultValue={gatewayToEdit.mac_address}
              onChange={(e) => setMacAddress(e.target.value)}
              variant="outlined"
            />
            {/* <TextField
              required

              fullWidth

              label="Gateway reference"
              style={{ marginBottom: 15 }}
              name="GatewayReference"

              defaultValue={gatewayToEdit.reference}
              onChange={(e) => setReference(e.target.value)}
              variant="outlined"
            /> */}
            {/* <FormControl required fullWidth >
              <InputLabel id="demo-simple-select-helper-label">User Name</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                style={{ marginBottom: 15 }}

                name="userId"
                defaultValue={gatewayToEdit.user.session_id}
                fullWidth
                label="User Name"

                onChange={(e) => setUserId(e.target.value)}
              >

                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                ))}

              </Select>
            </FormControl> */}

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
                      onChange={() => handleCropTypeChange(type)}
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

                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-2 rounded h-15 m-1 w-full "

                onClick={() => handleSubmit()}
                variant="contained"
              >
                Edit Gateway
              </button>
            </Box>

          </form>
        </Container>
      </Box>
    </>
  );
};

export default EditGateway;
