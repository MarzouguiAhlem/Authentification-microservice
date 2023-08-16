import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSensorValues = createAsyncThunk(
    "sensors/getSensorValues",
    async (id , thunkAPI) => {
        try {
            const resp = await axios.get(`http://localhost:5000/data/${id}`
            , {
                headers: { 
                    'Access-Control-Allow-Origin' : 'http://localhost:3000',
                    'Access-Control-Allow-Credentials' : 'true',
                    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                  },
            });
            //console.log(resp.data);
            return resp.data;
        } catch (error) {
            throw error;
        }
    }
);


export const sensorsSlice = createSlice({
    name: 'sensor',
    initialState: {
        sensors: [],
        status: 'idle',
        error: null
    },
    reducers: {
        // Add any additional reducers here
    },
    extraReducers: {
        [getSensorValues.pending]: (state, action) => {

        },
        [getSensorValues.fulfilled]: (state, action) => {
            state.sensors = action.payload;
        }, 
        [getSensorValues.rejected]: (state, action) => {
          
        },    
    }
});

export default sensorsSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000'; // replace with your API endpoint

// const initialState = {
//   sensor: [],
//   error: null,
//   loading: false,
// };

// const sensorsSlice = createSlice({
//   name: 'sensors',
//   initialState,
//   reducers: {
//     getSensorStart(state) {
//       state.loading = true;
//     },
//     getSensorSuccess(state, action) {
//       state.loading = false;
//       state.sensor = action.payload;
//       state.error = null;
//     },
//     getSensorFail(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     setSensor(state, action) {
//       state.sensor = action.payload;
//     },
//   },
// });

// export const { getSensorStart, getSensorSuccess, getSensorFail, setSensor } = sensorsSlice.actions;

// export const getSensorValues = (gateway_id) => async (dispatch) => {
//   dispatch(getSensorStart());
//   try {
//     const response = await axios.get(`${API_URL}/data/${gateway_id}`);
//     dispatch(setSensor(response.data));
//     console.log(response.data);
//     dispatch(getSensorSuccess());
//   } catch (error) {
//     dispatch(getSensorFail(error.message));
//   }
// };

// export default sensorsSlice.reducer;

