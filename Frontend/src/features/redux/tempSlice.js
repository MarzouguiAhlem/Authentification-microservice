import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


export const getTempData = createAsyncThunk(
    "chartsLayout/getTempData",
    async (gateway_id,thunkAPI) => {
       
        try {
            const resp = await axios.get(`http://localhost:5000/temp/getTempData/${gateway_id}`, {
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

const tempSlice = createSlice({
        name: "temp",
        initialState: {
            tempValues: [],
            loading:true,
            status: 'idle',
            error: null
        },
        reducers: { 
        },
        extraReducers: {
            [getTempData.pending]: (state, action) => {
              
    
            },
            [getTempData.fulfilled]: (state, action) => {
                state.tempValues = action.payload;
                state.loading = false
            
            },
            [getTempData.rejected]: (state, action) => {
    
            },
        }
    });
    
export const tempReducer = tempSlice.reducer;
   