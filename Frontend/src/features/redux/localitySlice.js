import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


function createData(id, name,governorate) {
    return {
        id,
        name,
        governorate
    };
}

export const getAllLocalities = createAsyncThunk(
    "locality/getAllLocalities",
    async (thunkAPI) => {
        try {
            const resp = await axios.get(`http://localhost:5000/locality/getAllLocalities`, {
                // headers: { 
                //     'Access-Control-Allow-Origin' : 'http://localhost:3000',
                //     'Access-Control-Allow-Credentials' : 'true',
                //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                //     'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                //   },
            });

            return resp.data.map(locality => createData(locality.id, locality.name,locality.governorate))
        } catch (error) {
            console.log(error)
        }
    })

export const addLocality = createAsyncThunk(
    "locality/addLocality",
    async (locality, thunkAPI) => {

        try {
           
            const resp = await axios.post(`http://localhost:5000/locality/addLocality`, locality, {
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



export const updateLocality = createAsyncThunk(
    "locality/updateLocality",
    async (locality, thunkAPI) => {
        try {
            const resp = await axios.put(`http://localhost:5000/locality/updateLocality/${locality.id}`,locality, {
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
export const deleteLocality = createAsyncThunk(
    "locality/deleteLocality",
    async (id, thunkAPI) => {
        try {
            
            const resp = await axios.delete(`http://localhost:5000/locality/deleteLocality/${id}`, {
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

const localitySlice = createSlice({
    name: "locality",
    initialState: {
        localities: [],
        localityToEdit: {}
    },
    reducers: {
        setLocalityToEdit: (state, action) => {

            state.localityToEdit = action.payload

        }
    },
    extraReducers: {
        [getAllLocalities.pending]: (state, action) => {

        },
        [getAllLocalities.fulfilled]: (state, action) => {
            state.localities = action.payload;
        },
        [getAllLocalities.rejected]: (state, action) => {
          
        },
        [addLocality.pending]: (state, action) => {

        },
        [addLocality.fulfilled]: (state, action) => {
          
        },
        [addLocality.rejected]: (state, action) => {
           
        },
        [deleteLocality.pending]: (state, action) => {

        },
        [deleteLocality.fulfilled]: (state, action) => {
            const updatedLocalities = state.localities.filter(locality => locality.id !== action.meta.arg)
            state.localities = updatedLocalities
        },
        [deleteLocality.rejected]: (state, action) => {
           
        },
        [updateLocality.pending]: (state, action) => {
           
        },
        [updateLocality.fulfilled]: (state, action) => {
   
        },
        [updateLocality.rejected]: (state, action) => {
    
        },
        

    }
});
export const { setLocalityToEdit } = localitySlice.actions
export default localitySlice.reducer;