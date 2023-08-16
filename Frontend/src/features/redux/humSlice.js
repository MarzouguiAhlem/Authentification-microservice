import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getHumidityData = createAsyncThunk(
    "chartsLayout/getHumidityData",
    async (gateway_id,thunkAPI) => {
       
        try {
            const resp = await axios.get(`http://localhost:5000/humidity/getHumidityData/${gateway_id}`, {
                // headers: { 
                //     'Access-Control-Allow-Origin' : 'http://localhost:3000',
                //     'Access-Control-Allow-Credentials' : 'true',
                //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                //     'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                //   },
            });
            //console.log(resp.data);
            return resp.data
        } catch (error) {
            console.log(error)
        }
    })

    const humSlice = createSlice({
        name: "hum",
        initialState: {
            humValues: [],
            loading:true,
            status: 'idle',
            error: null
        },
        reducers: { 
        },
        extraReducers: {
            [getHumidityData.pending]: (state, action) => {
              
    
            },
            [getHumidityData.fulfilled]: (state, action) => {
                state.humValues = action.payload;
                state.loading = false
            
            },
            [getHumidityData.rejected]: (state, action) => {
    
            },
        }
    });
export const humReducer = humSlice.reducer;    