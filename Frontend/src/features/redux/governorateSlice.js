import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


function createData(id, name) {
    return {
        id,
        name
    };
}

export const getAllGovernorates = createAsyncThunk(
    "governorate/getAllGovernorates",
    async (thunkAPI) => {
        try {
            const resp = await axios.get(`http://localhost:5000/governorate/getAllGovernorates`, {
                // headers: { 
                //     'Access-Control-Allow-Origin' : 'http://localhost:3000',
                //     'Access-Control-Allow-Credentials' : 'true',
                //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                //     'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                //   },
            });

            return resp.data.map(governorate => createData(governorate.id, governorate.name))
        } catch (error) {
            console.log(error)
        }
    })

export const addGovernorate = createAsyncThunk(
    "governorate/addGovernorate",
    async (governorate, thunkAPI) => {

        try {
            const resp = await axios.post(`http://localhost:5000/governorate/addGovernorate`, governorate, {
                // headers: { 
                //     'Access-Control-Allow-Origin' : 'http://localhost:3000',
                //     'Access-Control-Allow-Credentials' : 'true',
                //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                //     'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                //   },
            });
            
            return resp.data;
        } catch (error) {
            console.log(error)
        }
    }
)



export const updateGovernorate = createAsyncThunk(
    "governorate/updateGovernorate",
    async (governorate, thunkAPI) => {
        try {
            const resp = await axios.put(`http://localhost:5000/governorate/updateGovernorate/${governorate.id}`,governorate, {
                // headers: { 
                //     'Access-Control-Allow-Origin' : 'http://localhost:3000',
                //     'Access-Control-Allow-Credentials' : 'true',
                //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                //     'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                //   },
            });
            return resp.data ;
        } catch (error) {
            console.log(error)
        }
    })
export const deleteGovernorate = createAsyncThunk(
    "governorate/deleteGovernorate",
    async (id, thunkAPI) => {
        try {
          
            const resp = await axios.delete(`http://localhost:5000/governorate/deleteGovernorate/${id}`, {
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

const governorateSlice = createSlice({
    name: "governorate",
    initialState: {
        governorates: [],
        governorateToEdit: {}
    },
    reducers: {
        setGovernorateToEdit: (state, action) => {

            state.governorateToEdit = action.payload

        }
    },
    extraReducers: {
        [getAllGovernorates.pending]: (state, action) => {

        },
        [getAllGovernorates.fulfilled]: (state, action) => {
            state.governorates = action.payload;
        },
        [getAllGovernorates.rejected]: (state, action) => {
          
        },
        [addGovernorate.pending]: (state, action) => {

        },
        [addGovernorate.fulfilled]: (state, action) => {

        },
        [addGovernorate.rejected]: (state, action) => {
          
        },
        [deleteGovernorate.pending]: (state, action) => {

        },
        [deleteGovernorate.fulfilled]: (state, action) => {
           
            const updatedGovernorates = state.governorates.filter(governorate => governorate.id !== action.meta.arg)
            state.governorates = updatedGovernorates
          
        },
        [deleteGovernorate.rejected]: (state, action) => {
           
        },
        [updateGovernorate.pending]: (state, action) => {
           
        },
        [updateGovernorate.fulfilled]: (state, action) => {
           
        },
        [updateGovernorate.rejected]: (state, action) => {
        
        },
        

    }
});
export const { setGovernorateToEdit } = governorateSlice.actions
export default governorateSlice.reducer;