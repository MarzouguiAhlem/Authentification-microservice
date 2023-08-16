import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getMoistureData = createAsyncThunk(
    "chartsLayout/getMoistureData",
    async (gateway_id,thunkAPI) => {
       
        try {
            const resp = await axios.get(`http://localhost:5000/SoilMoisture/getMoistureData/${gateway_id}`, {
                // headers: { 
                //     'Access-Control-Allow-Origin' : 'http://localhost:3000',
                //     'Access-Control-Allow-Credentials' : 'true',
                //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                //     'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                //   },
            });

            return resp.data
        } catch (error) {
            console.log(error)
        }
    })   
    const soilMoistureSlice = createSlice({
        name: "SoilMoisture",
        initialState: {
            soilMoistureValues: [],
            loading:true,
            status: 'idle',
            error: null
        },
        reducers: { 
        },
        extraReducers: {
            [getMoistureData.pending]: (state, action) => {
              
    
            },
            [getMoistureData.fulfilled]: (state, action) => {
                state.soilMoistureValues = action.payload;
                state.loading = false
            
            },
            [getMoistureData.rejected]: (state, action) => {
    
            },
        }
    });
export const soilMoistureReducer = soilMoistureSlice.reducer; 